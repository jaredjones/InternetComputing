var canvas = document.getElementById("ballGameCanvas");
var ctx = canvas.getContext('2d');
var mouseX = 0;
var mouseY = 0;


var updateCanvasSizeBasedOnWindow = function()
{
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
}

var getMousePos = function(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
        return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

canvas.addEventListener('mousemove', function(event) {
        var mousePos = getMousePos(canvas, event);
        mouseX = mousePos.x;
        mouseY = mousePos.y;
}, false);

var now, lastUpdate = new Date();
var fps = 0;
var drawFrame = function(){
	updateCanvasSizeBasedOnWindow();
	
	ctx.fillStyle = "#ededed";
	ctx.fillRect( 0, 0, canvas.width, canvas.height );

	ctx.strokeStyle = '#404040';
	ctx.lineWidth=15;
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(0,window.innerHeight);
	ctx.lineTo(window.innerWidth, window.innerHeight);
	ctx.lineTo(window.innerWidth, 0);
	ctx.stroke();
	
	var endBar = mouseX + (window.innerWidth * 0.1);
	var startBar = mouseX;
	var size = endBar - startBar;
	startBar -= (size / 2);
	endBar -= (size / 2);

	ctx.beginPath();
	ctx.moveTo(startBar,0);
	ctx.lineTo(endBar,0);
	ctx.stroke();
	
	var timeDiff = (now = new Date) - lastUpdate;
	var thisFrameFPS = 1000 / timeDiff;
	if (now != lastUpdate){
    	fps += (thisFrameFPS - fps);
		lastUpdate = now;
  	}
  	
  	ctx.fillStyle = "#000000";
	ctx.font="12px Arial";
	ctx.fillText("Frame:" + thisFrameFPS + " : MouseX:" + mouseX + " MouseY:" + mouseY,10,50);

	window.requestAnimationFrame(drawFrame);
}

window.requestAnimationFrame(drawFrame);