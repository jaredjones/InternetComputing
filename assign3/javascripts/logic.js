var getFPS = function(lastUpdate, now, fps){
	this.lastUpdate = lastUpdate;
	this.now = now;
	this.fps = fps;
	var timeDiff = this.now - this.lastUpdate;
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

var getRandomNumberWithBounds = function(min, max){
  return Math.random() * (max - min) + min;
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
