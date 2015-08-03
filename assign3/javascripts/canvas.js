var canvas = document.getElementById("ballGameCanvas");
var ctx = canvas.getContext('2d');

var enableHiDPIDisplays = function(){
	canvas.width = 1000;
	canvas.height = 700;
	canvas.rWidth = canvas.width;
	canvas.rHeight = canvas.height;
	var canvasHeight = canvas.height;
	var canvasWidth = canvas.width;
	if (window.devicePixelRatio > 1) {
		
		canvas.width = canvasWidth * window.devicePixelRatio;
		canvas.height = canvasHeight * window.devicePixelRatio;
		canvas.style.width = canvasWidth + "px";
		canvas.style.height = canvasHeight + "px";
		
		ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
	}
}

var initializeCanvas = function(mouseX){
	ctx.fillStyle = "#ededed";
	ctx.clearRect( 0, 0, canvas.rWidth, canvas.rHeight );
	ctx.fillRect( 0, 0, canvas.rWidth, canvas.rHeight );

	ctx.strokeStyle = '#404040';
	ctx.lineWidth=10;
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(0, canvas.rHeight);
	ctx.lineTo(canvas.rWidth, canvas.rHeight);
	ctx.lineTo(canvas.rWidth, 0);
	ctx.stroke();
	
	var endBar = mouseX + (canvas.rWidth * 0.1);
	var startBar = mouseX;
	var size = endBar - startBar;
	startBar -= (size / 2);
	endBar -= (size / 2);
	
	ctx.beginPath();
	ctx.moveTo(startBar,0);
	ctx.lineTo(endBar,0);
	ctx.stroke();
	
	return size;
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
	var endGame = false;
	var fps = 0;
	var ball1, ball2, ball3;
	var now, lastUpdate = new Date();
	var mouseX = 0;
	var mouseY = 0;
	var size;
	
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
		
		size = initializeCanvas(mouseX);

		
		if (gameStarted && !ballsSpawned){
			ball1 = new Ball('red');
			ball2 = new Ball('blue');
			ball3 = new Ball('green');
			ballsSpawned = true;
		}
	
		if (ballsSpawned){
			ball1.drawBall(mouseX);
			ball2.drawBall(mouseX);
			ball3.drawBall(mouseX);
		}
	
		var newtime = getFPS(lastUpdate, now, fps);
		lastUpdate = newtime.theOldTime;
		fps = newtime.theFps;
		ctx.fillStyle = "#000000";
		ctx.font="12px Arial";
		ctx.fillText("FPS:" + newtime.displayFps + " : Size: " + size + " : MouseX:" + mouseX + " MouseY:" + mouseY, 10,canvas.rHeight - 12);

		if (!gameStarted){
			startGameMessage();
		}
		//if no more balls display end game message.
		/*if(endGame){
			endGameMessage();
		}*/
		
		window.requestAnimationFrame(drawUpdate);
	}
	
	window.requestAnimationFrame(drawUpdate);
}

var startGameMessage = function(){
		var launchRectWidth = 400;
		var launchRectHeight = 160;
		var windowStartX = canvas.rWidth/2 - (launchRectWidth / 2);
		var windowStartY = canvas.rHeight/2 - (launchRectHeight / 2);
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
enableHiDPIDisplays();
drawFrame();