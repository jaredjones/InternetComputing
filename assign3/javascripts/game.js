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
