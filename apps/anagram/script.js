const _id = id => document.getElementById(id);
const _tpl = (l, ao, bo) => `<tr><td${ao === bo ? ' class="eql"' : ''}>${l}</td><td class="a">${ao}</td><td class="b">${bo}</td></tr>`;

const extractStats = (str) => str.normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleUpperCase()
    .split("")
    .reduce(
        (acc, cur) => acc.set(cur, (acc.get(cur) ?? 0) + 1),
        new Map()
    );

const update = () => {
    const fd = new FormData(_id("form"));
    const [a, b] = [fd.get("text-a"), fd.get("text-b")];
    const [a_map, b_map] = [extractStats(a), extractStats(b)];
    const l_set = new Set([...a_map.keys(), ...b_map.keys()]);
    const l_ord = Array.from(l_set).sort((a, b) => a > b);

    _id("response").innerHTML = l_ord.map((l) => _tpl(l, a_map.get(l) ?? 0, b_map.get(l) ?? 0)).join("");
};

// Go!
_id("text-a").addEventListener("input", update);
_id("text-b").addEventListener("input", update);

// When the page is refresh, form fields may not be unset by the browser
// Instead of requiring the user to interact with the textareas, we just update the table
update();

_id("readiness").classList.add("success");
