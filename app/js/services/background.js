
'use strict';

app.factory('Background', function($location) {
	var Background = {
		getFrom: function(json) {
			var background;

			// Check if a query string is set to determine the image to display,
			// otherwise get a random one.
			if (detectImageQuery()) {
				background = this.getFromQuery(json);
			} else {
				background = this.getRandom(json);
			}

			var image = background.image,
				imageList = background.imageList;

			var imageData = {
				className: imageList.className,
			};

			if (image.hasOwnProperty('author')) {
				imageData.author = image.author;
			}

			if (imageList.hasOwnProperty('name')) {
				imageData.name = imageList.name;
			}

			if (imageList.hasOwnProperty('source')) {
				imageData.source = imageList.source;
			}

			return imageData;
		},

		getRandom: function(json) {
			var backgroundArray = json.data.backgrounds,

			    i = randomArrayIndex(backgroundArray),
			    randomImage = backgroundArray[i],

			    j = randomArrayIndex(randomImage.imageList),
			    randomImageListObj = randomImage.imageList[j];

			return {
				image: randomImage,
				imageList: randomImageListObj
			};
		},

		getFromQuery: function(json) {
			var backgroundArray = json.data.backgrounds,
				query = $location.search(),
				queriedImage,
				queriedImageListObj;

			if (query.bg) {
				queriedImage = backgroundArray[query.bg];
			}

			if (query.bgSub) {
				queriedImageListObj = queriedImage.imageList[query.bgSub];
			} else {
				queriedImageListObj = queriedImage.imageList[0];
			}

			return {
				image: queriedImage,
				imageList: queriedImageListObj
			};
		}
	};

	function detectImageQuery() {
		var query = $location.search();

		if ((query.bg) || (query.bg && query.bgSub)) {
			return true;
		}
	}

	function randomArrayIndex(array) {
		return Math.floor(Math.random() * array.length);
	}

	return Background;
});

