
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
		event.target.appendChild(document.getElementById(data));
		
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
	document.getElementById("carBox1").ondragstart = whenDragged;
	document.getElementById("carBox2").ondragstart = whenDragged;
	document.getElementById("carBox3").ondragstart = whenDragged;
	document.getElementById("carPlaceDragDrop").ondragover = allowDrop;
	document.getElementById("carPlaceDragDrop").ondrop = whenDropped;
	
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