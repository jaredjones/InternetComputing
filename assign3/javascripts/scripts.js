var canvas = document.getElementById("ballGameCanvas");
var ctx = canvas.getContext('2d');
var mouseX = 0;
var mouseY = 0;
var gameStarted = false;

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

var roundRect = function(x, y, width, height, radius, color, alpha) {
	ctx.globalAlpha=alpha;
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + width - radius, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	ctx.lineTo(x + width, y + height - radius);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	ctx.lineTo(x + radius, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
	ctx.lineTo(x, y + radius);
	ctx.quadraticCurveTo(x, y, x + radius, y);
	ctx.closePath();
	
	ctx.fill();
	ctx.globalAlpha=1.0;
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
	ctx.fillText("FPS:" + thisFrameFPS + " : MouseX:" + mouseX + " MouseY:" + mouseY, 10,window.innerHeight - 12);

	if (!gameStarted){
		var launchRectWidth = 400;
		var launchRectHeight = 160;
		var windowStartX = window.innerWidth/2 - (launchRectWidth / 2);
		var windowStartY = window.innerHeight/2 - (launchRectHeight / 2);
		roundRect(windowStartX, windowStartY, launchRectWidth, launchRectHeight, 10, "#0a0a0a", 0.5);
		
		ctx.fillStyle = "#ffffff";
		ctx.font="22px Arial";
		ctx.fillText("Welcome to the Bouncing Ball Game", windowStartX + 20, windowStartY + 22);
		ctx.font="16px Arial";
		ctx.fillText("To begin the game click anywhere on the screen to ", windowStartX + 10, windowStartY + 22 + 38);
		ctx.fillText("spawn three balls at that location. The balls will", windowStartX + 10, windowStartY + 22 + 38 + 16);
		ctx.fillText("move randomly in different directions. As the game", windowStartX + 10, windowStartY + 22 + 38 + 16*2);
		ctx.fillText("progresses the balls moves faster and shrink.", windowStartX + 10, windowStartY + 22 + 38 + 16*3);
		ctx.fillText("So be prepared, have fun, and good luck!", windowStartX + 10, windowStartY + 22 + 38 + 16*5);
		
	}

	window.requestAnimationFrame(drawFrame);
}

window.requestAnimationFrame(drawFrame);