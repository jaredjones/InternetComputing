var canvas = document.getElementById("ballGameCanvas");
var ctx = canvas.getContext('2d');
var balls = [];
var pad;
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
	if (mouseX < ((canvas.rWidth * 0.1) / 2))
	{
		startBar = 0;
		endBar = (canvas.rWidth * 0.1) * 2;
	}
	
	if (mouseX > (canvas.rWidth - (canvas.rWidth * 0.1) / 2) - 5)
	{
		startBar = (canvas.rWidth - ((canvas.rWidth * 0.1) / 2));
		endBar = (canvas.rWidth) + (canvas.rWidth * 0.20)/ 2;
	}
	
	var size = endBar - startBar;
	startBar -= (size / 2);
	endBar -= (size / 2);
	
	ctx.beginPath();
	ctx.moveTo(startBar,0);
	ctx.lineTo(endBar,0);
	ctx.stroke();
	
	return {
		theEnd: endBar,
		theStart: startBar,
		theSize: size,
		theMouseX: mouseX,
		theWidth: 10
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
	var gameStarted = false;
	var ballsSpawned = false;
	var endGame = false;
	var fps = 0;
	var ball1, ball2, ball3;
	var now, lastUpdate = new Date();
	var mouseX = 0;
	var mouseY = 0;
	var initPad;
	
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
		
		initPad = initializeCanvas(mouseX);
		pad = new Pad(initPad.theStart, initPad.theEnd, initPad.theSize, initPad.theMouseX, initPad.theWidth, canvas.rWidth, 0);
		

		
		if(gameStarted && !ballsSpawned){
			show();
			startTheClock();
			ball1 = new Ball('red');
			balls.push(ball1);
			ball2 = new Ball('blue');
			balls.push(ball2);
			ball3 = new Ball('green');
			balls.push(ball3);
			ballsSpawned = true;
		}
	
		if(ballsSpawned){
			drawScreen();
			if(balls.length == 0){
				endGame = true;
			}		
		}

		if (!gameStarted){
			startGameMessage();
			
		}
		if(endGame){
			stop();
			endGameMessage();
		}
		
		window.requestAnimationFrame(drawUpdate);
	}
	
	window.requestAnimationFrame(drawUpdate);
}
enableHiDPIDisplays();
drawFrame();