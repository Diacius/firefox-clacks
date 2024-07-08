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
async function getCurrentURL() {
  let querying = await browser.tabs.query({active: true})
  return querying[0].url
}
async function checkIfClacks(e) {
  let currURL = await getCurrentURL()
  console.log(e)
  console.log(currURL)
  if (e.url == currURL) {
    // for every item
    for (const item in e.responseHeaders) {
      // check for the clack header
      if (e.responseHeaders[item].name == ["x-clacks-overhead"]) {
        // if present change icon
        var wasClacks = true
        console.log("wasclacksinner")
        browser.browserAction.setIcon({
          path: {
            48: "exclaim.png",
          }
        });
        
      }
    }
  }
  console.log("wasclacks" + toString(wasClacks))
  if (wasClacks == false) {
    settingIcon = browser.browserAction.setIcon({
      path: {
        48: "exclaim_off.png",
      },
    });
  }
}
// When the server sends a response 
browser.webRequest.onHeadersReceived.addListener(
  checkIfClacks,
  { urls: ["*://*/*"] },
  ["blocking", "responseHeaders"],
);


