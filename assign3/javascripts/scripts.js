var canvas = document.getElementById("ballGameCanvas");
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

if (window.devicePixelRatio > 1) {
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    canvas.width = canvasWidth * window.devicePixelRatio;
    canvas.height = canvasHeight * window.devicePixelRatio;
    canvas.style.width = canvasWidth + "px";
    canvas.style.height = canvasHeight + "px";

    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}

var now, lastUpdate = new Date();
var fps = 0;
var drawFrame = function(){
	
	ctx.fillStyle = "#ff0000";
	ctx.fillRect( 0, 0, canvas.width, canvas.height );

	
	
	var timeDiff = (now = new Date) - lastUpdate;
	var thisFrameFPS = 1000 / timeDiff;
	if (now != lastUpdate){
    	fps += (thisFrameFPS - fps);
		lastUpdate = now;
  	}
  	
  	ctx.fillStyle = "#000000";
	ctx.font="30px Arial";
	ctx.fillText("Frame:" + thisFrameFPS,10,50);

	window.requestAnimationFrame(drawFrame);
}

window.requestAnimationFrame(drawFrame);