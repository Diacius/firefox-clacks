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
var clackPages = [];
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
  console.log(JSON.parse(JSON.stringify(e)));
  if (e.url == currURL) {
    // for every item
    for (const item in e.responseHeaders) {
      // check for the clack header
      if (e.responseHeaders[item].name.toLowerCase() == ["x-clacks-overhead"]) {
        // if present change icon
        var wasClacks = true
        if (clackPages.indexOf(e.url) == -1) {
          // add to list of pages with clacks
          clackPages.push(e.url)
        }
        console.log("wasclacksinner")
        browser.browserAction.setIcon({
          path: "exclaim_vector.svg"
        });
        
      }
    }
  
  console.log("wasclacks" + toString(wasClacks))
  if (wasClacks !== true) {
    console.log("turned off on" + e.url)
    settingIcon = browser.browserAction.setIcon({
      path: {
        48: "exclaim_off.png",
      },
    });
  }
  }
}
async function updateActiveTab(tabs) {
  var gettingActiveTab = await browser.tabs.query({active: true, currentWindow: true});
  var currTab = gettingActiveTab[0];
  if (clackPages.indexOf(currTab.url) == -1) {
    settingIcon = browser.browserAction.setIcon({
      path: {
        48: "exclaim_off.png",
      },
    });
  }
  else {
    browser.browserAction.setIcon({
      path: "exclaim_vector.svg"
    });
  }
}
// When the server sends a response 
browser.webRequest.onHeadersReceived.addListener(
  checkIfClacks,
  { urls: ["*://*/*"] },
  ["blocking", "responseHeaders"],
);
// listen to tab URL changes
browser.tabs.onUpdated.addListener(updateActiveTab);

// listen to tab switching
browser.tabs.onActivated.addListener(updateActiveTab);

// listen for window switching
browser.windows.onFocusChanged.addListener(updateActiveTab);


