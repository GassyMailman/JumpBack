console.log("HHIHI");

//We want to have a variable called previousWebsite that will store the
// last website that our tab visited.
chrome.tabs.getSelected(null, function(tab) {
        var tabID = tab.id;
        tabUrl = tab.url;

        return tab.url;
});

var previousWebsite = 'www.google.com';
var thisWebPage;
var timeToChange;
//var getImportantPart = URL.match("http(s)?://[^/]*")[0];

chrome.tabs.onActivated.addListener(function (info) {
    var tab = chrome.tabs.get(info.tabId, function(tab) {
        previousWebsite = getImportantPart(tab.url);
    });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if(changeInfo.status == 'complete'){
        thisWebPage = tab.url;
    }
    console.log(getImportantPart(thisWebPage));
    if(getImportantPart(thisWebPage) != previousWebsite){
         //go to previousWebsite
         timeToChange = true;

         console.log(previousWebsite);
    }
});

chrome.browserAction.onClicked.addListener(function (tab) {
    if (timeToChange){
        chrome.tabs.update(tab.id, {url: previousWebsite});
        console.log('HIHI');
    }
});

// Everytime we continue browsing, we will use this method to check our current
// url is the same as our next webpage
// We will use an if else statement to check whether our new webpage is the same
// as our last visited webpage
function getImportantPart(URL) {
    var pathArray = (URL).split('/');
    var host = 'http://' + pathArray[2];
    return host;
}
