//
// Goose
//
// goose_popup.js
// Copyright (c) 2012 Simon Raik-Allen
//
$(document).ready(function() {
    $('button').click(function(evt) {
    	// pull the 'time' (the shortcut key)from the button tag attribute
    	var time = this.attributes.time.value;

    	// Send a message to the page to re-run the search with the new settings
    	chrome.tabs.getSelected(null, function(tab) {
  			chrome.tabs.sendMessage(tab.id, {search: time}, function(response) {
    			console.log(response);
  			});
		});
    });
});
