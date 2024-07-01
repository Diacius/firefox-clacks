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

/*
This is the page for which we want to rewrite the User-Agent header.
*/
const targetPage = "*://*/*";

/*
Set UA string to Opera 12
*/
const ua =
  "Opera/9.80 (X11; Linux i686; Ubuntu/14.10) Presto/2.12.388 Version/12.16";

/*
Rewrite the User-Agent header to "ua".
*/
function rewriteUserAgentHeader(e) {
  /*for (const header of e.requestHeaders) {
    if (header.name.toLowerCase() === "user-agent") {
      header.value = ua;
    }
  }*/
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
browser.webRequest.onBeforeSendHeaders.addListener(
  rewriteUserAgentHeader,
  { urls: [targetPage] },
  ["blocking", "requestHeaders"],
);
