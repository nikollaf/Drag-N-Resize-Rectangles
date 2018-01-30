export function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    ls = JSON.parse(global.localStorage.getItem(key)) || {};
  }
  return ls;
}

export function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      key,
      JSON.stringify({
        value
      })
    );
  }
}
