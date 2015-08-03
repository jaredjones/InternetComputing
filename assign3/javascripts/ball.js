var Ball = function(color){
	this.xCord = getRandomNumberWithBounds(100, canvas.rWidth - 100);
	this.yCord = getRandomNumberWithBounds(100, canvas.rHeight - 100);
	this.color = color;
	this.radius = (canvas.rWidth * 0.1) / 2;
	this.prevX;
	this.prevY;
	this.mouseX;
	//this.speed = 0.1 * canvas.rWidth;
	this.dx = 0.01 * canvas.rWidth;
	this.dy = this.dx;
	
	this.drawBall = function(mouseX){
		this.mouseX = mouseX;
		this.moveBall();
		ctx.beginPath();
		ctx.arc(this.xCord, this.yCord, this.radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = '#000000';
		ctx.stroke();
	}
	
	this.moveBall = function(){		
		if(this.xCord - this.radius < 0){
			this.dx *= -1;
		}
		if(this.xCord + this.radius > canvas.rWidth){
			this.dx *= -1;
		}
		if(this.yCord - this.radius < 0){
			this.dy *= -1;
		}
		if(this.yCord + this.radius > canvas.rHeight){
			this.dy *= -1;
		}
		this.xCord += this.dx;
		this.yCord += this.dy;		
	}
}
var detectCollision = function(ball1, ball2){
		if(ball1.xCord + ball1.radius + ball2.radius > ball2.xCord && ball1.xCord < ball2.xCord + ball1.radius && ball1.yCord + ball1.radius + ball2.radius > ball2.yCord && ball1.yCord < ball2.yCord + ball1.radius + ball2.radius){
				
			var distance = Math.sqrt((ball1.xCord - ball2.xCord) * (ball1.xCord - ball2.xCord) + ((ball1.yCord - ball2.yCord) * (ball1.yCord - ball2.yCord)));
			if(distance < ball1.radius + ball2.radius){
				var collisionPointX = (ball1.xCord + ball2.xCord) / 2;
				var collisionPointY = (ball1.yCord + ball2.yCord) / 2;
				var newVelX1 = (ball1.dx * (ball1.radius - ball2.radius) + (2 * ball2.radius * ball2.dx)) / (ball1.radius + ball2.radius);
				var newVelY1 = (ball1.dy * (ball1.radius - ball2.radius) + (2 * ball2.radius * ball2.dy)) / (ball1.radius + ball2.radius);
				var newVelX2 = (ball2.dx * (ball2.radius - ball1.radius) + (2 * ball1.radius * ball1.dx)) / (ball1.radius + ball2.radius);
				var newVelY2 = (ball2.dy * (ball2.radius - ball1.radius) + (2 * ball1.radius * ball1.dy)) / (ball1.radius + ball2.radius);
					
				ball1.xCord = ball1.xCord + newVelX1;
				ball1.yCord = ball1.yCord + newVelY1;
				ball2.xCord = ball2.xCord + newVelX2;
				ball2.yCord = ball2.yCord + newVelY2; 
					
				}
			}
		
	}