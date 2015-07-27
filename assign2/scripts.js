var latField = document.getElementById("lat");
var lngField = document.getElementById("lng");

var locationInfo = function(position){
	alert("Getting your position now.");
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	
	latField.value = latitude;
	lngField.value = longitude;
}

var locationInfoError = function(error){
	var errorMessage =['',
	'Permission Denied',
	'Position Unavailable',
	'Timeout'
	];
	alert("Error Receiving Location: " + errorMessage[error.code]);
}

getLocationButton.onclick = function(){
	navigator.geolocation.getCurrentPosition(locationInfo, locationInfoError);
}