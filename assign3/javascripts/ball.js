var Ball = function(color){
	this.xCord = getRandomNumberWithBounds(100, canvas.rWidth - 100);
	this.yCord = getRandomNumberWithBounds(100, canvas.rHeight - 100);
	this.color = color;
	this.radius = (canvas.rWidth * 0.1) / 2;
	this.nextX;
	this.nextY;
	this.mouseX;
	this.dx = 0.01 * canvas.rWidth;
	this.dy = this.dx;
	
}
var drawScreen = function(){
	update();
	testWall();
	collide();
	collidePad();
	render();
}
var update = function(){
	var ball;
	for(var i = 0; i < balls.length; i++){
		ball = balls[i];
		ball.nextX = (ball.xCord += ball.dx);
		ball.nextY = (ball.yCord += ball.dy);
	}
}
var testWall = function(){
	var ball;
	for(var i = 0; i < balls.length; i++){
		ball = balls[i];
		if(ball.nextX + ball.radius > canvas.rWidth){
			ball.dx *= -1;
			ball.nextX = canvas.rWidth - ball.radius;
		}
		else if(ball.nextX - ball.radius < 0){
			ball.dx *= -1;
			ball.nextX = ball.radius;
			
		}
		else if(ball.nextY + ball.radius > canvas.rHeight){
			ball.dy *= -1;
			ball.nextY = canvas.rHeight - ball.radius;
		}
		else if(ball.nextY - ball.radius < 0){
			balls.splice(i,1);
		}
	}
}
var render = function(){
	var ball;
	for(var i = 0; i < balls.length; i++){
		ball = balls[i];
		ball.xCord = ball.nextX;
		ball.yCord = ball.nextY;
		ctx.beginPath();
		ctx.arc(ball.xCord, ball.yCord, ball.radius, 0, 2*Math.PI, true);
		ctx.fillStyle = ball.color;
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = '#000000';
		ctx.stroke();
	}
}
var hitTestCollision = function(ball1, ball2){
	var retval = false;
	var cx = ball1.nextX - ball2.nextX;
	var cy = ball1.nextY - ball2.nextY;
	var distance = (cx * cx + cy * cy);
	if(distance <= (ball1.radius + ball2.radius) * (ball1.radius + ball2.radius)){
		retval = true;
	}
	return retval;
}
var collide = function(){
	var ball;
	var testBall;
	
	for(var i = 0; i < balls.length; i++){
		ball = balls[i];
		for(var j = i+1; j < balls.length; j++){
			testBall = balls[j];
			if(hitTestCollision(ball, testBall)){
				collideBalls(ball, testBall);
			}
		}
	}
}