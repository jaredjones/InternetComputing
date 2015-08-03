//Presently the entire game is inside of game.js, and is not unit tested
//Once we have the game working we will move the logic into this file and begin tests.

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

var getRandomNumberWithBounds = function(min, max) {
  return Math.random() * (max - min) + min;
}
