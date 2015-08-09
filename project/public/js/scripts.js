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

var entryFinishedWithText = function(entryFinishedText) {
	document.getElementById("message-notifier").innerHTML = "<b>Message:</b> " + entryFinishedText + "</p>";
	document.getElementById("submit-btn").className = "yellow-button";
	document.getElementById("submit-btn").innerHTML = "Submit Another Work Order";
	document.getElementById("work-order-form").onsubmit = function() {
		location.reload();
		return false;
	}
}

var invokeIfConnected = function(callback, fromSubmit) {
	var xhr = new XMLHttpRequest();
	var handler = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			callback();
			if(fromSubmit)
				entryFinishedWithText("Your data was successfully submitted to the server!");
		}else{
			if(fromSubmit)
				entryFinishedWithText("You are offline, your work order was added to local storage!");
		}
	}
	xhr.onreadystatechange = handler;
	xhr.open("GET", "http://localhost:3000/?q=" + Math.random());
	xhr.send();
}

var sendData = function() {
	var orderCount = localStorage.orderCount || 0;
	orderCount = parseInt(orderCount);
	
	for (var orderCounter = 0; orderCounter <= localStorage.orderCount; orderCounter++) {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://localhost:3000', true);
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		
		xhr.send(localStorage.getItem('order' + orderCounter));
	}
	localStorage.clear();
}

var sendLocalStorageIfConnected = function(fromSubmit) {
	invokeIfConnected(sendData, fromSubmit);
}

var checkConnectionByTimer = function(time) {
	setInterval(sendLocalStorageIfConnected, time);
}

var isNumber = function(obj) { 
	return !isNaN(parseFloat(obj));
}

var checkIfFormsFilledIn = function(documentModifier) {
	var msgBox = document.getElementById("message-notifier");
	var isLatValid = isNumber(documentModifier.getElementById("lat").value);
	var isLngValid = isNumber(documentModifier.getElementById("lng").value);
	if (!(isLatValid && isLngValid)){
		msgBox.innerHTML = "<b>Message:</b> You must have a valid latitude/longitude in order to submit this work order.</p>";
		return false;
	}
	return true;
}

var saveFormData = function(documentModifier) {
	if (!checkIfFormsFilledIn(documentModifier))
		return false;
		
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
	
	sendLocalStorageIfConnected(true);
	return false;
}
