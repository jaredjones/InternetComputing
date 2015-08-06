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
	
	var olddx1 = ball1.dx;
	var olddy1 = ball1.dy;
	var olddx2 = ball2.dx;
	var olddy2 = ball2.dy;
	
	ball1.dx = Math.cos(collisionAngle) * final_velocityx_1 + Math.cos(collisionAngle + Math.PI/2) * final_velocityy_1;
	ball1.dy = Math.sin(collisionAngle) * final_velocityx_1 + Math.sin(collisionAngle + Math.PI/2) * final_velocityy_1;
	ball2.dx = Math.cos(collisionAngle) * final_velocityx_2 + Math.cos(collisionAngle + Math.PI/2) * final_velocityy_2;
	ball2.dy = Math.sin(collisionAngle) * final_velocityx_2 + Math.sin(collisionAngle + Math.PI/2) * final_velocityy_2;
	
		
	ball1.nextX = (ball1.nextX += ball1.dx);
	ball1.dx = changeSpeedToNormal(ball1.dx, olddx1);
	ball1.nextY = (ball1.nextY += ball1.dy);
	ball1.dy = changeSpeedToNormal(ball1.dy, olddy1)
	ball2.nextX = (ball2.nextX += ball2.dx);
	ball2.dx = changeSpeedToNormal(ball2.dx, olddx2);
	ball2.nextY = (ball2.yCord += ball2.dy);
	ball2.dy = changeSpeedToNormal(ball2.dy, olddy2)
}
var changeSpeedToNormal = function(c1, oldc1){
	if(c1 > 0 && oldc1 > 0 || c1 < 0 && oldc1 < 0){
		c1 = oldc1;
	}
	else{
		c1= -oldc1
	}
	return c1;
}
var endGameMessage = function(){
		var launchRectWidth = 400;
		var launchRectHeight = 160;
		var windowStartX = canvas.rWidth/2 - (launchRectWidth / 2);
		var windowStartY = canvas.rHeight/2 - (launchRectHeight / 2);
		roundRect(windowStartX, windowStartY, launchRectWidth, launchRectHeight, 10, "#0a0a0a", 0.5);
		
		ctx.fillStyle = "#ffffff";
		ctx.font="22px Arial";
		ctx.fillText("DEFEAT!", windowStartX + 20, windowStartY + 22);
		ctx.font="16px Arial";
		ctx.fillText("Refresh page to try again!", windowStartX + 10, windowStartY + 60);
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