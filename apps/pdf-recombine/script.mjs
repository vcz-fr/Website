import { Uppy, Dashboard } from "/apps/pdf-recombine/uppy.min.mjs";

// PDF.js worker
window.pdfjsLib.GlobalWorkerOptions.workerSrc = '/apps/pdf-recombine/pdf.worker.min.js';

// --- Utility: Fast UUID ---
const generateId = () => window.crypto && crypto.randomUUID ? crypto.randomUUID() : 'id_' + Math.random().toString(36).substr(2, 9);

// --- State Management ---
const state = {
    globalPdfs: {}, // { pdfId: { name, arrayBuffer } }
    globalPages: [], // { id, pdfId, pageIndex, canvas, selected, groups: Set(), _pdfPage, _viewport, _rendered }
    groups: [], // { id, name, color }
    groupColors: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'],
    lastSelectedPageIndex: -1,
    draggedPageIndex: null
};

// --- DOM Elements ---
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

// --- Performance Trick 1: Intersection Observer for Lazy Rendering ---
const pageRenderObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const canvas = entry.target;
            const pageId = canvas.dataset.pageId;
            const pageState = state.globalPages.find(p => p.id === pageId);

            if (pageState && !pageState._rendered) {
                pageState._rendered = true;
                const ctx = canvas.getContext('2d');
                // Render asynchronously so main thread doesn't lock
                pageState._pdfPage.render({ canvasContext: ctx, viewport: pageState._viewport })
                    .promise.catch(e => console.warn("Page render cancelled", e));
                observer.unobserve(canvas);
            }
        }
    });
}, { root: document.getElementById('pages-grid'), rootMargin: '400px' }); // Render slightly ahead of viewport

// --- Uppy Initialization ---
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

// --- File Processing ---
async function processZip(blob) {
    const zip = await JSZip.loadAsync(blob);
    const promises = [];

    zip.forEach((relativePath, zipEntry) => {
        const fileName = zipEntry.name.split('/').pop();

        // CRITICAL FIX: Ignore Mac OS resource forks and hidden dotfiles
        // These cause the "Invalid PDF structure" crash because they are AppleDouble files, not PDFs.
        if (zipEntry.name.includes('__MACOSX') || fileName.startsWith('.')) {
            return;
        }

        if (zipEntry.name.toLowerCase().endsWith('.pdf') && !zipEntry.dir) {
            promises.push(
                zipEntry.async('blob').then(pdfBlob => processPdf(pdfBlob, fileName))
            );
        }
    });
    await Promise.all(promises);
}

async function processPdf(blob, fileName) {
    try {
        const arrayBuffer = await blob.arrayBuffer();
        const pdfId = 'pdf_' + generateId();

        state.globalPdfs[pdfId] = { name: fileName, arrayBuffer: arrayBuffer.slice(0) };

        // CRITICAL FIX: Pass a strict Uint8Array clone to PDF.js
        // This prevents detached arrayBuffer errors and parsing structure errors.
        const pdfData = new Uint8Array(arrayBuffer.slice(0));
        const pdf = await window.pdfjsLib.getDocument({ data: pdfData }).promise;
        const totalPages = pdf.numPages;

        // Performance Trick 2: Concurrent Batched Promise Processing
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

                // Performance Trick 3: Optimized resolution (400px saves 75% memory vs 800px)
                const scale = 400 / viewport.width;
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
                    _pdfPage: page,          // Store page obj for JIT rendering
                    _viewport: scaledViewport,
                    _rendered: false
                });
            });

            // Yield to keep UI responsive
            await new Promise(r => setTimeout(r, 0));
        }
    } catch (error) {
        // CRITICAL FIX: Handle invalid PDFs gracefully so the app doesn't crash on batch uploads
        console.error(`Failed to parse PDF "${fileName}":`, error);
        alert(`Skipped "${fileName}": The file appears to be corrupted or is not a valid PDF.`);
    }
}

// --- Group Management ---
function createGroup(name = null) {
    const id = 'g_' + generateId();
    const color = state.groupColors[state.groups.length % state.groupColors.length];
    state.groups.push({
        id: id,
        name: name || `Document ${state.groups.length + 1}`,
        color: color
    });
    renderGroups();
}

