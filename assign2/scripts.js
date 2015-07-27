var latField = document.getElementById("lat");
var lngField = document.getElementById("lng");

var locationInfo = function(position){
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	
	latField.value = latitude;
	lngField.value = longitude;
	getLocationButton.innerHTML = "Get Location";
	//getLocationButton.disabled = false;
}

var locationInfoError = function(error){
	var errorMessage =['',
	'Permission Denied',
	'Position Unavailable',
	'Timeout'
	];
	
	alert("Error Receiving Location: " + errorMessage[error.code]);
	//getLocationButton.disabled = false;
	getLocationButton.innerHTML = "Get Location";
}

getLocationButton.onclick = function(){
	getLocationButton.innerHTML = "Please Wait...";
	//getLocationButton.disabled = true;
	navigator.geolocation.getCurrentPosition(locationInfo, locationInfoError);
}