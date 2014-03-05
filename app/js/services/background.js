
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
				author: randomImage.author,
				name: randomImageListObj.name,
				url: randomImageListObj.url,
				className: randomImageListObj.url.replace(/\.\w*/g, ''), // Remove the file extension
				source: randomImageListObj.source
			};

			return imageData;
		}
	};

	function randomArrayIndex(array) {
		return Math.floor(Math.random() * array.length);
	}

	return Background;
});

