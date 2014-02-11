/* Copyright (c) 2014 David Minnerly - Licensed under the MIT License. */

$(document).ready(function() {

	var	hooks = {
		background: '#js-bg',
		text_color: '#js-color',
		quote:      '#js-quote'
	};


	$.getJSON('js/data.json', function(data) {
		var image_object = getRandomBackground(data),
			quote_array = getRandomQuote(data);

		generateQuoteMarkup(quote_array);
		setBackgroundImage(image_object);
	});


	/**
	 * @name randomArrayIndex
	 *
	 * Generates an integer value from 0 to the array parameter's length.
	 *
	 * @param  {array} array  Array to index.
	 * @return {number}       A random number between 0 to the array's length.
	 */
	function randomArrayIndex(array) {
		return Math.floor(Math.random() * array.length);
	}

	/**
	 * @name getRandomBackground
	 *
	 * Hooks into the primary json file, picks a random image from the
	 * backgrounds array and displays it on the screen.
	 *
	 * @param {object} data  The json data gathered from $.getJSON().
	 */
	function getRandomBackground(data) {
		var i = randomArrayIndex(data.backgrounds),
			backgrounds = data.backgrounds[i],

			j = randomArrayIndex(backgrounds.image_list),
			chosen_image = backgrounds.image_list[j];

		return chosen_image;
	}

	/**
	 * @name setBackgroundImage
	 *
	 * Applys the randomly chosen background image to the body.
	 *
	 * @param {object} image  The randomly chosen image from getBackgroundImage.
	 */
	function setBackgroundImage(image) {
		var bg = hooks.background;

		$(bg).css('background-image', 'url(img/' + image.url + ')');
	}

	/**
	 * @name fadeInBackground
	 *
	 * Smoothly fades in the page's background image.
	 */
	function fadeInBackground() {
		var bg = hooks.background;

		// This was just thrown together and needs to be revised. Mainly with
		// running once the page is done loading.
		$(bg).css('opacity', '0');
		$(bg).animate({
			'opacity': '1'
		}, {duration: 1000});
	}

	/**
	 * @deprecated For stylistic reasons the text color needs to stay a
	 *             consistent color, making this function obsolete.
	 *
	 * @name setTextColor
	 *
	 * Set's a different text color depending on the value of the 'style'
	 * key in a background's object.
	 *
	 * @param {string} bg_style  The style of background.
	 */
	function setTextColor(bg_style) {
		var color_hook = hooks.text_color;

		if (bg_style == 'light') {
			$(color_hook).addClass('dark-text');
		}
	}


	/**
	 * @name getRandomQuote
	 *
	 * Hooks into the primary json file, picks a random quote from the
	 * quotes array and displays it on the screen.
	 *
	 * @param  {object} data  Json data gathered from $.getJSON().
	 * @return {array}        Chosen quote and the root where the author/title is stored.
	 */
	function getRandomQuote(data) {
		var i = randomArrayIndex(data.quotes),
			quote_root = data.quotes[i],

			j = randomArrayIndex(quote_root.quote_list),
			chosen_quote = quote_root.quote_list[j],

			result = [quote_root, chosen_quote];

		return result;
	}

	/**
	 * @name generateQuoteMarkup
	 *
	 * Creates the quote's markup.
	 *
	 * @param {array}  quote_root   The first level in the 'quotes' array, where
	 *                              the author/title values are stores.
	 * @param {object} chosen_quote The quote chosen under quote_root.quote_list.
	 */
	function generateQuoteMarkup(quote_array) {
		var quote_root = quote_array[0],
			chosen_quote = quote_array[1];

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
			$('<span>')
				.appendTo(hooks.quote + ' cite a');

			if (quote_root.title) {
				$(hooks.quote + ' cite a')
					.attr('title', quote_root.title);
			}
		}

		if (quote_root.author && chosen_quote.source) {
			$(hooks.quote + ' cite a').prepend(quote_root.author);
		} else if (quote_root.author) {
			$(hooks.quote + ' cite').prepend(quote_root.author);
		} else if (chosen_quote.source) {
			$(hooks.quote + ' cite a').prepend('Unknown');
		} else {
			$(hooks.quote + ' cite').prepend('Unknown');
		}

	}
});
