import { Uppy, Dashboard } from "/apps/pdf-recombine/uppy.min.mjs";
window.pdfjsLib.GlobalWorkerOptions.workerSrc = '/apps/pdf-recombine/pdf.worker.min.js';

const generateId = () => window.crypto && crypto.randomUUID ? crypto.randomUUID() : 'id_' + Math.random().toString(36).substring(2, 9);

const state = {
    globalPdfs: {},
    globalPages: [],
    groups: [],
    groupColors: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'],
    lastSelectedPageIndex: -1,
    draggedPageIndices: []
};

// DOM
const views = {
    upload: document.getElementById('upload-view'),
    workspace: document.getElementById('workspace-view'),
    resetBtn: document.getElementById('reset-btn'),
    overlay: document.getElementById('overlay'),
    overlayText: document.getElementById('overlay-text')
};
const containers = {
    grid: document.getElementById('pages-grid'),
    groups: document.getElementById('groups-container')
};
const els = {
    addGroupBtn: document.getElementById('add-group-btn'),
    exportBtn: document.getElementById('export-btn'),
    selectionStatus: document.getElementById('selection-status'),
    gridSize: document.getElementById('grid-size')
};

const pageRenderObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const canvas = entry.target;
            const pageId = canvas.dataset.pageId;
            const pageState = state.globalPages.find(p => p.id === pageId);

            if (pageState && !pageState._rendered) {
                pageState._rendered = true;
                const ctx = canvas.getContext('2d');

                // Render page and manage PDF instances in memory
                pageState._pdfPage.render({ canvasContext: ctx, viewport: pageState._viewport })
                    .promise
                    .catch(err => console.warn('Render error', err))
                    .finally(() => {
                        // 1. Cleanup individual page resources
                        try { pageState._pdfPage.cleanup(); } catch (e) { }

                        // 2. Check document-level completion to safely destroy the worker instance
                        const pdfData = state.globalPdfs[pageState.pdfId];
                        if (pdfData && pdfData.pdfDoc) {
                            pdfData.renderedCount = (pdfData.renderedCount || 0) + 1;

                            // If all pages for this PDF are rendered, we no longer need the pdf instance
                            if (pdfData.renderedCount >= pdfData.totalPages) {
                                pdfData.pdfDoc.destroy();
                                pdfData.pdfDoc = null; // Free up the reference
                            }
                        }
                    });

                observer.unobserve(canvas);
            }
        }
    });
}, { root: document.getElementById('pages-grid'), rootMargin: '400px' });

// Init
const uppy = new Uppy({
    restrictions: {
        maxFileSize: 100 * 1024 * 1024,
        allowedFileTypes: ['.pdf', '.zip', 'application/pdf', 'application/zip']
    }
}).use(Dashboard, {
    inline: true,
    target: '#uppy-dashboard',
    showProgressDetails: true,
    height: 400,
    note: 'Files up to 100MB'
});

uppy.on('complete', async (result) => {
    if (result.successful.length > 0) {
        showOverlay("Reading metadata...");
        views.upload.classList.add('hidden');
        views.workspace.classList.remove('hidden');
        views.resetBtn.classList.remove('hidden');

        if (state.groups.length === 0) createGroup("Document 1");

        try {
            for (const file of result.successful) {
                if (file.extension === 'zip') {
                    await processZip(file.data);
                } else if (file.extension === 'pdf') {
                    await processPdf(file.data, file.name);
                }
            }
            renderGrid();
            updateSelectionStatus();
        } catch (err) {
            console.error(err);
            alert("An error occurred while processing the files.");
        } finally {
            hideOverlay();
        }
    }
});

// File processing
async function processZip(blob) {
    const zip = await JSZip.loadAsync(blob);
    const promises = [];

    zip.forEach((relativePath, zipEntry) => {
        const fileName = zipEntry.name.split('/').pop();
        if (zipEntry.name.includes('__MACOSX') || fileName.startsWith('.')) return;

        if (zipEntry.name.toLowerCase().endsWith('.pdf') && !zipEntry.dir) {
            promises.push(zipEntry.async('blob').then(pdfBlob => processPdf(pdfBlob, fileName)));
        }
    });
    await Promise.all(promises);
}

