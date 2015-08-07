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
		if(ball.nextY - ball.radius > 0 && ball.nextY - ball.radius <= 10 && ball.nextX >= pad.mouseX - (pad.size / 2) && ball.nextX <= pad.mouseX + (pad.size / 2) && ball.dy < 0){
				ball.dy *= -2;
				ball.hitCount += 1;
				ball.nextY = ball.radius;
				if(ball.hitCount % 10 == 0){
					ball.radius = ball.radius / 2;
				}
				ball[i] = ball;
			}
	}
}
