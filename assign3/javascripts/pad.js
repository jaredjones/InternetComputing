var Pad = function(start, end, size, mouseX, padWidth){
	this.start = start;
	this.end = end;
	this.size = size;
	this.mouseX = mouseX;
	this.padWidth = padWidth;
}
var collidePad = function(){
	var ball;
	for(var i = 0; i < balls.length; i++){
		ball = balls[i];
		if(ball.nextY - ball.radius > 0 && ball.nextY - ball.radius <= 20 && ball.nextX >= pad.mouseX - (pad.size / 2) && ball.nextX <= pad.mouseX + (pad.size / 2) && ball.dy < 0){
				ball.dy *= -1;
				ball.nextY = ball.radius;
				ball[i] = ball;
			}
	}
}
