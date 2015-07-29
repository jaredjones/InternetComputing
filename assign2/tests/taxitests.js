beforeEach(function() {
    this.copyData = 'foo';
    this.targetID = 0;

    var testContext = this;
   
    this.navigator = {
        geolocation: {
            position: {
                coords: {
                    latitude: 0,
                    longitude: 0
                }
            },
            PositionError: {
                code: 1              
            },
            fireError: 0,
            getCurrentPosition: function(callback, errorcallback, doc){
                if (this.fireError != 0)
                    errorcallback(this.PositionError, doc);
                else{
                    var lat = {}; 
                    callback(this.position, doc);
                }
            }
        }
    };

    this.document = {
        eMap: {},
        getElementById: function(id) {
            if (this.eMap[id] == null)
                this.eMap[id] = {
                    innerHTML: "",
                    value: ""
                }
            return this.eMap[id];
        },
    }

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

describe('Drop and Drop Test', function(){
    
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
        this.document.getElementById("foo").innerHTML = "honda";
        this.document.getElementById("carList").value = ",nissan,civic,toyota";
        droptarget.ondrop(this.event);

        expect(this.document.getElementById("carList").value).to.be.eql("nissan,civic,toyota,honda");
    });
    
    it('ondrop implements Car List Builder, with normal formatting', function(){
        var droptarget = {}; 
        registerDragDrop(this.document, [], droptarget);
        this.document.getElementById("foo").innerHTML = "honda";
        this.document.getElementById("carList").value = "nissan,civic,toyota";
        droptarget.ondrop(this.event);

        expect(this.document.getElementById("carList").value).to.be.eql("nissan,civic,toyota,honda");
    });
});

describe('Location Services Test', function(){
    it('Mouse Events sets up onClick Event', function(){
        setupMouseEvents(this.document);
        
        var button = this.document.getElementById("getLocationButton");
        
        expect(typeof(button.onclick)).to.be.eql("function");
    });

    it('Geolocation Button Text Changed on Click', function(){
        var nav = {
            geolocation:{
                getCurrentPosition: function(callback, error){
                    return null;                  
                }
            }
        };
        setupMouseEvents(this.document, nav);
        var button = this.document.getElementById("getLocationButton");
        button.onclick();
        expect(button.innerHTML).to.be.eql("Please Wait...");
    });

    it('Geolocation error messages fires position unavailable', function(){
        
        setupMouseEvents(this.document, this.navigator);
        var button = this.document.getElementById("getLocationButton");
        this.navigator.geolocation.fireError = 1;
        this.navigator.geolocation.PositionError.code = 2;
        button.onclick();

    });
    
    it('Geolcation verify coordinate position latitude', function(){
        this.navigator.geolocation.position.coords.latitude = 28.28581;
        setCallbackDocumentModifier(this.document);
        locationInfo(this.navigator.geolocation.position);
       
        var lat = this.document.getElementById("lat").value;
      
        expect(lat).to.be.eql(28.28581);
    });
    
    it('Geolcation verify coordinate position data', function(){
        this.navigator.geolocation.position.coords.longitude = 12.3892;
        setCallbackDocumentModifier(this.document);
        locationInfo(this.navigator.geolocation.position);
       
        var lng = this.document.getElementById("lng").value;
      
        expect(lng).to.be.eql(12.3892);
    });
});
