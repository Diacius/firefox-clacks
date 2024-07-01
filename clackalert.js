/*browser.runtime.onMessage.addListener(alertclack);
function alertclack() {
    alert("CLACKS DETECTED!!");
}
*/
browser.runtime.onMessage.addListener(notify);

function notify(message) {
  browser.notifications.create({
    type: "basic",
    iconUrl: browser.extension.getURL("link.png"),
    title: "You clicked a link!",
    message: message.url,
  });
}