var Pad = function(mouseX){
	
		this.mouseX = mouseX;
		this.endBar = this.mouseX + (canvas.width * 0.1);
		this.startBar = this.mouseX;
		this.size = this.endBar - this.startBar;
		this.startBar -= (this.size / 2);
		this.endBar -= (this.size / 2);
		ctx.strokeStyle = '#404040';
		ctx.lineWidth=15;
		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.moveTo(this.startBar,0);
		ctx.lineTo(this.endBar,0);
		ctx.stroke();
}