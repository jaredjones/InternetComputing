var canvas = document.getElementById("ballGameCanvas");
var ctx = canvas.getContext('2d');

var initializeCanvas = function(mouseX){
	ctx.fillStyle = "#ededed";
	ctx.clearRect( 0, 0, canvas.width, canvas.height );
	ctx.fillRect( 0, 0, canvas.width, canvas.height );

	ctx.strokeStyle = '#404040';
	ctx.lineWidth=15;
	ctx.beginPath();
	ctx.moveTo(0,0);
	
	
	var endBar = mouseX + (canvas.width * 0.1);
	var startBar = mouseX;
	var size = endBar - startBar;
	startBar -= (size / 2);
	endBar -= (size / 2);
	
	ctx.beginPath();
	ctx.moveTo(startBar,0);
	ctx.lineTo(endBar,0);
	ctx.stroke();
	
	
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
	var gameStarted = false;
	var ballsSpawned = false;
	var padUp = false;
	var fps = 0;
	var ball1, ball2, ball3;
	var now, lastUpdate = new Date();
	var mouseX = 0;
	var mouseY = 0;
	var pad;
	
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
		ctx.fillText("FPS:" + newtime.displayFps + " : MouseX:" + mouseX + " MouseY:" + mouseY, 10,canvas.height - 12);

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
		var windowStartX = canvas.width/2 - (launchRectWidth / 2);
		var windowStartY = canvas.height/2 - (launchRectHeight / 2);
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