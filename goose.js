// Goose - Google Search Keyboard Shortcuts Extension
// Copyright (c) 2012 Simon Raik-Alen.

// On first load inject the shortcut key descriptions
showShortCuts();

// Register a listener for keypresses.
// TODO: make this browser/platform portable
window.onkeypress = function(evt) {
	var evt  = (evt) ? evt : ((event) ? event : null);
	var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);

	console.log("KEY PRESS: " + evt.keyCode);
    
	switch(evt.keyCode)
	{
		case 25:
			searchBy("y");
			break;
		case 23:
			searchBy("w");
			break;
		case 13:
			searchBy("m");
			break;
		case 4:
			searchBy("d");
			break;
		case 8:
			searchBy("h");
			break;
		case 1: // ctr-shift-A
			removeSearchBy();
			break;
		default:
			console.log("No Matching case for key " + evt.keyCode);
	}
}

function searchBy(searchTime) {
	var href = document.location.href;
	var existingTimeSearch = href.lastIndexOf("&tbs=qdr");
	if (existingTimeSearch > -1) {
		if (href.substr(existingTimeSearch + 9, 1) == searchTime) {
			// toggle
			removeSearchBy();
		} else {
			// perform a new search replacing the old search term with the new 
			// NOTE: could this rather generate a click event?
			document.location.href = href.substring(0, existingTimeSearch) + href.substring(existingTimeSearch+10) + "&tbs=qdr:" + searchTime;
		}
	} else {
		// its a first time search so add the parameters to end of the url
		document.location.href += "&tbs=qdr:" + searchTime;
	}
}

// undo a search, similar to doing an "any time" search
function removeSearchBy() {
	console.log("removing search by time");
	var href = document.location.href;
	var existingTimeSearch = href.lastIndexOf("&tbs=qdr");
	if (existingTimeSearch > -1) {
		document.location.href = href.substring(0, existingTimeSearch) + href.substring(existingTimeSearch+10);
	}
}

// inject short cut keys into the code
function showShortCuts() {
	$("a:contains('Past hour')").text("Past hour (ctrl-H)");
	$("a:contains('Past week')").text("Past week (ctrl-W)");
	$("a:contains('Past year')").text("Past year (ctrl-Y)");
	$("a:contains('Past month')").text("Past month (ctrl-M)");
	$("a:contains('Any time')").text("Any time (ctrl-A)");
	$("a:contains('Past 24 hours')").text("Past 24 hours (ctrl-D)");
}

// Listen for a message from the popup specifying which search to run
chrome.extension.onMessage.addListener(
  	function(request) {
	    searchBy(request.search);
	}
);

// When the hash changes it means an ajax call has taken place to refine the search
// and so we need to re-insert the short cut keystrokes.
$(window).bind('hashchange', function() {
	console.log("hash");
	showShortCuts();

	checkForMovies();
});

