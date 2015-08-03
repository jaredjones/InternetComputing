describe('canary description', function(){
    it('canary test', function(){
        expect(true).to.be.eql(true);        
    });
});
describe('get random number', function(){
	it('random number test', function(){
		var theMin = 1;
		var theMax = 5;
		var range = getRandomNumberWithBounds(theMin, theMax);
		expect(range).to.be.within(theMin,theMax);
	});
});
describe('get fps', function(){
	it('fps getter', function(){
		var lastUpdate = 30;
		var now = 40;
		var fps = 60;
		var newTime = getFPS(lastUpdate, now, fps);
		expect(newTime.displayFps).to.be.eql(100);
		expect(newTime.theOldTime).to.be.eql(40);
		expect(newTime.theFps).to.be.eql(100);
	});
});
