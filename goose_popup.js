console.log("goosE_popup.js running");

$(document).ready(function() {
    $('button').click(function(evt) {
    	//debugger;
    	var time = this.attributes.time.value;
    	// send a message to the background to pass on the message to the page
    	chrome.tabs.getSelected(null, function(tab) {
  			chrome.tabs.sendMessage(tab.id, {search: time}, function(response) {
    			console.log(response);
  			});
		});
    });
});
