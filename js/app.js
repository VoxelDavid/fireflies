/* Copyright (c) 2014 David Minnerly - Licensed under the MIT License. */

$(document).ready(function() {

	/**
	 * The main logic, gets the data.json file and
	 * sets a Quote and Background.
	 */
	$.getJSON('js/data.json', function(data) {
		getRandomQuote(data);
		getRandomBackground(data);
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
	function getRandomBackground(data) {
		// .length starts counting at 1 instead of 0, so 1 needs
		// to be subtracted to get correct array length.
		var i = randomInt(0, data.backgrounds.length - 1);

		setBackgroundImage(data.backgrounds[i].url)
	}

	function setBackgroundImage(image) {
		$('body').css('background-image', 'url(img/' + image + ')');
	}


	/**
	 * Get a random Quote with corresponding Citation and source
	 * link from data.json and display them on screen.
	 */
	function getRandomQuote(data) {
		// .length starts counting at 1 instead of 0, so 1 needs
		// to be subtracted to get correct array length.
		var i = randomInt(0, data.quotes.length - 1);
		var chosen_quote = data.quotes[i];

		$('<p>')
			.appendTo(".quote")
			.html(chosen_quote.one.quote)

		if (chosen_quote.author) {
			$('<cite>')
				.appendTo(".quote")
				.html(chosen_quote.author);
		} else {
			$('<cite>')
				.appendTo(".quote")
				.html("Unknown");
		}

		if (chosen_quote.source) {
			$('<a>')
				.appendTo(".quote cite")
				.html(chosen_quote.source)
		}
	}

});
