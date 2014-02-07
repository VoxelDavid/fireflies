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

	function getRandomBackground(data) {
		var i = randomArrayIndex(data.backgrounds),
			bg_root = data.backgrounds[i];

		var x = randomArrayIndex(bg_root.image_list),
			chosen_bg = bg_root.image_list[x]

		setBackgroundImage(chosen_bg.url);
		setTextColor(chosen_bg.style);
	}

	function setBackgroundImage(image) {
		var bg_hook = $('#js-bg');

		$(bg_hook).css('background-image', 'url(img/' + image + ')');
	}


	// Sets a different text color depending on the value of the 'style' key in the json file.
	// ================================
	// param (string) bg_style - The style of background. Specified in data.json
	//                           for each background image.

	function setTextColor(bg_style) {
		var color_hook = $('#js-color');

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

		// Temporary fix until I can figure out how to use the
		// 'quote_element' object with a string.
		var quote_elem = '#js-quote';

		$('<p>')
			.appendTo(quote_elem)
			.html(chosen_quote.text);

		$('<cite>')
			.appendTo(quote_elem);

		// Create the citation and optional link for the author
		// of the quote.

		if (chosen_quote.source) {
			$('<a>')
				.appendTo(quote_elem + ' cite')
				.attr('target', '_blank')
				.attr('href', chosen_quote.source)
				.addClass('underline');
				// The html for the link is set farther down.

			// Used with the 'underline' class.
			//
			// This is broken because of the html of the link being reset farther down
			// in the messed up if block.
			$('<span>')
				.appendTo(quote_elem + ' cite a');

			if (quote_root.title) {
				$(quote_elem + ' cite a')
					.attr('title', quote_root.title);
			}
		}

		// This is kind of a complicated mess, and it doesn't adhere to the Don't Repeat
		// Yourself rule, but it works and will be revised later.

		if (quote_root.author && chosen_quote.source) {
			$(quote_elem + ' cite a')
				.html(quote_root.author);

		} else if (quote_root.author) {
			$(quote_elem + ' cite')
				.html(quote_root.author);

		} else if (quote_root.source) {
			$(quote_elem + ' cite a')
				.html('Unknown');

		} else {
			$(quote_elem + ' cite')
				.html('Unknown');

		}

	}

	// Run the script.
	main();
});
