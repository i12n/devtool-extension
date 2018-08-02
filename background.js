chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  chrome.tabs.executeScript(message.tabId, { file: message.scriptToInject });
});

var openCount = 0;
chrome.runtime.onConnect.addListener(function (port) {
    if (port.name == "devtools-page") {
      if (openCount == 0) {
        console.log("DevTools window opening.");
      }
      openCount++;

      port.onDisconnect.addListener(function(port) {
          openCount--;
          if (openCount == 0) {
            console.log("Last DevTools window closing.");
          }
      });
    }
});