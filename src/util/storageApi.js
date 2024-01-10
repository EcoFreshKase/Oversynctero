/* eslint-disable no-undef */
export function save(key, value, callback) {
  const obj = {};
  obj[key] = value;

  console.log("setting", key, "to", value);
  chrome.storage.sync.set(obj, callback);
}

export function load(key, callback) {
  console.log("Loading:", key);
  chrome.storage.sync.get([key]).then((data) => callback(data[key]));
}
