function addTab(id) {
    tabHistories[id] = new Array;
}

function deleteTab(id) {
    delete tabHistories[id];
}

function addHistoryToTab(history, tab){
    tabHistories[tab].push(history);
}

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.getCurrent(function (tab) {
    if (check === "YES") chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });

    });
});

chrome.tabs.onCreated.addListener(function(tab){
  addTab(tab.id);
});
