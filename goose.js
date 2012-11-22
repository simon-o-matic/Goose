// Goose - Google Search Keyboard Shortcuts
// Simon Raik-Alen.

// Listen for keypresses
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
			// replace
			document.location.href = href.substring(0, existingTimeSearch) + href.substring(existingTimeSearch+10) + "&tbs=qdr:" + searchTime;
		}
	} else {
		// its new so add to end
		document.location.href += "&tbs=qdr:" + searchTime;
	}
}

function removeSearchBy() {
	console.log("removing search by time");
	var href = document.location.href;
	var existingTimeSearch = href.lastIndexOf("&tbs=qdr");
	if (existingTimeSearch > -1) {
		document.location.href = href.substring(0, existingTimeSearch) + href.substring(existingTimeSearch+10);
	}
}
