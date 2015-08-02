var canvas = document.getElementById("ballGameCanvas");
var ctx = canvas.getContext('2d');

var Ball = function(color){
	this.xCord = getRandomNumberWithBounds(100, window.innerWidth - 100);
	this.yCord = getRandomNumberWithBounds(100, window.innerHeight - 100);
	this.color = color;
	this.drawBall = function(){
		ctx.beginPath();
		ctx.arc(this.xCord, this.yCord, (window.innerWidth * 0.1) / 2, 0, 2 * Math.PI, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = '#000000';
		ctx.stroke();
	}
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
var initializeCanvas = function(mouseX){
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

var getFPS = function(lastUpdate, now, fps){
	this.lastUpdate = lastUpdate;
	this.now = now;
	this.fps = fps;
	var timeDiff = (this.now = new Date) - this.lastUpdate;
	var thisFrameFPS = 1000 / timeDiff;
	if(this.now != this.lastUpdate){
		this.fps += (thisFrameFPS - this.fps);
		this.lastUpdate = this.now;
	}
	return {
		displayFps: thisFrameFPS,
		theOldTime: this.lastUpdate,
		theFps: this.fps
		};		
}

var drawFrame = function(){
	var gameStarted = false;
	var ballsSpawned = false;
	var fps = 0;
	var ball1, ball2, ball3;
	var now, lastUpdate = new Date();
	var mouseX = 0;
	var mouseY = 0;
	
	var drawUpdate = function(){
		
		canvas.addEventListener('mouseup', function(event) {
			var mousePos = getMousePos(canvas, event);
			gameStarted = true;
		}, false);
		
		canvas.addEventListener('mousemove', function(event) {
        	var mousePos = getMousePos(canvas, event);
			mouseX = mousePos.x;
			mouseY = mousePos.y;
		}, false);
		
		updateCanvasSizeBasedOnWindow();
		initializeCanvas(mouseX);
		
		if (gameStarted && !ballsSpawned){
			ball1 = new Ball('red');
			ball2 = new Ball('blue');
			ball3 = new Ball('green');
			ballsSpawned = true;
		}
	
		if (ballsSpawned){
			ball1.drawBall();
			ball2.drawBall();
			ball3.drawBall();
		}
	
		var newtime = getFPS(lastUpdate, now, fps);
		lastUpdate = newtime.theOldTime;
		fps = newtime.theFps;
		ctx.fillStyle = "#000000";
		ctx.font="12px Arial";
		ctx.fillText("FPS:" + newtime.displayFps + " : MouseX:" + mouseX + " MouseY:" + mouseY, 10,window.innerHeight - 12);

		if (!gameStarted){
			startGameMessage();
		}
		
		window.requestAnimationFrame(drawUpdate);
	}
	
	window.requestAnimationFrame(drawUpdate);
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
drawFrame();