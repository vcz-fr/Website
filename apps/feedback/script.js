const _q = id => (v = new URLSearchParams(window.location.search).get(id), v === "" ? null : v);
const _id = id => document.getElementById(id);
const _r = msg => _id("response").value = msg;
const _notif = msg => _r(`[INFO] Error: ${msg}`);
const _block = disable => _id("action-send").disabled = disable;

const send = body => {
    if (!body.appid || !body.msg) {
        _notif("These inputs are required: appid, message");
        _block(false);
        return;
    }

    fetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })
        .then(r => {
            if (!r.ok) { throw "Could not process the inputs" }
            _r("Thanks for your feedback!")
        })
        .catch(_notif)
        .then(() => _block(false));
};

const main = e => {
    _block(true);
    e.preventDefault();
    const fd = new FormData(_id("form"));
    send({ appid: fd.get("appid"), msg: fd.get("msg") });
}

const init = () => {
    const appid = _q("appid");
    if (appid !== null) {
        _id("appid").value = appid;
    }
}

// Actions
_id("action-send").addEventListener("click", main);

// Go!
init();
_id("readiness").classList.add("success");
