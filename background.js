// use me to store values etc. my index.html can access
console.log("This is the UFG-CHROME-EXTENSION background.js script")

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }