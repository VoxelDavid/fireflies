
'use strict';

app.factory('Background', function() {
	var Background = {
		getRandom: function(json) {
			var backgroundArray = json.data.backgrounds,

			    i = randomArrayIndex(backgroundArray),
			    randomImage = backgroundArray[i],

			    j = randomArrayIndex(randomImage.image_list),
			    randomImageListObj = randomImage.image_list[j];

			var imageData = {
				className: randomImageListObj.className,
			};

			if (randomImage.hasOwnProperty('author')) {
				imageData.author = randomImage.author;
			}

			if (randomImageListObj.hasOwnProperty('name')) {
				imageData.name = randomImageListObj.name;
			}

			if (randomImageListObj.hasOwnProperty('source')) {
				imageData.source = randomImageListObj.source;
			}

			return imageData;
		}
	};

	function randomArrayIndex(array) {
		return Math.floor(Math.random() * array.length);
	}

	return Background;
});

