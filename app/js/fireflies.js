/* Copyright (c) 2014 David Minnerly - Licensed under the MIT License. */

(function($) {
	$.Fireflies = function(options) {
		options = $.extend({
			background_hook: '#js-bg',
			quote_hook: '#js-quote',
			url_background_override: true,
			url_quote_override: true
		}, options);

		$.getJSON('js/data.json', function(data) {
			var image_data = extractArrayData(data, 'backgrounds'),
				quote_data = extractArrayData(data, 'quotes'),
				url_parameters = getUrlParameters();

			if (options.url_background_override)
				Background.queryOverride(data, url_parameters);

			if (options.url_quote_override)
				Quote.queryOverride(data, url_parameters);

			if (!Background.query_override)
				Background.setImage(image_data.chosen_object.url);

			if (!Quote.query_override)
				Quote.createMarkup(quote_data);
		});

		var Background = {
			query_override: false,

			/**
			 * Applies the randomly chosen background image to the body.
			 *
			 * @param {String} image_url  A string value containing the file name of the image to load.
			 */
			setImage: function(image_url) {
				var bg = options.background_hook;

				// Adds the class corresponding to the file name of
				// the image (minus the extension)
				$(bg).addClass(image_url.replace(/\.[^/.]+$/, ''));
			},

			/**
			 * This method is used to override the main function from applying a random
			 * background image.
			 *
			 *   // First object in 'backgrounds', defaults to first object in the
			 *   // 'image_list' array.
			 *   fireflies.voxeldavid.com/?bg=0
			 *
			 * If the 'image_list' array inside the quote object has more than one
			 * object, you can use the 'bg_sub' variable to iterate over it.
			 *
			 *   // First object in 'backgrounds', second object in 'image_list' array.
			 *   fireflies.voxeldavid.com/?bg=0&bg_sub=1
			 *
			 * @param {Object} data         The json data retrieved by jQuery's getJSON function.
			 * @param {Object} query_string Contains the query string extracted with getUrlParameters().
			 */
			queryOverride: function(data, query_string) {
				var keywords = ['bg', 'bg_sub'],
					bg = query_string[keywords[0]],
					bg_sub = query_string[keywords[1]],
					queried_image;

				// Using numbers to navigate the arrays.
				// fireflies.voxeldavid.com?bg=3&bg_sub=1
				if (!isNaN(bg)) { // is a number
					this.query_override = true;
					queried_image = data.backgrounds[bg];

					// If 'bg_sub' is specified in the url use it to move through the
					// image_list array, otherwise just set the index to the first element.
					if (bg_sub)
						queried_image = queried_image.image_list[bg_sub];
					else
						queried_image = queried_image.image_list[0];

					this.setImage(queried_image.url);

				// Using a single string to navigate the array.
				// fireflies.voxeldavid.com?bg=bg-majestic-log.jpg
				} else if (bg) {
					this.query_override = true;
					queried_image = getObjects(data.backgrounds, 'url', bg);

					this.setImage(queried_image[0].url);
				}
			}
		};

		var Quote = {
			query_override: false,

			display: function(quote_root, chosen_quote) {
				var quote_id = options.quote_hook;

				console.log(quote_root);
				console.log(chosen_quote);

				// display the quote
			},

			/**
			 * Generates the quote's markup.
			 *
			 * @param {Array} quote_array The array containing the randomly chosen quote objects.
			 */
			createMarkup: function(quote_array) {
				var quote_id = options.quote_hook,
					quote_root = quote_array.prime_object,
					chosen_quote = quote_array.chosen_object;

				var p = $('<p>')
					.appendTo(quote_id)
					.html(chosen_quote.text),

					cite = $('<cite>')
					.appendTo(quote_id);

				if (chosen_quote.source) {
					var link = $('<a>')
							.appendTo(cite)
							.prop('target', '_blank')
							.prop('href', chosen_quote.source)
							.addClass('underline'),

						underline = $('<span>')
							.appendTo(link);

					if (quote_root.title) {
						link.prop('title', quote_root.title);
					}
				}

				// This mess needs to get redone, though I can't think of how to do it.
				if (quote_root.author && chosen_quote.source)
					$(quote_id + ' cite a').prepend(quote_root.author);
				else if (quote_root.author)
					$(quote_id + ' cite').prepend(quote_root.author);
				else if (chosen_quote.source)
					$(quote_id + ' cite a').prepend('Unknown');
				else
					$(quote_id + ' cite').prepend('Unknown');
			},

			/**
			 * This method is used to override the main function from applying a random quote.
			 *
			 *   // First object in 'quotes', defaults to first object in 'quote_list' array.
			 *   fireflies.voxeldavid.com/?quote=0
			 *
			 * If the 'quote_list' array inside the quote object has more than one
			 * object, you can use the 'quote_sub' variable to iterate over it.
			 *
			 *   // First object in 'quotes', second object in 'quote_list' array.
			 *   fireflies.voxeldavid.com/?quote=0&quote_sub=1
			 *
			 * @param {Object} data         The json data retrieved by jQuery's getJSON function.
			 * @param {Object} query_string Contains the query string extracted with getUrlParameters().
			 */
			queryOverride: function(data, query_string) {
				var keywords = ['quote', 'quote_sub'],
					quote = query_string[keywords[0]],
					quote_sub = query_string[keywords[1]],

					queried_quote = data.quotes[quote],
					list_array;

				if (quote) {
					this.query_override = true;

					// If 'quote_sub' is specified in the url use it to move through the
					// image_list array, otherwise just set the index to the first element.
					if (quote_sub)
						list_array = queried_quote.quote_list[quote_sub];
					else
						list_array = queried_quote.quote_list[0];

					this.display(queried_quote, list_array);
				}
			}
		};

		// Used primarily to find images by value in the Background.queryOverride method.
		// https://gist.github.com/iwek/3924925#file-find-in-json-js
		function getObjects(obj, key, val) {
			var objects = [];
			for (var i in obj) {
				if (obj.hasOwnProperty(i)) {
					if (typeof obj[i] == 'object') {
						objects = objects.concat(getObjects(obj[i], key, val));
					} else if (i == key && obj[i] == val || i == key && val === '') {
						// if key matches and value matches or if key matches and value is not passed
						// (eliminating the case where key matches but passed value does not)
						objects.push(obj);
					} else if (obj[i] == val && key === '') {
						//only add if the object is not already in the array
						if (objects.lastIndexOf(obj) == -1) {
							objects.push(obj);
						}
					}
				}
			}
			return objects;
		}


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

				for (regex in object_to_search) {
					if (object_to_search[regex]) {
						list_array = object_to_search[regex];
					}
				}

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