function assignSelectedToGroup(groupId) {
    const selected = state.globalPages.filter(p => p.selected);
    if (selected.length === 0) return;

    selected.forEach(p => {
        p.groups.add(groupId);
        p.selected = false;
    });
    state.lastSelectedPageIndex = -1;
    renderGrid();
    updateSelectionStatus();
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

// --- Rendering ---
function renderGroups() {
    containers.groups.innerHTML = '';
    const fragment = document.createDocumentFragment();

    state.groups.forEach(group => {
        const count = state.globalPages.filter(p => p.groups.has(group.id)).length;

        const div = document.createElement('div');
        div.className = "group-card";
        div.innerHTML = `
                    <div class="group-header">
                        <div class="color-dot" style="background-color: ${group.color}"></div>
                        <input type="text" class="group-input" value="${group.name}">
                    </div>
                    <div class="group-footer">
                        <span class="group-count">${count} pages assigned</span>
                        <button class="btn-add-selected" title="Assign selected pages to this group">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4"></path></svg>
                            Add Selected
                        </button>
                    </div>
                `;

        div.querySelector('input').addEventListener('change', (e) => {
            group.name = e.target.value;
        });

        div.querySelector('.btn-add-selected').addEventListener('click', () => assignSelectedToGroup(group.id));

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

        // Queue unrendered canvases to the Intersection Observer
        if (!page._rendered) {
            pageRenderObserver.observe(page.canvas);
        }

        // Drag and Drop attributes and events
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

// --- Drag and Drop Handlers ---
function handleDragStart(e, index) {
    state.draggedPageIndex = index;
    e.dataTransfer.effectAllowed = 'move';
    // Firefox requires data to be set for drag to work
    e.dataTransfer.setData('text/plain', index);
    setTimeout(() => e.target.classList.add('is-dragging'), 0);
}

function handleDragOver(e, index) {
    e.preventDefault(); // Necessary to allow dropping
    e.dataTransfer.dropEffect = 'move';

    if (state.draggedPageIndex === index || state.draggedPageIndex === null) return;

    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    // Calculate if hovering over the left or right half of the thumbnail
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

    if (state.draggedPageIndex === null || state.draggedPageIndex === targetIndex) return;

    // Remove the dragged item
    const itemToMove = state.globalPages.splice(state.draggedPageIndex, 1)[0];

    // Calculate new insertion index
    let insertIndex = isAfter ? targetIndex + 1 : targetIndex;
    if (state.draggedPageIndex < insertIndex) {
        insertIndex--; // Adjust index because the dragged item was removed from before
    }

    // Insert at new position
    state.globalPages.splice(insertIndex, 0, itemToMove);

    // Reset last selection to prevent weird shift-click ranges after reordering
    state.lastSelectedPageIndex = -1;
    state.draggedPageIndex = null;

    renderGrid();
}

function handleDragEnd(e) {
    e.target.classList.remove('is-dragging');
    document.querySelectorAll('.thumbnail-container').forEach(el => {
        el.classList.remove('drag-over-before', 'drag-over-after');
    });
    state.draggedPageIndex = null;
}

// --- Export Logic ---
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

            // Performance Trick 4: Chunk consecutive pages from the same source PDF for bulk copying.
            // Doing 1 large copy request saves significant parsing overhead compared to N small requests.
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

                // Bulk copy the pages
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
        window.saveAs(zipBlob, 'Split_Documents.zip');

    } catch (err) {
        console.error(err);
        alert("An error occurred during export. See console for details.");
    } finally {
        hideOverlay();
    }
}

// --- Utilities & Listeners ---
function showOverlay(text) {
    views.overlayText.textContent = text;
    views.overlay.classList.remove('hidden');
}

function hideOverlay() {
    views.overlay.classList.add('hidden');
}

els.addGroupBtn.addEventListener('click', () => createGroup());
els.exportBtn.addEventListener('click', exportDocuments);

els.gridSize.addEventListener('input', (e) => {
    containers.grid.style.gridTemplateColumns = `repeat(${e.target.value}, minmax(0, 1fr))`;
});

views.resetBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset the workspace? All current data will be lost.')) {
        location.reload();
    }
});
