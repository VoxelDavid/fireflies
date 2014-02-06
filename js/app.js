/* Copyright (c) 2014 David Minnerly - Licensed under the MIT License. */

$(document).ready(function() {

	var quote_element = $('.quote');


	// The main logic, gets the data.json file and
	// sets a Quote and Background.

	$.getJSON('js/data.json', function(data) {
		getRandomQuote(data);
		getRandomBackground(data);
	});



	// Generate a random integer, primarily used for getting
	// an Array index.

	function randomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}


	// Hooks into the data.json file and gets a random
	// image from the backgrounds array to display.

	function getRandomBackground(data) {
		// .length starts counting at 1 instead of 0, so 1 needs
		// to be subtracted to get correct array length.
		var i = randomInt(0, data.backgrounds.length - 1),
			chosen_bg = data.backgrounds[i];

		setBackgroundImage(chosen_bg.url);
		setTextColor(chosen_bg.style);
	}

	function setBackgroundImage(image) {
		$('body').css('background-image', 'url(img/' + image + ')');
	}


	// param (string) bg_style - The style of background. Specified in data.json
	//                           for each background image.

	function setTextColor(bg_style) {
		// Choose which color text to display depending on
		// the background's Style value.
		if (bg_style == 'light') {
			$(quote_element).addClass('light-background');
		} else if (bg_style == 'dark') {
			$(quote_element).addClass('dark-background');
		}
	}


	// Generate two random numbers to select a quote from the json file.
	// ================================
	// param (string) data - Quotes and background data from 'data.json'.

	function getRandomQuote(data) {
		// .length starts counting at 1 instead of 0, so 1 needs
		// to be subtracted to get correct array length.
		var i = randomInt(0, data.quotes.length -1),
			quote_root = data.quotes[i];

		var x = randomInt(0, quote_root.quote_list.length -1),
			chosen_quote = quote_root.quote_list[x];

		generateQuoteMarkup(quote_root, chosen_quote);
	}


	// Creates the required markup for the Quotes
	// ================================
	// param (object) quote_root   - The first level in the 'quotes' array, where
	//                               the author/title values are stored.
	// param (object) chosen_quote - The quote chosen under quote_root.quote_list.

	function generateQuoteMarkup(quote_root, chosen_quote) {

		$('<p>')
			.appendTo(quote_element)
			.html(chosen_quote.text);

		$('<cite>')
			.appendTo(quote_element);

		// Create the citation and optional link for the author
		// of the quote.
		if (chosen_quote.source && quote_root.author) {
			$('<a>')
				.appendTo('.quote cite')
				.attr('href', chosen_quote.source)
				.attr('target', '_blank')
				.html(quote_root.author);

			if (quote_root.title) {
				$('.quote cite a')
					.attr('title', quote_root.title);
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
