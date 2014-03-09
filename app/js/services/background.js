
'use strict';

app.factory('Background', function() {
	var Background = {
		getFrom: function(json) {
			var background = this.getRandom(json),
				image = background.image,
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

			    j = randomArrayIndex(randomImage.image_list),
			    randomImageListObj = randomImage.image_list[j];

			return {
				image: randomImage,
				imageList: randomImageListObj
			};
		}
	};

	function randomArrayIndex(array) {
		return Math.floor(Math.random() * array.length);
	}

	return Background;
});

