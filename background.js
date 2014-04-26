console.log("BLAH");

var tabHistories = {};

function addTab(id) {
    tabHistories[id] = new Array;
}

function deleteTab(id) {
    delete tabHistories[id];
}

function addHistoryToTab(history, tab){
    var hist = tabHistories[tab];
    if (hist == null){
      addTab(tab);
      hist = tabHistories[tab];
    }
    hist.push(history);
}

function getImportantPart(URL) {
    return URL.match("http(s)?://[^/]*")[0];
}

function goBack(tab){
  chrome.tabs.executeScript(tab.id,{
    code: 'goBack()'
  });
}

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
chrome.tabs.getSelected(null, function(tab){

      var history = tabHistories[tab.id];

      var indexOfLastDifferentSite = -1;
      var i = history.length - 2; // indexed at 0 AND don't include current site
      var current = history[history.length-1];
      while (indexOfLastDifferentSite === -1){
          if (getImportantPart(history[i]) !== getImportantPart(current)){
              indexOfLastDifferentSite = i;
          }
          else i--;
      }

      if (indexOfLastDifferentSite != -1){
        var numTimesToGoBack = history.length - indexOfLastDifferentSite;
        for (var i = 0; i < numTimesToGoBack; i++){
          goBack(tab);
          history.pop();
        }
        console.log(numTimesToGoBack);

      }
    });
});

chrome.tabs.onCreated.addListener(function(tab){
    addTab(tab.id);
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
    deleteTab(tabId);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
});

chrome.webNavigation.onCommitted.addListener(function(details){
  if (details["transitionQualifiers"].length === 0 && details["transitionType"] !== "auto_subframe" && details["transitionType"] !== "manual_subframe"){
    addHistoryToTab(details["url"], details["tabId"]);
  }
});
