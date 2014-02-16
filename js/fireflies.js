/* Copyright (c) 2014 David Minnerly - Licensed under the MIT License. */

(function($) {
	$.Fireflies = function(options) {
		options = $.extend({
			background_hook: '#js-bg',
			quote_hook: '#js-quote'
		}, options);

		$.getJSON('js/data.json', function(data) {
			var image_data = extractArrayData(data, 'backgrounds'),
				quote_data = extractArrayData(data, 'quotes'),
				url_parameters = getUrlParameters();

			Background.setImage(image_data.chosen_object.url);
			Quote.createMarkup(quote_data);

			Background.queryOverride(data, url_parameters);
			Quote.queryOverride(data, url_parameters);
		});

		var Background = {
			/**
			 * Applies the randomly chosen background image to the body.
			 *
			 * @param {Array} image_array  The array containing the background image objects.
			 */
			setImage: function(image_url) {
				var bg = options.background_hook;

				// Adds the class corresponding to the file name of the image (minus the extension)
				$(bg).addClass(image_url.replace(/\.[^/.]+$/, ''));
			},

			/**
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
			 * @param {Object} json         The json data retrieved by jQuery's getJSON function.
			 * @param {Object} query_string Object of current query string values.
			 */
			queryOverride: function(data, query_string) {
				var bg_id = options.background_hook,
					keywords = ['bg', 'bg_sub'],
					bg = query_string[keywords[0]],
					bg_sub = query_string[keywords[1]];

				// Using numbers to navigate the arrays.
				// fireflies.voxeldavid.com?bg=3&bg_sub=1
				if (bg && bg_sub) {
					var queried_image = data.backgrounds[bg].image_list[bg_sub];
					setQueriedImage(queried_image.url);

				// Using a single string to navigate the array.
				// fireflies.voxeldavid.com?bg=majestic-log.jpg
				} else if (bg && !bg_sub) {

				}

				function setQueriedImage(image) {
					// http://stackoverflow.com/a/2644364
					$(bg_id).attr('class', function(undefined, attr_class) {
						return attr_class.replace(/\bbg-\S+/g);
					});
					// Search through the 'backgrounds' and 'image_list' arrays to
					// find the one containing the value of bg.

					Background.setImage(image);
				}
			}
		};

		var Quote = {
			/**
			 * Creates the quote's markup.
			 *
			 * @param {Array} quote_array The array containing the randomly chosen quote objects.
			 */
			createMarkup: function(quote_array) {
				var quote_id = options.quote_hook,
					quote_root = quote_array.root,
					chosen_quote = quote_array.chosen_object;

				// This function is far too big and doing far too much at once.
				// I need to abstract it into smaller functions. That should take
				// care of a lot of the mess.

				$('<p>')
					.appendTo(quote_id)
					.html(chosen_quote.text);

				$('<cite>')
					.appendTo(quote_id);

				// Create the citation and optional link for the author
				// of the quote.

				if (chosen_quote.source) {
					$('<a>')
						.appendTo(quote_id + ' cite')
						.attr('target', '_blank')
						.attr('href', chosen_quote.source)
						.addClass('underline');
						// The html for the link is set farther down.

					// Used with the 'underline' class.
					$('<span>')
						.appendTo(quote_id + ' cite a');

					if (quote_root.title) {
						$(quote_id + ' cite a')
							.attr('title', quote_root.title);
					}
				}

				// This mess needs to get redone, though I can't think of how to do it.
				if (quote_root.author && chosen_quote.source) {
					$(quote_id + ' cite a').prepend(quote_root.author);
				} else if (quote_root.author) {
					$(quote_id + ' cite').prepend(quote_root.author);
				} else if (chosen_quote.source) {
					$(quote_id + ' cite a').prepend('Unknown');
				} else {
					$(quote_id + ' cite').prepend('Unknown');
				}
			},

			/**
			 * Overrides the getRandomQuote function to display a quote
			 * specified in the query string.
			 *
			 * @usage http://fireflies.voxeldavid.com?quote=1
			 * @param {object} query_string  Object of current query string values.
			 */
			queryOverride: function(json_data, query_string) {
				var quote_id = options.quote_hook,
					keywords = ['quote', 'quote_sub'],
					quote = query_string[keywords[0]],
					quote_sub = query_string[keywords[1]];

				// Setting up the background image override was fairly straightforward,
				// but this function needs to make use of the generateQuoteMarkup function.
				//
				// This should be interesting.
			}
		};

		/**
		 * Generates an integer value from 0 to the array parameter's length.
		 *
		 * @param  {array} array  Array to index.
		 * @return {number}       A random number between 0 to the array's length.
		 */
		function randomArrayIndex(array) {
			return Math.floor(Math.random() * array.length);
		}

		/**
		 * Converts the query string in the browser URL into an object
		 * for other functions to hook into.
		 *
		 * @return {object} The query string converted into an object.
		 */
		function getUrlParameters() {
			// source: http://stackoverflow.com/a/2880929
			// Slightly modified.

			var match,
				pl      = /\+/g, // Regex for replacing addition symbol with a space
				search  = /([^&=]+)=?([^&]*)/g,
				decode  = function(s) { return decodeURIComponent(s.replace(pl, ' ')); },
				query   = window.location.search.substring(1),
				results = {};

			while (match = search.exec(query))
				results[decode(match[1])] = decode(match[2]);

			return results;
		}

		/**
		 * This function takes care of picking random arrays from the json file
		 * loaded by jQuery's getJSON function.
		 *
		 * Example: var image_array = extractArrayData(date, 'backgrounds');
		 *
		 * In this case the 'backgrounds' string was passed as the array, so when the
		 * function first initializes its variables it sets 'data' one level deeper as
		 * the 'backgrounds' array.
		 *
		 * @param  {object} data  The json data retrieved by jQuery's getJSON function.
		 * @param  {string} array The array to look through in 'data', as a string.
		 * @return {array}        The 'root' of the chosen image/quote and its list array.
		 */
		function extractArrayData(json, array_name) {
			var prime_array = json[array_name], // This being the 'backgrounds' or 'quotes' array.
				prime_object = getRandomObject(prime_array),
				list_array = getListArray(prime_object),
				chosen_object = getRandomObject(list_array);

			function getRandomObject(array) {
				var index = randomArrayIndex(array),
					result = array[index];
				return result;
			}

			// Finds a key with the word "list" in it's name.
			function getListArray(object_to_search) {
				var regex = /\*list/,
					list_array;

				for (regex in object_to_search)
					list_array = object_to_search[regex];

				return list_array;
			}

			return {
				'root': prime_array,
				'prime_object': prime_object,
				'list_array': list_array,
				'chosen_object': chosen_object
			};
		}
	};
})(jQuery);
