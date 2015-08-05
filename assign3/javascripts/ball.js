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
			//ball.dy *= -1;
			//ball.nextY = ball.radius;
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
var collideBalls = function(ball1, ball2){
	var cx = ball1.nextX - ball2.nextX;
	var cy = ball1.nextY - ball2.nextY;
	var collisionAngle = Math.atan2(cy, cx);
	var speed1 = Math.sqrt(ball1.dx * ball1.dx + ball1.dy * ball1.dy);
	var speed2 = Math.sqrt(ball2.dx * ball2.dx + ball2.dy * ball2.dy);
	var direction1 = Math.atan2(ball1.dy, ball1.dx);
	var direction2 = Math.atan2(ball2.dy, ball2.dx);
	var velocityx_1 = speed1 * Math.cos(direction1 - collisionAngle);
	var velocityy_1 = speed1 * Math.sin(direction1 - collisionAngle);
	var velocityx_2 = speed2 * Math.cos(direction2 - collisionAngle);
	var velocityy_2 = speed2 * Math.sin(direction2 - collisionAngle);
	
	var final_velocityx_1 = ((ball1.radius - ball2.radius) * velocityx_1 + (ball2.radius + ball2.radius) * velocityx_2) / (ball1.radius + ball2.radius);
	var final_velocityx_2 = ((ball1.radius + ball1.radius) * velocityx_1 + (ball2.radius - ball1.radius) * velocityx_2) / (ball1.radius + ball2.radius);	
	var final_velocityy_1 = velocityy_1;
	var final_velocityy_2 = velocityy_2;
	
	ball1.dx = Math.cos(collisionAngle) * final_velocityx_1 + Math.cos(collisionAngle + Math.PI/2) * final_velocityy_1;
	ball1.dy = Math.sin(collisionAngle) * final_velocityx_1 + Math.sin(collisionAngle + Math.PI/2) * final_velocityy_1;
	ball2.dx = Math.cos(collisionAngle) * final_velocityx_2 + Math.cos(collisionAngle + Math.PI/2) * final_velocityy_2;
	ball2.dy = Math.sin(collisionAngle) * final_velocityx_2 + Math.sin(collisionAngle + Math.PI/2) * final_velocityy_2;
	
	ball1.nextX = (ball1.nextX += ball1.dx);
	ball1.nextY = (ball1.nextY += ball1.dy);
	ball2.nextX = (ball2.nextX += ball2.dx);
	ball2.nextY = (ball2.yCord += ball2.dy);
}
			
			
			
		
