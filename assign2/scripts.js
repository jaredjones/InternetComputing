
var locationInfo = function(position){
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	lat.value = latitude;
	lng.value = longitude;
	
	document.getElementById("lng-field").innerHTML = longitude;
	document.getElementById("lat-field").innerHTML = latitude;
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
		var data = event.dataTransfer.getData("text");
		var nodeCopy = document.getElementById(data).cloneNode(true);
		nodeCopy.id = "newId";
		event.target.appendChild(nodeCopy);
		
		carList.value = carList.value + "," + document.getElementById(data).innerHTML.trim();
		if (carList.value.charAt(0) == ',')
			carList.value = carList.value.slice(1);
	}
	var whenDragged = function(event){
		event.dataTransfer.setData("text", event.target.id);
	}
	var allowDrop = function(event){
		event.preventDefault();
		
	}
	var whenDroppedOther = function(event, id){
		event.preventDefault();
		var id = event.dataTransfer.getData("text/html");
		var elem = document.getElementById(id);
		//event.target.appendChild(document.getElementById(data));
		//var index = carList.indexOf(elem);
		elem.parentNode.removeChild(elem);
		//if(index > -1){
			//carList.splice(index, 1);
		//}
	}
	var whenDraggedOther = function(event){
		event.dataTransfer.setData("text/html", event.target.id);
	}
	var allowDropOther = function(event){
		event.preventDefault();
	}
	document.getElementById("carBox1").ondragstart = whenDragged;
	document.getElementById("carBox2").ondragstart = whenDragged;
	document.getElementById("carBox3").ondragstart = whenDragged;
	document.getElementById("carPlaceDragDrop").ondragover = allowDrop;
	document.getElementById("carPlaceDragDrop").ondrop = whenDropped;
	document.getElementById("carPlaceDragDrop").ondragstart = whenDraggedOther;
	document.getElementById("carListDragDrop").ondragover = allowDropOther;
	document.getElementById("carListDragDrop").ondragover = whenDroppedOther;	
}
registerDragDrop();