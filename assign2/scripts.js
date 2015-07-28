var latField = document.getElementById("lat-field");
var lngField = document.getElementById("lng-field");

var locationInfo = function(position){
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	lat.value = latitude;
	lng.value = longitude;
	latField.innerHTML = latitude;
	lngField.innerHTML = longitude;
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

var source;
var registerDragDrop = function(){
	var dragSource = document.getElementById('canDrag');
	dragSource.ondragstart = function(event){
		var dataToCopy = this.getAttribute('data-company');
		event.dataTransfer.setData('Text', dataToCopy);
		return true;
	};
	
	var dropTarget = document.getElementById('listMe');
	dropTarget.ondrop = function(event){
		this.value = event.dataTransfer.getData('Text');
		event.preventDefault();
		source.innerHTML = 'Text';
		return false;
	};
	
	dropTarget.ondragover = function(event){
		event.preventDefault();
		return false;
	};
	
	dropTarget.ondragend = function(event){
		event.preventDefault();
		return false;
	};
}
registerDragDrop();