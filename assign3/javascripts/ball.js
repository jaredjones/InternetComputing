var Ball = function(color){
	this.xCord = getRandomNumberWithBounds(100, canvas.rWidth - 100);
	this.yCord = getRandomNumberWithBounds(100, canvas.rHeight - 100);
	this.color = color;
	this.radius = (canvas.width * 0.1) / 2;
	this.prevX;
	this.prevY;
	this.mouseX;
	
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
			this.dx *= -1;//dx = dx * -1;
		}
		if(this.xCord + this.radius > canvas.rWidth){
			this.dx *= -1;
		}
		if(this.yCord - this.radius >= 10 && this.yCord - this.radius < 20 && this.xCord >= this.mouseX - 80 && this.xCord <= this.mouseX + 80){
			this.dy *= -1;//dy = dy * -1;
		}
		if(this.yCord + this.radius > canvas.rHeight){
			this.dy *= -1;
		}
		this.xCord += this.dx;
		this.yCord += this.dy;
		
	}
	//Working on ball 2 ball collision here
	/*this.detectCollision = function(ball1, ball2){
			if(ball1.xCord + ball1.radius + ball2.radius > ball2.xCord && ball1.xCord < ball2.xCord + ball1.radius
			&& ball1.yCord + ball1.radius + ball2.radius > ball2.yCord && ball1.yCord < ball2.yCord + ball1.radius + ball2.radius){
				
				var distance = Math.sqrt(((ball1.xCord - ball2.xCord) * (ball1.xCord - ball2.xCord) + ((ball1.yCord - ball2.yCord) * (ball1.yCord - ball2.yCord)));
				if(distance < ball1.radius + ball2.radius){
					var collisionPointX = (ball1.xCord + ball2.xCord) / 2;
					var collisionPointY = (ball1.yCord + ball2.yCord) / 2;
					
				}
			}
		
	}*/
	
}