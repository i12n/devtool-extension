/*
  每次页面打开的时候自动加载, 不能使用页面的 window
*/
var script = document.createElement('script');
script.src = chrome.extension.getURL('devtool/backend.js');
script.onload = function() {
  this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(script);

window.addEventListener('message', function(event) {
  // Only accept messages from the same frame
  if (event.source !== window) {
    return;
  }

  var message = event.data;

  // Only accept messages that we know are ours
  if (typeof message !== 'object' || message === null ||
      !message.source === 'devtool-inject') {
    return;
  }

  chrome.runtime.sendMessage(message);
});