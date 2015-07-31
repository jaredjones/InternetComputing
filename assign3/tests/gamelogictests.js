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