async function processPdf(blob, fileName) {
    try {
        const arrayBuffer = await blob.arrayBuffer();
        const pdfId = 'pdf_' + generateId();

        const objectUrl = URL.createObjectURL(blob);
        const pdf = await window.pdfjsLib.getDocument({ url: objectUrl }).promise;
        URL.revokeObjectURL(objectUrl); // Release Blob URL immediately

        const totalPages = pdf.numPages;

        // Track total & rendered pages for cleanup
        state.globalPdfs[pdfId] = {
            name: fileName,
            arrayBuffer: arrayBuffer,
            pdfDoc: pdf,
            totalPages: totalPages,
            renderedCount: 0
        };

        const batchSize = 10;

        for (let i = 1; i <= totalPages; i += batchSize) {
            showOverlay(`Parsing Layout: ${fileName} (Pages ${i}-${Math.min(i + batchSize - 1, totalPages)}/${totalPages})...`);

            const pagePromises = [];
            for (let j = 0; j < batchSize && (i + j) <= totalPages; j++) {
                pagePromises.push(pdf.getPage(i + j));
            }
            const pages = await Promise.all(pagePromises);

            pages.forEach((page, index) => {
                const pageNum = i + index;
                const viewport = page.getViewport({ scale: 1.0 });

                const scale = 800 / viewport.width;
                const scaledViewport = page.getViewport({ scale: scale });

                const canvas = document.createElement('canvas');
                canvas.width = scaledViewport.width;
                canvas.height = scaledViewport.height;
                canvas.dataset.pageId = `${pdfId}_p${pageNum}`;

                state.globalPages.push({
                    id: canvas.dataset.pageId,
                    pdfId: pdfId,
                    pageIndex: pageNum - 1,
                    canvas: canvas,
                    selected: false,
                    groups: new Set(),
                    _pdfPage: page,
                    _viewport: scaledViewport,
                    _rendered: false
                });
            });

            await new Promise(r => setTimeout(r, 0));
        }
    } catch (error) {
        console.error(`Failed to parse PDF "${fileName}":`, error);
        alert(`Skipped "${fileName}": The file appears to be corrupted or is not a valid PDF.`);
    }
}

// Groups
function createGroup(name = null) {
    const id = 'g_' + generateId();
    const usedColors = state.groups.map(g => g.color);
    let color = state.groupColors.find(c => !usedColors.includes(c)) || state.groupColors[state.groups.length % state.groupColors.length];

    state.groups.push({
        id: id,
        name: name || `Document ${state.groups.length + 1}`,
        color: color
    });
    renderGroups();
}

function removePageFromGroup(pageId, groupId) {
    const page = state.globalPages.find(p => p.id === pageId);
    if (page) {
        page.groups.delete(groupId);
        renderGrid();
        renderGroups();
    }
}

// Rendering
function renderGroups() {
    containers.groups.innerHTML = '';
    const fragment = document.createDocumentFragment();

    state.groups.forEach(group => {
        const count = state.globalPages.filter(p => p.groups.has(group.id)).length;
        const isActionable = count > 0 || state.groups.length > 1;

        let actionBtnHTML = '';
        if (isActionable) {
            const btnTitle = count > 0 ? "Clear all pages from this group" : "Delete empty group";
            const btnText = count > 0 ? "Clear" : "Delete";
            actionBtnHTML = `
                        <button class="btn-action-group" title="${btnTitle}">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                            ${btnText}
                        </button>
                    `;
        }

        const div = document.createElement('div');
        div.className = "group-card";
        div.innerHTML = `
                    <div class="group-header">
                        <div class="color-dot" style="background-color: ${group.color}"></div>
                        <input type="text" class="group-input" value="${group.name}">
                    </div>
                    <div class="group-footer">
                        <span class="group-count">${count} pages</span>
                        <div class="footer-actions">
                            ${actionBtnHTML}
                        </div>
                    </div>
                `;

        div.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (state.draggedPageIndices && state.draggedPageIndices.length > 0) {
                e.dataTransfer.dropEffect = 'copy';
                div.classList.add('group-drag-over');
            }
        });

        div.addEventListener('dragleave', (e) => {
            if (!div.contains(e.relatedTarget)) {
                div.classList.remove('group-drag-over');
            }
        });

        div.addEventListener('drop', (e) => {
            e.preventDefault();
            div.classList.remove('group-drag-over');
            if (state.draggedPageIndices && state.draggedPageIndices.length > 0) {
                state.draggedPageIndices.forEach(idx => {
                    state.globalPages[idx].groups.add(group.id);
                    state.globalPages[idx].selected = false;
                });

                state.draggedPageIndices = [];
                state.lastSelectedPageIndex = -1;
                updateSelectionStatus();
                renderGrid();
                renderGroups();
            }
        });

        div.querySelector('input').addEventListener('change', (e) => {
            group.name = e.target.value;
        });

        if (isActionable) {
            div.querySelector('.btn-action-group').addEventListener('click', (e) => {
                e.stopPropagation();
                if (count > 0) {
                    state.globalPages.forEach(p => p.groups.delete(group.id));
                    renderGrid();
                    renderGroups();
                } else {
                    state.groups = state.groups.filter(g => g.id !== group.id);
                    renderGroups();
                }
            });
        }

        fragment.appendChild(div);
    });

    containers.groups.appendChild(fragment);
}

