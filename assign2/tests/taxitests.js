describe('Drop and Drop Test', function(){
    beforeEach(function() {
        this.copyData = 'foo';
        this.targetID = 0;

        var testContext = this;
        this.event = {
            preventDefault: function() {
                this.preventDefaultCalled = true;
            },
            dataTransfer: {
                getData: function(property) {
                    return property === 'text' ? testContext.copyData : '';
                },
                setData: function(property, id) {
                    testContext.copyData = property;
                    testContext.targetID = id;
                }
            },
            target: {
                id: function(property) {
                    return targetID;
                }
            }
        };
    }); 
    
    it('DropTarget has ondragover', function(){
        var droptarget = {};
        registerDragDrop([], droptarget);
        expect(typeof(droptarget.ondragover)).to.be.eql('function');
    });

    it('DropTarget has ondrop', function(){
        var droptarget = {};
        registerDragDrop([], droptarget);
        expect(typeof(droptarget.ondrop)).to.be.eql('function');
    });

    it('Drag element first has ondragstart', function(){
        var dragelement = {};
        var droptarget = {};
        registerDragDrop([dragelement], droptarget);
        expect(typeof(dragelement.ondragstart)).to.be.eql('function');
    });
    
    it('Drag element second has ondragstart', function(){
        var dragelement = {};
        var dragelement2 = {};
        var droptarget = {};
        registerDragDrop([dragelement,dragelement2], droptarget);
        expect(typeof(dragelement2.ondragstart)).to.be.eql('function');
    });
    
    it('ondragstart implements dataTransfer', function(){
        var droptarget = {};
        var dragelement = {};
        registerDragDrop([dragelement], droptarget);
        dragelement.ondragstart(this.event);
        expect(this.event.dataTransfer.getData("text")).to.be.eql("text");

    });
    it('ondragover implements preventingDefaults', function(){
        var droptarget = {};
        registerDragDrop([], droptarget);
        
        droptarget.ondragover(this.event);
        expect(this.event.preventDefaultCalled).to.be.eql(true);
    });

});
