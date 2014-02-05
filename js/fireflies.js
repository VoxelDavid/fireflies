/* Copyright (c) 2014 David Minnerly - Licensed under the MIT License. */

$(document).ready(function() {

	// HTML elements.
	var quote        = $('.quote'),
	    quote_p      = $('.quote p'),
	    quote_cite   = $('.quote cite'),
	    quote_source = $('.quote cite a');

	/**
	 * The main logic, gets the data.json file and
	 * sets a Quote and Background.
	 */
	$.getJSON('data.json', function(data) {
		quote(data);
		background(data);
		$('body').css('background-image', 'url(img/bg-highway.jpg)');
	});

	/**
	 * Generate a random integer, primarily used for getting
	 * an Array index.
	 */
	function randomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	/**
	 * Hooks into the data.json file and gets a random
	 * image from the backgrounds array to display.
	 */
	function background(data) {
		var i = randomInt(0, data.backgrounds.length);
		backgroundImage(data.backgrounds[i].url)
	}

	function backgroundImage(image) {
		return $('body').css('background-image', 'url(img/' + image + ')');
	}

	/**
	 * Get a random Quote with corresponding Citation and source
	 * link from data.json and display them on screen.
	 */
	function quote(data) {
		var i = randomInt(0, data.quotes.length);
		quote_p.html(data.quotes[i]._001.quote);
		quote_cite.html(data.quotes[i].author);

		// if (data.quotes[i]._001.source != undefined) {
		// 	console.log("Rabbits");
		// }
	}
});

