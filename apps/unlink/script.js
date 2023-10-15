const _id = id => document.getElementById(id);
const _r = msg => _id("response").value = msg;
const _notif = msg => _r(`[INFO] Error: ${msg}`);
const _block = disable => _id("action-send").disabled = disable

const send = body => {
    if (!body.url) {
        _notif("These inputs are required: url");
        _block(false);
        return;
    }
    fetch("/api/unlink", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "content-type": "application/json" }
    })
        .then(async r => {
            const json = await r.json();
            if (!r.ok) {
                throw "Could not resolve the URL. Reason: " + json.reason;
            }
            _r(genMsg(json.content))
        })
        .catch(_notif)
        .then(() => _block(false))
};

const main = e => (
    _block(true),
    e.preventDefault(),
    fd = new FormData(_id("form")),
    send({ url: fd.get("url") })
);

const genMsg = trace => (
    "Traversed locations, from origin to destination:\n\n"
    + trace.map((t, i) => `#${i}: [HTTP ${t.status}] ${t.url}`).join('\n')
);

// Actions
_id("action-send").addEventListener("click", main);

// Go!
_id("readiness").classList.add("success");
