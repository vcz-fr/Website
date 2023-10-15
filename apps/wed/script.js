function _id(id) { return document.getElementById(id) }
function _r(msg) { _id("input-text").value = msg }
function _notif(msg) { _r(`[INFO] An error has occurred: ${msg}`) }
function _debounce(fn, delay) {
  let timer;
  return function () {
    if (timer) { window.clearTimeout(timer) };
    timer = window.setTimeout(fn, delay);
  }
}

let db;
const openRequest = window.indexedDB.open("wed_db", 2);

// Date stuff
const now = new Date();
const currentDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString(10).padStart(2, "0")}-${now.getDate().toString(10).padStart(2, "0")}`;
_id("input-date").value = currentDate;

openRequest.addEventListener("error", () => _notif("Database failed to open"));
openRequest.addEventListener("upgradeneeded", (e) => {
  db = e.target.result;

  // Execute Database migrations
  if (e.oldVersion < 2) {
    const objectStore = db.createObjectStore("notes_os", {
      keyPath: "date"
    });

    // Define what data items the objectStore will contain
    objectStore.createIndex("date", "date", { unique: true });
  }
});
openRequest.addEventListener("success", () => {
  db = openRequest.result;

  init();
});

// App initialization
function displayNote(date) {
  const tx = db.transaction("notes_os").objectStore("notes_os").index("date").get(date);
  tx.onsuccess = () => {
    _r(tx.result?.text ?? "");
  };
}

function init() {
  displayNote(currentDate);

  _id("input-date").max = currentDate;
  _id("input-text").readOnly = false;
  _id("readiness").classList.add("success");
}

function changeDate() {
  const selectedDate = _id("input-date").value;
  _id("input-text").readOnly = selectedDate !== currentDate;
  displayNote(selectedDate);
}

function autosave() {
  // Only the current page for the day is editable
  if (_id("input-date").value !== currentDate) {
    return;
  }

  const value = { date: currentDate, text: _id("input-text").value };

  const transaction = db.transaction(["notes_os"], "readwrite");
  const tx = transaction.objectStore("notes_os").put(value);
}

// Actions
// Auto-save
_id("input-text").addEventListener('keydown', _debounce(autosave, 500));

// Change date
_id("input-date").addEventListener('change', changeDate);
