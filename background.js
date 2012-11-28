// Called when the url of a tab changes.
function checkForGoogleUrl(tabId, changeInfo, tab) {
  if (tab.url.indexOf('google.com') > -1) {
    chrome.pageAction.show(tabId);
    //chrome.pageAction.popup(tabId, popup.html);
  }
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForGoogleUrl);

alert("Bakground loaded");