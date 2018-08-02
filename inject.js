/*
  每次页面打开的时候自动加载, 不能使用页面的 window
*/
var script = document.createElement('script');
script.src = chrome.extension.getURL('backend.js');
script.onload = function() {
  this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(script);
