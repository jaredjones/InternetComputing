describe('Drop and Drop Test', function(){
    beforeEach(function() {
        this.copyData = 'foo';
        this.targetID = 0;

        var testContext = this;
        
        this.element = {
            innerHTML: "blargness",
            value: "nissan,toyota,honda"
        };

        this.document = {
            getElementById: function(id) {
                return testContext.element;
            }
        };

        this.event = {
            preventDefault: function() {
                this.preventDefaultCalled = true;
            },
            dataTransfer: {
                getData: function(property) {
                    return testContext.copyData;
                },
                setData: function(property, id) {
                    testContext.copyData = property;
                    testContext.targetID = id;
                }
            },
            target: {
                id: function(property) {
                    return targetID;
                },
                appendChild: function(element) {
                }
            }
        };
    }); 
    
    it('DropTarget has ondragover', function(){
        var droptarget = {};
        registerDragDrop(this.document, [], droptarget);
        expect(typeof(droptarget.ondragover)).to.be.eql('function');
    });

    it('DropTarget has ondrop', function(){
        var droptarget = {};
        registerDragDrop(this.document, [], droptarget);
        expect(typeof(droptarget.ondrop)).to.be.eql('function');
    });

    it('Drag element first has ondragstart', function(){
        var dragelement = {};
        var droptarget = {};
        registerDragDrop(this.document, [dragelement], droptarget);
        expect(typeof(dragelement.ondragstart)).to.be.eql('function');
    });
    
    it('Drag element second has ondragstart', function(){
        var dragelement = {};
        var dragelement2 = {};
        var droptarget = {};
        registerDragDrop(this.document, [dragelement,dragelement2], droptarget);
        expect(typeof(dragelement2.ondragstart)).to.be.eql('function');
    });
    
    it('ondragstart implements dataTransfer', function(){
        var droptarget = {};
        var dragelement = {};
        registerDragDrop(this.document, [dragelement], droptarget);
        dragelement.ondragstart(this.event);
        expect(this.event.dataTransfer.getData("text")).to.be.eql("text");

    });
    it('ondragover implements preventingDefaults', function(){
        var droptarget = {};
        registerDragDrop(this.document,[], droptarget);
        
        droptarget.ondragover(this.event);
        expect(this.event.preventDefaultCalled).to.be.eql(true);
    });

    it('ondrop implements preventingDefaults', function(){
        var droptarget = {};

        registerDragDrop(this.document,[], droptarget);

        droptarget.ondrop(this.event);
        expect(this.event.preventDefaultCalled).to.be.eql(true);
    });

    it('ondrop implements Car List Builder, with comma prepender', function(){
        var droptarget = {}; 
        registerDragDrop(this.document, [], droptarget);
    
        this.document.getElementById("somecarexample").value = ",nissna,civic,toyta";
        droptarget.ondrop(this.event);
    });

});
