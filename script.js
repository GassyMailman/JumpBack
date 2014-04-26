console.log("HHIHI");

//We want to have a variable called previousWebsite that will store the
// last website that our tab visited.
chrome.tabs.getSelected(null, function(tab) {
        var tabID = tab.id;
        tabUrl = tab.url;

        return tab.url;
});

var previousWebsite = 'gffvd    ';
var thisWebPage = tabUrl;
var getImportantPart = URL.match("http(s)?://[^/]*")[0];

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if(changeInfo.status == 'complete'){
        thisWebPage = tab.url;
    }
    alert(previousWebsite);
    // if(getImportantPart(thisWebPage) != previousWebsite){
    //     //go to previousWebsite
    //     //chrome.extension.sendRequest({redirect: previousWebsite});
    //     //update previousWebsite to tab.url
    //     previousWebsite = tab.url;
    // }
});

// Everytime we continue browsing, we will use this method to check our current
// url is the same as our next webpage
// We will use an if else statement to check whether our new webpage is the same
// as our last visited webpage
function getImportantPart(URL) {
    return URL.match("http(s)?://[^/]*")[0];
}
