$(document).ready(function() {

	// HTML elements.
	var blockquote = $('.quote'),
	    quote_p    = $('.quote p'),
	    quote_cite = $('.quote cite');

	// Random integers used to decide which Quote and Background to use.
	function randomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	// Setting the background
	function background(data) {
		var i = randomInt(0, data.backgrounds.length);
		setBackground(data.backgrounds[i].url)
	}

	function setBackground(image) {
		return $('body').css('background-image', 'url(img/' + image + ')');
	}

	// Setting Quotes, citations and source links.
	function quote(data) {
		var i = randomInt(0, data.quotes.length);
		quote_p.html(data.quotes[i]._001.quote);
		quote_cite.html(data.quotes[i].author);

		// if (data.quotes[i]._001.source != undefined) {
		// 	console.log("Rabbits");
		// }
	}

	$.getJSON('fireflies.json', function(data) {
		quote(data);
		background(data);
	});
});

