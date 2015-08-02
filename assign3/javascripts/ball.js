var Ball = function(color){
	this.xCord = getRandomNumberWithBounds(100, window.innerWidth - 100);
	this.yCord = getRandomNumberWithBounds(100, window.innerHeight - 100);
	this.color = color;
	this.drawBall = function(){
		ctx.beginPath();
		ctx.arc(this.xCord, this.yCord, (window.innerWidth * 0.1) / 2, 0, 2 * Math.PI, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = '#000000';
		ctx.stroke();
	}
}