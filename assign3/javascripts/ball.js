var Ball = function(color){
	this.xCord = getRandomNumberWithBounds(100, canvas.width - 100);
	this.yCord = getRandomNumberWithBounds(100, canvas.height - 100);
	this.color = color;
	this.prevX;
	this.prevY;
	//this.vx = getRandomNumberWithBounds(0, canvas.width);
	this.dx = 0.01 * canvas.width;
	this.dy = this.dx;
	
	this.drawBall = function(){
		this.moveBall();
		ctx.beginPath();
		ctx.arc(this.xCord, this.yCord, (canvas.width * 0.1) / 2, 0, 2 * Math.PI, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = '#000000';
		ctx.stroke();
	}
	this.moveBall = function(){
	
		
		if(this.xCord < 0){
			this.dx *= -1;//dx = dx * -1;
		}
		if(this.xCord > canvas.width){
			this.dx *= -1;
		}
		if(this.yCord < 0){
			this.dy *= -1;//dy = dy * -1;
		}
		if(this.yCord > canvas.height){
			this.dy *= -1;
		}
		this.xCord += this.dx;
		this.yCord += this.dy;
		
	}
}