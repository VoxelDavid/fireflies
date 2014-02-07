/* Copyright (c) 2014 David Minnerly - Licensed under the MIT License. */

$(document).ready(function() {

	var	hooks = {
		background: '#js-bg',
		text_color: '#js-color',
		quote:      '#js-quote'
	}


	// The main logic, gets the data.json file and
	// sets a Quote and Background.

	function main() {
		$.getJSON('js/data.json', function(json) {
			getRandomBackground(json);
			getRandomQuote(json);
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
		var bg = hooks.background;

		$(bg).css('background-image', 'url(img/' + image + ')');
	}


	}


	// Sets a different text color depending on the value of the 'style' key in the json file.
	// ================================
	// param (string) bg_style - The style of background. Specified in data.json
	//                           for each background image.

	function setTextColor(bg_style) {
		var color_hook = hooks.text_color;

		if (bg_style == 'light') {
			$(color_hook).addClass('dark-text');
		}
	}


	// Generate two random numbers to select a quote from the json file.
	// ================================
	// param (string) data - Quotes and background data from 'data.json'.

	function getRandomQuote(data) {
		var i = randomArrayIndex(data.quotes),
			quote_root = data.quotes[i];

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
			.appendTo(hooks.quote)
			.html(chosen_quote.text);

		$('<cite>')
			.appendTo(hooks.quote);

		// Create the citation and optional link for the author
		// of the quote.

		if (chosen_quote.source) {
			$('<a>')
				.appendTo(hooks.quote + ' cite')
				.attr('target', '_blank')
				.attr('href', chosen_quote.source)
				.addClass('underline');
				// The html for the link is set farther down.

			// Used with the 'underline' class.
			//
			// This is broken because of the html of the link being reset farther down
			// in the messed up if block.
			$('<span>')
				.appendTo(hooks.quote + ' cite a');

			if (quote_root.title) {
				$(hooks.quote + ' cite a')
					.attr('title', quote_root.title);
			}
		}

		// This is kind of a complicated mess, and it doesn't adhere to the Don't Repeat
		// Yourself rule, but it works and will be revised later.

		if (quote_root.author && chosen_quote.source) {
			$(hooks.quote + ' cite a')
				.html(quote_root.author);

		} else if (quote_root.author) {
			$(hooks.quote + ' cite')
				.html(quote_root.author);

		} else if (quote_root.source) {
			$(hooks.quote + ' cite a')
				.html('Unknown');

		} else {
			$(hooks.quote + ' cite')
				.html('Unknown');

		}

	}

	// Run the script.
	main();
});
