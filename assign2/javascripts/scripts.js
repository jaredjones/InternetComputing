var locationInfo = function(position){
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	
	locationInfo.documentModifier.getElementById("lat").value = latitude;
	locationInfo.documentModifier.getElementById("lng").value = longitude;
	
	locationInfo.documentModifier.getElementById("lng-field").innerHTML = longitude;
	locationInfo.documentModifier.getElementById("lat-field").innerHTML = latitude;
	
	locationInfo.documentModifier.getElementById("getLocationButton").innerHTML = "Get Location";
}

var locationInfoError = function(error){
	var errorMessage =['',
	'Permission Denied',
	'Position Unavailable',
	'Timeout'
	];
	
	alert("Error Receiving Location: " + errorMessage[error.code]);
	
	locationInfo.documentModifier.getElementById("getLocationButton").innerHTML = "Get Location";
	return errorMessage;
}

var setupMouseEvents = function(documentModifier, nav){
	locationInfo.documentModifier = documentModifier;
	locationInfoError.documentModifier = documentModifier;

	var getLocationButton = documentModifier.getElementById("getLocationButton");

	getLocationButton.onclick = function(){
		getLocationButton.innerHTML = "Please Wait...";
		nav.geolocation.getCurrentPosition(locationInfo, locationInfoError);
	}
}

var registerDragDrop = function(documentModifier, carIDArray, dropElement){
	
	var whenDropped = function(event){
		event.preventDefault();
		
		var data = event.dataTransfer.getData("text");
		
		event.target.appendChild(documentModifier.getElementById(data));
		
		var carList = documentModifier.getElementById("carList");
		carList.value = carList.value + "," + documentModifier.getElementById(data).innerHTML.trim();
		if (carList.value.charAt(0) == ',')
			carList.value = carList.value.slice(1);
	}
	var whenDragged = function(event){
		event.dataTransfer.setData("text", event.target.id);
	}
	var allowDrop = function(event){
		event.preventDefault();
	}
	
	carIDArray.forEach(function(element){
		element.ondragstart = whenDragged;
	});

	dropElement.ondragover = allowDrop;
	dropElement.ondrop = whenDropped;
}
