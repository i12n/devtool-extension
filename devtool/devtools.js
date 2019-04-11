// Create a new panel
chrome.devtools.panels.create(
  "Custom Panel",
  null,
  "devtool/panel.html",
  function(panel, result) {
    // onShown, onHidden, onSearch
  }
);

function getChildren(sidebar) {
  return function() {
    sidebar.setExpression('$0.children', 'children');
  }
}

//  Create a new elements sidebar
chrome.devtools.panels.elements.createSidebarPane("Custom Sidebar", function(sidebar)
{ 
  var showChild = getChildren(sidebar);
  showChild();
  chrome.devtools.panels.elements.onSelectionChanged.addListener(showChild);
});

// Create a new sources sidebar
chrome.devtools.panels.sources.createSidebarPane("Custom Sidebar", function(sidebar)
{
  sidebar.setPage('devtool/peppa.html');
  sidebar.setHeight("800px");
});

// // request css
// var x = new XMLHttpRequest();
// x.open('GET', 'devtool/custom.css');
// x.onload = function() {

//   chrome.devtools.inspectedWindow.eval('console.log(' + x.responseText + ');');
//   chrome.devtools.panels.applyStyleSheet(x.responseText);
// };
// x.send();


// // chrome.devtools.panels.setOpenResourceHandler(function (resource) {
// //   alert(1);
// //   //alert(JSON.stringify(resource))
// // })

// // chrome.devtools.panels.openResource("http://localhost:35729/livereload.js", 90, function(a, b) {
// //   // Resource should be open, but no way to test that it succeeded
// //   // alert(JSON.stringify(a))
// // });


// chrome.devtools.inspectedWindow.eval('console.log("inspectedWindow.eval");');

// chrome.devtools.inspectedWindow.getResources(function (res) {
//   chrome.devtools.inspectedWindow.eval('console.log(' + JSON.stringify(res)+ ');');
// })

// 更改 source 文件时候触发
chrome.devtools.inspectedWindow.onResourceContentCommitted.addListener(function(resource, content) {
  resource.getContent(function(_content, _encoding) {
    chrome.devtools.inspectedWindow.eval('console.log(' + JSON.stringify(_content) + ');');
  })
  // resource.setContent('change', false); // true 和 false 保存、暂存
  chrome.devtools.inspectedWindow.eval('console.log(' + JSON.stringify(resource) + ');');
})

// // setTimeout(function() {
// //   chrome.devtools.inspectedWindow.reload()
// // }, 5000)



// chrome.devtools.network.onRequestFinished.addListener( function(request) {
//   chrome.devtools.inspectedWindow.eval('console.log(unescape("' + escape(request.request.url) + '"))');
// });

// // chrome.devtools.network.onNavigated.addListener(function(request) {
// //   chrome.devtools.inspectedWindow.eval('console.log(unescape("' + escape(request.request.url) + '"))');
// // })

chrome.devtools.network.getHAR(function(result) {
  var entries = result.entries;
  chrome.devtools.inspectedWindow.eval('console.log(' + JSON.stringify(result) + ')');
});

// chrome.devtools.network.onNavigated.addListener(function(request) {
//   chrome.devtools.network.getHAR(function(result) {
//     var entries = result.entries;
//     chrome.devtools.inspectedWindow.eval('console.log(' + JSON.stringify(result) + ')');
//   });
// })

chrome.devtools.network.addRequestHeaders({
  "X-PROXY-HOSTNAME": "HOSTNAME"
});

for (var key in chrome.devtools.panels) {
  chrome.devtools.inspectedWindow.eval('console.log(' + JSON.stringify(key) + ')');
}


// Injecting a Content Script
var backgroundPageConnection = chrome.runtime.connect({
    name: "devtools-page"
});
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  
});
// Injecting a Content Script
chrome.runtime.sendMessage({
    tabId: chrome.devtools.inspectedWindow.tabId,
    scriptToInject: "devtool/inject.js"
});



