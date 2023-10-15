const _id = id => document.getElementById(id);
const _v = id => (v = _id(id).value, v === "" ? null : v);
const _r = msg => _id("response").value = msg;
const _notif = msg => _r(`[INFO] An error has occurred: ${msg}`);

const hash = str => {
    const enc = new Uint8Array(16);
    (new TextEncoder()).encodeInto(str, enc);
    const salt = [184, 73, 31, 78, 223, 87, 15, 28, 153, 252, 59, 9, 255, 158, 253, 133];
    return enc.map((a, b) => (a * 4129 + salt[b] * 7583) % 256)
}

const importKey = async (usage, iv) => await crypto.subtle.importKey(
    "raw",
    hash(iv),
    { name: "AES-GCM" },
    false,
    [usage]
);

const prepareAlgorithm = iv => ({
    name: "AES-GCM",
    iv: (new TextEncoder()).encode(iv)
});

const encryptMessage = async (message, iv) => btoa(String.fromCharCode(...new Uint8Array(
    await crypto.subtle.encrypt(
        prepareAlgorithm(iv),
        await importKey("encrypt", iv),
        (new TextEncoder).encode(message)
    )
)));

const decryptMessage = async (base64, iv) => (new TextDecoder()).decode(
    await crypto.subtle.decrypt(
        prepareAlgorithm(iv),
        await importKey("decrypt", iv),
        new Uint8Array(atob(base64).split('').map(c => c.charCodeAt(0)))
    )
);

const main = action => async e => {
    e.preventDefault()
    try {
        const iv = _v("key");
        const msg = _v("message");

        if (iv === null || msg === null) {
            throw "These inputs are required: key, message";
        }

        const result = action === "enc" ?
            await encryptMessage(msg, iv) :
            await decryptMessage(msg, iv);

        _r(result);
    } catch (err) {
        _notif(err);
    }
};

// Actions
_id("action-enc").addEventListener("click", main("enc"));
_id("action-dec").addEventListener("click", main("dec"));

_id("response").addEventListener("click", e => e.target.select());

// Go!
_id("readiness").classList.add("success");