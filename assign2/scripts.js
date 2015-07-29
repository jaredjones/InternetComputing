
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

var registerDragDrop = function(){
	var whenDropped = function(event){
		event.preventDefault();
	}
	var whenDragged = function(event){
		console.log("?");
		alert('fuck ya');
		event.dataTransfer.setData("text", ev.target.id);
	}
	var whenDropped = function(event){
		event.preventDefault();
		
	}
	carBox.ondragstart = whenDragged;
	carPlaceDragDrop.ondrop = whenDropped;
	
}

registerDragDrop();

//var idList = ["canDrag","canDrag1", "canDrag2"];
//var elem;
/*var registerDragDrop = function(){
	//var dragSource;
	
	/*dragSource.ondragstart = function(event){
		event.dataTransfer.setData('Text', event.target.id);
		elem = event.target;
		return true;
	};
	
	var dropTarget = document.getElementById('listBlock');
	dropTarget.ondrop = function(event){
		this.value = event.dataTransfer.getData('Text');
		//event.addElement(elem);
		//event.target.copy(elem);
		event.preventDefault();
		//source.innerHTML = event.target.innerHTML;
		//event.target.innerHTML = event.dataTransfer.getData('Text');
		return false;
	};
	
	dropTarget.ondragover = function(event){
		event.preventDefault();
		return false;
	};
	
	dropTarget.ondragend = function(event){
		event.preventDefault();
		return false;
	};*/
//}