/* Copyright (c) 2014 David Minnerly - Licensed under the MIT License. */

$(function() {

	/**
	 * Fragment identifiers in the HTML for JavaScript hooks.
	 * @type {Object}
	 */
	var hooks = {
		background: '#js-bg',
		quote:      '#js-quote'
	};


	$.getJSON('js/data.json', function(data) {
		var image_array = randomArrayFromJSON(data, 'backgrounds'),
			quote_array = randomArrayFromJSON(data, 'quotes'),
			url_parameters = getUrlParameters();

		background.setImage(image_array);
		quote.createMarkup(quote_array);

		overrideBackgroundImage(data, url_parameters);
		overrideQuote(data, url_parameters);

	});

	var background = {
		/**
		 * @name setImage
		 *
		 * Applies the randomly chosen background image to the body.
		 *
		 * @param {Array} image_array  The array containing the background image objects.
		 */
		setImage: function(image_array) {
			var bg = hooks.background,
				image_url = image_array[1].url;

			// Adds the class corresponding to the file name of the image (minus the extension)
			$(bg).addClass(image_url.replace(/\.[^/.]+$/, ''));
		}
	}

	var quote = {
		/**
		 * @name createMarkup
		 *
		 * Creates the quote's markup.
		 *
		 * @param {Array} quote_array The array containing the randomly chosen quote objects.
		 */
		createMarkup: function(quote_array) {
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

			// This mess needs to get redone, though I can't think of how to do it.
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
	}

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
	 * @name getUrlParameters
	 *
	 * Converts the query string in the browser URL into an object
	 * for other functions to hook into.
	 *
	 * @return {object} The query string converted into an object.
	 */
	function getUrlParameters() {
		// source: http://stackoverflow.com/a/2880929
		// Slightly modified.

		var match,
			pl     = /\+/g, // Regex for replacing addition symbol with a space
			search = /([^&=]+)=?([^&]*)/g,
			decode = function(s) { return decodeURIComponent(s.replace(pl, ' ')); },
			query  = window.location.search.substring(1),
			results = {};

		while (match = search.exec(query))
			results[decode(match[1])] = decode(match[2]);

		return results;
	}

	/**
	 * @name overrideBackgroundImage
	 *
	 * Overrides the getRandomBackground function to display an image specified
	 * in the query string.
	 *
	 * You can select the background to display in two ways: numbers or string.
	 *
	 * http://fireflies.voxeldavid.com?bg=3&bg=1 — Selects the 4th object under
	 * 'backgrounds' and the second object under 'image_list'.
	 *
	 * http://fireflies.voxeldavid.com?bg=majestic-log.jpg — Searches through the
	 * entire backgrounds array to find a 'url' key with that value.
	 *
	 * @param  {object} json_data    The json data retrieved by jQuery's getJSON function.
	 * @param  {object} query_string Object of current query string values.
	 */
	function overrideBackgroundImage(json_data, query_string) {
		var bg_id = hooks.background,
			keywords = ['bg', 'bg_sub']
			bg = query_string[keywords[0]],
			bg_sub = query_string[keywords[1]];

		// Using numbers to navigate the arrays.
		// fireflies.voxeldavid.com?bg=3&bg_sub=1
		if (bg && bg_sub) {

			var queried_image = json_data.backgrounds[bg].image_list[bg_sub];

			// I think a better solution for setting this up would be to have it
			// using variables that getRandomBackground can hook in to, so it can
			// see if the background is set by the query string.
			//
			// This is mainly something for me to use, though. It's not intended for
			// the general public; the people that will be viewing the site.

			// http://stackoverflow.com/a/2644364
			$(bg_id).attr('class', function(i, c) {
				return c.replace(/\bbg-\S+/g)
			});

			setBackgroundImage(queried_image);

		// Using a single string to navigate the array.
		// fireflies.voxeldavid.com?bg=majestic-log.jpg
		} else if (bg && !bg_sub) {

			// Search through the 'backgrounds' and 'image_list' arrays to
			// find the one containing the value of bg.

		}
	}

	/**
	 * @name overrideQuote
	 *
	 * Overrides the getRandomQuote function to display a quote
	 * specified in the query string.
	 *
	 * @usage http://fireflies.voxeldavid.com?quote=1
	 * @param {object} query_string  Object of current query string values.
	 */
	function overrideQuote(json_data, query_string) {
		var quote_id = hooks.quote,
			keywords = ['quote', 'quote_sub']
			quote = query_string[keywords[0]],
			quote_sub = query_string[keywords[1]];

		// Setting up the background image override was fairly straightforward,
		// but this function needs to make use of the generateQuoteMarkup function.
		//
		// This should be interesting.
	}


	/**
	 * @randomArrayFromJSON
	 *
	 * This function takes care of picking random arrays from the json file
	 * loaded by jQuery's getJSON function.
	 *
	 * Example: var image_array = randomArrayFromJSON(date, 'backgrounds');
	 *
	 * In this case the 'backgrounds' string was passed as the array, so when the
	 * function first initializes its variables it sets 'data' one level deeper as
	 * the 'backgrounds' array.
	 *
	 * @param  {object} data  The json data retrieved by jQuery's getJSON function.
	 * @param  {string} array The array to look through in 'data', as a string.
	 * @return {array}        The 'root' of the chosen image/quote and its list array.
	 */
	function randomArrayFromJSON(json, array) {
		// Chooses a random Object from the 'backgrounds' or 'quotes'
		// array, depending on the value of the 'array' parameter.
		var json_array = json[array];
			i = randomArrayIndex(json_array),
			array_root = json_array[i];

		if (array == 'backgrounds')
			return randomSubArray(array_root.image_list);
		else if (array == 'quotes')
			return randomSubArray(array_root.quote_list);

		function randomSubArray(sub_array) {
			var i = randomArrayIndex(sub_array),
				result = sub_array[i];

			return [array_root, result]
		}
	}
});
