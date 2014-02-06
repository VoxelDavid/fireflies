/* Copyright (c) 2014 David Minnerly - Licensed under the MIT License. */

$(document).ready(function() {

	var quote_element = $('#js-quote');


	// The main logic, gets the data.json file and
	// sets a Quote and Background.

	function main() {
		$.getJSON('js/data.json', function(json_data) {
			getRandomQuote(json_data);
			getRandomBackground(json_data);
		});
	}


	// Generates a random integer to get the index of an array.

	function randomArrayIndex(array) {
		return Math.floor(Math.random() * array.length);
	}


	// Hooks into the data.json file and gets a random
	// image from the backgrounds array to display.

	function getRandomBackground(bg_data) {
		var i = randomArrayIndex(bg_data.backgrounds),
			chosen_bg = bg_data.backgrounds[i];

		setBackgroundImage(chosen_bg.url);
		setTextColor(chosen_bg.style);
	}

	function setBackgroundImage(image) {
		$('body').css('background-image', 'url(img/' + image + ')');
	}


	// param (string) bg_style - The style of background. Specified in data.json
	//                           for each background image.

	function setTextColor(bg_style) {
		var color_hook = $('#js-color');

		// Use a different text color depending on the value of the 'style'
		// key in the json file.
		if (bg_style == 'light') {
			$(color_hook).addClass('dark-text');
		}
	}


	// Generate two random numbers to select a quote from the json file.
	// ================================
	// param (string) data - Quotes and background data from 'data.json'.

	function getRandomQuote(quote_data) {
		var i = randomArrayIndex(quote_data.quotes),
			quote_root = quote_data.quotes[i];

		var x = randomArrayIndex(quote_root.quote_list),
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
				.appendTo('#js-quote cite')
				.attr('href', chosen_quote.source)
				.attr('target', '_blank')
				.addClass('underline')
				.html(quote_root.author);

			// Used with the 'underline' class.
			$('<span>')
				.appendTo('#js-quote cite a');

			if (quote_root.title) {
				$('#js-quote cite a')
					.attr('title', quote_root.title);
			}
		} else if (quote_root.author) {
			$('#js-quote cite')
				.html(quote_root.author);
		} else {
			$('#js-quote cite')
				.html("Unknown");
		}
	}

	// Run the script.
	main();
});
