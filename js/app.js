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
		var image_object = getRandomBackground(data),
			quote_array = getRandomQuote(data),
			url_parameters = getUrlParameters();

		overrideBackgroundImage(url_parameters);
		overrideQuote(url_parameters);

		setBackgroundImage(image_object);

		generateQuoteMarkup(quote_array);
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

		// Adds the class coresponding to the file name of theimage (minus the extension)
		$(bg).addClass(image.url.replace(/\.[^/.]+$/, ""));
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
			decode = function(s) { return decodeURIComponent(s.replace(pl, " ")); },
			query  = window.location.search.substring(1),
			results = {};

		while (match = search.exec(query)) {
			results[decode(match[1])] = decode(match[2]);
		}

		return results;
	}

	/**
	 * @name overrideBackgroundImage
	 *
	 * Overrides the getRandomBackground function to display an image
	 * specified in the query string.
	 *
	 * @usage http://fireflies.voxeldavid.com?image=1 or ?image=bg-majestic-log.jpg
	 * @param {object} query_string  Object of current query string values.
	 */
	function overrideBackgroundImage(query_string) {
		var image;

		if (query_string.image)
			image = query_string.image;
		else
			return;

		// code
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
	function overrideQuote(query_string) {
		var quote;

		if (query_string.quote)
			quote = query_string.quote;
		else
			return;

		// code
	}
});
