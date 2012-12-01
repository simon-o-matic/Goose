// Called when the url of a tab changes.
function checkForGoogleUrl(tabId, changeInfo, tab) {
	if (tab.url.indexOf('www.google.com') > -1) {
		console.log("showing page action on tab " + tabId);
	    chrome.pageAction.show(tabId);

	    // TODO check for other page types here
	}
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForGoogleUrl);
