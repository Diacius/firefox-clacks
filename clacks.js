/*function checkIfClacks(e) {
    const gnu = {
        name: 'X-Clacks-Overhead',
        value: "GNU Terry Pratchett"
    }
    e.responseHeaders.push(gnu);
    return {responseHeaders: e.responseHeaders};
}

browser.webRequest.onHeadersReceived.addListener(
    checkIfClacks, {urls: ["https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onHeadersReceived#examples"]},
    ["blocking", "responseHeaders"],
);*/
"use strict";
let settingIcon = browser.browserAction.setIcon({
  path: {
    48: "exclaim_off.png",
  },
});
/*
This is the page for which we want to add the clacks header.
*/
const targetPage = "*://*/*";
function rewriteUserAgentHeader(e) {
  const gnu = {
    name: 'X-Clacks-Overhead',
    value: "GNU Terry Pratchett"
    }
    e.requestHeaders.push(gnu);
    browser.runtime.sendMessage({clacks: true})
  return { requestHeaders: e.requestHeaders };
}

/*
Add rewriteUserAgentHeader as a listener to onBeforeSendHeaders,
only for the target page.

Make it "blocking" so we can modify the headers.
*/

//Code to change the icon of the extention

browser.webRequest.onBeforeSendHeaders.addListener(
  rewriteUserAgentHeader,
  { urls: [targetPage] },
  ["blocking", "requestHeaders"],
);
function getCurrentURL() {
  let querying = browser.tabs.query({active: true})
  return querying.url
}
function checkIfClacks(e) {
  if (e.responseHeaders["x-clacks-overhead"]) {
    let settingIcon = browser.action.setIcon({
      path: {
        48: "exclaim.png",
        32: "path/to/image32.jpg",
      },
    });
  }
  }
// When the server sends a response 
browser.webRequest.onHeadersReceived.addListener(
  checkIfClacks,
  { urls: [getCurrentURL()] },
  ["blocking", "responseHeaders"],
);