function renderGrid() {
    containers.grid.innerHTML = '';
    const fragment = document.createDocumentFragment();

    state.globalPages.forEach((page, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = `thumbnail-container ${page.selected ? 'selected' : ''}`;

        page.canvas.className = "thumbnail-canvas";
        wrapper.appendChild(page.canvas);

        if (!page._rendered) {
            pageRenderObserver.observe(page.canvas);
        }

        wrapper.draggable = true;
        wrapper.addEventListener('dragstart', (e) => handleDragStart(e, index));
        wrapper.addEventListener('dragover', (e) => handleDragOver(e, index));
        wrapper.addEventListener('dragleave', handleDragLeave);
        wrapper.addEventListener('drop', (e) => handleDrop(e, index));
        wrapper.addEventListener('dragend', handleDragEnd);

        const pgNum = document.createElement('div');
        pgNum.className = "page-number";
        pgNum.textContent = `Pg ${page.pageIndex + 1}`;
        wrapper.appendChild(pgNum);

        if (page.groups.size > 0) {
            const badgeContainer = document.createElement('div');
            badgeContainer.className = "badge-container";

            page.groups.forEach(groupId => {
                const group = state.groups.find(g => g.id === groupId);
                if (group) {
                    const badge = document.createElement('div');
                    badge.className = "group-badge";
                    badge.style.backgroundColor = group.color;
                    badge.title = `Remove from ${group.name}`;
                    badge.innerHTML = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>`;

                    badge.addEventListener('click', (e) => {
                        e.stopPropagation();
                        removePageFromGroup(page.id, group.id);
                    });
                    badgeContainer.appendChild(badge);
                }
            });
            wrapper.appendChild(badgeContainer);
        }

        wrapper.addEventListener('click', (e) => handlePageClick(e, index));
        fragment.appendChild(wrapper);
    });

    containers.grid.appendChild(fragment);
}

// Interaction
function handlePageClick(e, index) {
    if (e.shiftKey && state.lastSelectedPageIndex !== -1) {
        const start = Math.min(state.lastSelectedPageIndex, index);
        const end = Math.max(state.lastSelectedPageIndex, index);
        for (let i = start; i <= end; i++) {
            state.globalPages[i].selected = true;
        }
    } else if (e.ctrlKey || e.metaKey) {
        state.globalPages[index].selected = !state.globalPages[index].selected;
        state.lastSelectedPageIndex = index;
    } else {
        const wasSelected = state.globalPages[index].selected;
        state.globalPages.forEach(p => p.selected = false);
        state.globalPages[index].selected = !wasSelected;
        state.lastSelectedPageIndex = index;
    }
    renderGrid();
    updateSelectionStatus();
}

function updateSelectionStatus() {
    const count = state.globalPages.filter(p => p.selected).length;
    els.selectionStatus.textContent = `${count} page${count === 1 ? '' : 's'} selected`;
}

function handleDragStart(e, index) {
    if (!state.globalPages[index].selected) {
        state.globalPages.forEach(p => p.selected = false);
        state.globalPages[index].selected = true;

        document.querySelectorAll('.thumbnail-container').forEach((el, i) => {
            if (i === index) el.classList.add('selected');
            else el.classList.remove('selected');
        });
        updateSelectionStatus();
    }

    state.draggedPageIndices = state.globalPages
        .map((p, i) => p.selected ? i : -1)
        .filter(i => i !== -1);

    e.dataTransfer.effectAllowed = 'copyMove';
    e.dataTransfer.setData('text/plain', state.draggedPageIndices.join(','));

    setTimeout(() => {
        document.querySelectorAll('.thumbnail-container.selected').forEach(el => el.classList.add('is-dragging'));
    }, 0);
}

function handleDragOver(e, index) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    if (!state.draggedPageIndices || state.draggedPageIndices.includes(index)) return;

    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const midPoint = rect.left + rect.width / 2;

    target.classList.remove('drag-over-before', 'drag-over-after');
    if (e.clientX < midPoint) {
        target.classList.add('drag-over-before');
    } else {
        target.classList.add('drag-over-after');
    }
}

function handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over-before', 'drag-over-after');
}

function handleDrop(e, targetIndex) {
    e.preventDefault();
    const target = e.currentTarget;
    const isAfter = target.classList.contains('drag-over-after');
    target.classList.remove('drag-over-before', 'drag-over-after');

    if (!state.draggedPageIndices || state.draggedPageIndices.length === 0) return;
    if (state.draggedPageIndices.includes(targetIndex)) return;

    const draggedPages = state.draggedPageIndices.map(i => state.globalPages[i]);
    const remainingPages = state.globalPages.filter((_, i) => !state.draggedPageIndices.includes(i));

    const targetPage = state.globalPages[targetIndex];
    let newInsertIndex = remainingPages.indexOf(targetPage);

    if (isAfter) newInsertIndex++;

    remainingPages.splice(newInsertIndex, 0, ...draggedPages);
    state.globalPages = remainingPages;
    state.draggedPageIndices = [];

    renderGrid();
}

function handleDragEnd(e) {
    document.querySelectorAll('.thumbnail-container').forEach(el => {
        el.classList.remove('is-dragging', 'drag-over-before', 'drag-over-after');
    });
    document.querySelectorAll('.group-card').forEach(el => {
        el.classList.remove('group-drag-over');
    });
    state.draggedPageIndices = [];
}

// Export
async function exportDocuments() {
    showOverlay("Generating PDFs and Archive...");
    try {
        const zip = new JSZip();
        let filesAdded = 0;
        const pdfLibDocsCache = {};

        for (const group of state.groups) {
            const groupPages = state.globalPages.filter(p => p.groups.has(group.id));
            if (groupPages.length === 0) continue;

            const newPdfDoc = await window.PDFLib.PDFDocument.create();
            const copyChunks = [];
            let currentChunk = null;

            for (const pageRef of groupPages) {
                if (!currentChunk || currentChunk.pdfId !== pageRef.pdfId) {
                    currentChunk = { pdfId: pageRef.pdfId, indices: [] };
                    copyChunks.push(currentChunk);
                }
                currentChunk.indices.push(pageRef.pageIndex);
            }

            for (const chunk of copyChunks) {
                const pdfData = state.globalPdfs[chunk.pdfId];

                if (!pdfLibDocsCache[chunk.pdfId]) {
                    pdfLibDocsCache[chunk.pdfId] = await window.PDFLib.PDFDocument.load(pdfData.arrayBuffer);
                }
                const sourceDoc = pdfLibDocsCache[chunk.pdfId];

                const copiedPages = await newPdfDoc.copyPages(sourceDoc, chunk.indices);
                copiedPages.forEach(page => newPdfDoc.addPage(page));
            }

            const pdfBytes = await newPdfDoc.save();
            const safeName = group.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() || `document_${filesAdded + 1}`;
            zip.file(`${safeName}.pdf`, pdfBytes);
            filesAdded++;
        }

        if (filesAdded === 0) {
            alert("No pages have been assigned to any groups. Please assign pages to a group before exporting.");
            return;
        }

        showOverlay("Zipping files...");
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        window.saveAs(zipBlob, 'Recombined.zip');

        for (const key in pdfLibDocsCache) {
            delete pdfLibDocsCache[key];
        }

    } catch (err) {
        console.error(err);
        alert("An error occurred during export. See console for details.");
    } finally {
        hideOverlay();
    }
}

// Utilities
function showOverlay(text) {
    views.overlayText.textContent = text;
    views.overlay.classList.remove('hidden');
}

function hideOverlay() {
    views.overlay.classList.add('hidden');
}

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

els.addGroupBtn.addEventListener('click', () => createGroup());
els.exportBtn.addEventListener('click', exportDocuments);

const handleGridResize = debounce((value) => {
    containers.grid.style.gridTemplateColumns = `repeat(${value}, minmax(0, 1fr))`;
}, 300);

els.gridSize.addEventListener('input', (e) => {
    handleGridResize(e.target.value);
});

views.resetBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset the workspace? All current data will be lost.')) {
        location.reload();
    }
});