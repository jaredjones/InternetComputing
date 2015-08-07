var wordLengthCounter = function(str) {
	if (str === undefined)
		return 0;
	var words = str.split(/\S+\s*/g);
	var currentWordLength;
	
	if (str.length == 0){
		currentWordLength = 0;
	}else{
		currentWordLength = words.length - 1;
	}
	return currentWordLength;
}

var initalizeWorkDescriptionWordLimiter = function() {
	var descBox = document.getElementById("work-desc");
	var wordCounter = document.getElementById("remaining-word-counter");
	var maxNumberOfWords = 300;
	
	wordCounter.innerHTML = "Remaining Words: " + maxNumberOfWords;
	
	var checkAndLimitLength = function(event){
		var wordLength = wordLengthCounter(this.value);
		if (wordLength > maxNumberOfWords){
			var finalString = this.value;
			var words = this.value.split(" ");
			words.splice(maxNumberOfWords, wordLength - maxNumberOfWords);
			
			descBox.value = words.join(" ");
			wordLength = maxNumberOfWords;
		}
		wordCounter.innerHTML = "Remaining Words: " + (maxNumberOfWords - wordLength);
	}
	
	descBox.addEventListener('keydown', checkAndLimitLength);
	descBox.addEventListener('keyup', checkAndLimitLength);
}

var getCreationDate = function() {
	var dateField = document.getElementById("creation-date");
	var dateInput = document.getElementById("date-c");
	var d = new Date();
	dateField.innerHTML = d;
	dateInput.value = d;
}

var locationInfo = function(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

	locationInfo.documentModifier.getElementById("lat").value = latitude;
	locationInfo.documentModifier.getElementById("lng").value = longitude;

	locationInfo.documentModifier.getElementById("lng-field").innerHTML = longitude;
	locationInfo.documentModifier.getElementById("lat-field").innerHTML = latitude;
}

var locationInfoError = function(error) {
	var errorMessage =['',
	'Permission Denied',
	'Position Unavailable',
	'Timeout'
	];

	locationInfo.documentModifier.getElementById("lng-field").innerHTML = errorMessage[error.code];
	locationInfo.documentModifier.getElementById("lat-field").innerHTML = errorMessage[error.code];
	return errorMessage[error.code];
}

var initalizeLocation = function(documentModifier, nav){
	locationInfo.documentModifier = documentModifier;
	locationInfoError.documentModifier = documentModifier;
	
	documentModifier.getElementById("lng-field").innerHTML = "(Grabbing Location)";
	documentModifier.getElementById("lat-field").innerHTML = "(Grabbing Location)";
	nav.geolocation.getCurrentPosition(locationInfo, locationInfoError);
}

var saveFormData = function(documentModifier) {
	var orderCount = localStorage.orderCount || 0;
	orderCount = parseInt(orderCount) + 1;
	
	var jsonObj = {
		"fullname": documentModifier.getElementById("fullname").value,
		"severity": documentModifier.getElementById("severity").value,
		"description": documentModifier.getElementById("work-desc").value,
		"creation_date": documentModifier.getElementById("creation-date").innerHTML,
		"latitude": documentModifier.getElementById("lat").value,
		"longitude": documentModifier.getElementById("lng").value	
	};
	localStorage.setItem('order' + orderCount, JSON.stringify(jsonObj));
	
	localStorage.orderCount = orderCount;
	return false;
}

var invokeIfConnected = function(callback) {
	var xhr = new XMLHttpRequest();
	var handler = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			callback();
		}
	}
	xhr.onreadystatechange = handler;
	xhr.open("GET", "http://jaredjones.co/?q=" + Math.random());
	xhr.send();
}