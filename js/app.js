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
		var chosen_bg = data.backgrounds[i];

		setBackgroundImage(chosen_bg.url)

		// Choose which color text to display depending on
		// the background's Style value.
		if (chosen_bg.style == "light") {
			console.log("Background style is Light")
		} else if (chosen_bg.style == "dark") {
			console.log("Background style is Dark");
		}
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
		var quotes = data.quotes[i];

		var x = randomInt(0, quotes.quote_list.length -1);
		var chosen_quote = quotes.quote_list[x];

		generateQuoteMarkup(quotes, chosen_quote);
	}

	function generateQuoteMarkup(quote_root, chosen_quote) {

		$('<p>')
			.appendTo(quote_element)
			.html(chosen_quote.text);

		$('<cite>')
			.appendTo(quote_element);

		// I want to use the following variable, but I don't
		// know how to concatenate 'cite' to it later on.
		//
		// var quote_element = $('.quote');

		// Create the citation and optional link for the author
		// of the quote.
		if (chosen_quote.source && quote_root.author) {
			$('<a>')
				.appendTo('.quote cite')
				.attr('href', chosen_quote.source)
				.html(quote_root.author);

			if (quote_root.title) {
				$('.quote cite a')
					.attr('title', quote_root.title)
			}
		} else if (quote_root.author) {
			$('.quote cite')
				.html(quote_root.author);
		} else {
			$('.quote cite')
				.html("Unknown");
		}
	}

});
