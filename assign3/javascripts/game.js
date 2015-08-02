var canvas = document.getElementById("ballGameCanvas");
var ctx = canvas.getContext('2d');
var now, lastUpdate = new Date();
var fps = 0;
var mouseX = 0;
var mouseY = 0;
var gameStarted = false;
var ballsSpawned = false;

var ball1X = 0;
var ball1Y = 0;
var ball2X = 0;
var ball2Y = 0;
var ball3X = 0;
var ball3Y = 0;

var initializeBalls = function(){
		ctx.beginPath();
		ctx.arc(ball1X, ball1Y, (window.innerWidth * 0.1) / 2, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'red';
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = '#000000';
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc(ball2X, ball2Y, (window.innerWidth * 0.1) / 2, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'green';
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = '#000000';
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc(ball3X, ball3Y, (window.innerWidth * 0.1) / 2, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'blue';
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = '#000000';
		ctx.stroke();
}

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
var initializeCanvas = function(){
	ctx.fillStyle = "#ededed";
	ctx.clearRect( 0, 0, canvas.width, canvas.height );
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
}
var getRandomNumberWithBounds = function(min, max) {
  return Math.random() * (max - min) + min;
}

var getMousePos = function(canvas, event) {
    var rect = canvas.getBoundingClientRect();
        return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
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

var drawFrame = function(){
	updateCanvasSizeBasedOnWindow();
	initializeCanvas();
	
	if (gameStarted && !ballsSpawned){
		ball1X = getRandomNumberWithBounds(0.1, 0.9);
		ball1Y = getRandomNumberWithBounds(0.1, 0.9);
		ball2X = getRandomNumberWithBounds(0.1, 0.9);
		ball2Y = getRandomNumberWithBounds(0.1, 0.9);
		ball3X = getRandomNumberWithBounds(0.1, 0.9);
		ball3Y = getRandomNumberWithBounds(0.1, 0.9);
		//initializeBalls(ball1X, ball1Y, ball2X, ball2Y, ball3X, ball3Y);
		//var ballsSpawned = true;
	}
	
	if (ballsSpawned){
		initializeBalls(ball1X, ball1Y, ball2X, ball2Y, ball3X, ball3Y);
	}
	
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
		startGameMessage();
	}

	window.requestAnimationFrame(drawFrame);
}
var startGameMessage = function(){
		var launchRectWidth = 400;
		var launchRectHeight = 160;
		var windowStartX = window.innerWidth/2 - (launchRectWidth / 2);
		var windowStartY = window.innerHeight/2 - (launchRectHeight / 2);
		roundRect(windowStartX, windowStartY, launchRectWidth, launchRectHeight, 10, "#0a0a0a", 0.5);
		
		ctx.fillStyle = "#ffffff";
		ctx.font="22px Arial";
		ctx.fillText("Welcome to the Bouncing Ball Game", windowStartX + 20, windowStartY + 22);
		ctx.font="16px Arial";
		ctx.fillText("To begin the game click anywhere on the screen to ", windowStartX + 10, windowStartY + 60);
		ctx.fillText("spawn three balls at random locations. The balls will", windowStartX + 10, windowStartY + 60 + 16);
		ctx.fillText("move randomly in different directions. As the game", windowStartX + 10, windowStartY + 60 + 16*2);
		ctx.fillText("progresses the balls move faster and shrink.", windowStartX + 10, windowStartY +      60 + 16*3);
		ctx.fillText("So be prepared, have fun, and good luck!", windowStartX + 10, windowStartY +           60 + 16*5);
}

canvas.addEventListener('mousemove', function(event) {
        var mousePos = getMousePos(canvas, event);
        mouseX = mousePos.x;
        mouseY = mousePos.y;
}, false);

canvas.addEventListener('mouseup', function(event) {
        var mousePos = getMousePos(canvas, event);
        gameStarted = true;
}, false);

window.requestAnimationFrame(drawFrame);