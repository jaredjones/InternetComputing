var weather = require('../src/weather');

exports.testDoesInvalidFileThrowException = function(test){
    var resp = function(data, err){}
    test.throws(weather.readWOEIDFile("invalidfile.txt", resp));
    test.done();
}

exports.testIsWOEIDFileValid = function(test){
    var resp = function(data, err){
        var array = weather.fileStringToWOEIDArray(data);
        test.ok(array[0] != undefined && array[0] != "");
        test.done();        
    }
    weather.readWOEIDFile("WOEIDS.txt", resp);
}

exports.testRemoveEmptyOrInvalidDataFromWOEIDArrayPosZero = function(test){
    var cleanedArray = weather.removeEmptyOrInvalidDataFromArray(["hiya", "", 125, "", undefined, "262"]);
    test.strictEqual(cleanedArray[0], "hiya", "First element in array is incorrect!");
    test.done();
}

exports.testRemoveEmptyOrInvalidDataFromWOEIDArrayPosOne = function(test){
    var cleanedArray = weather.removeEmptyOrInvalidDataFromArray(["hiya", "", 125, "", undefined, "262"]);
    test.strictEqual(cleanedArray[1], 125, "Second element in array is incorrect!");
    test.done();
}

exports.testRemoveEmptyOrInvalidDataFromWOEIDArrayPosTwo = function(test){
    var cleanedArray = weather.removeEmptyOrInvalidDataFromArray(["hiya", "", 125, "", undefined, "262"]);
    test.strictEqual(cleanedArray[2], "262", "Third element in array is incorrect!");
    test.done();
}

exports.testRemoveEmptyOrInvalidDataFromWOEIDArrayCorrectLength = function(test){
    var cleanedArray = weather.removeEmptyOrInvalidDataFromArray(["hiya", "", 125, "", undefined, "262"]);
    test.strictEqual(3, cleanedArray.length, "Your array is of invalid length");
    test.done();
}

exports.testRequestValidXMLURLFromWOEID = function(test){
    var resp = function(data){
        test.ok(data.indexOf('<?xml') >= 0);
        test.done();
    }
    weather.getWeatherData(12791557, resp);    
}

exports.testIsNotEmptyPredicateString = function(test){
    test.ok(weather.isNotEmptyPredicate("hiya"));
    test.done();
}

exports.testIsNotEmptyPredicateStringNum = function(test){
    test.ok(weather.isNotEmptyPredicate("1"));
    test.done();
}

exports.testIsNotEmptyPredicateEmptyString = function(test){
    test.ok(!weather.isNotEmptyPredicate(""));
    test.done();
}

exports.testIsNotEmptyPredicateUndefined = function(test){
    test.ok(!weather.isNotEmptyPredicate(undefined));
    test.done();
}

exports.testExtractCityFromXML = function(test){
    var xml = "<rss><blarg city=\"Houston\"</blarg><region=\"TX\"></region><temp=\"68\"></temp></rss>";
    test.strictEqual("Houston", weather.weatherXMLKeyToValue(xml, "city"));
    test.done();
}

exports.testExtractRegionFromXML = function(test){
    var xml = "<rss><blarg city=\"Houston\"</blarg><region=\"TX\"></region><temp=\"68\"></temp></rss>";
    test.strictEqual("TX", weather.weatherXMLKeyToValue(xml, "region"));
    test.done();
}

exports.testExtractTemperatureFromXML = function(test){
    var xml = "<rss><blarg city=\"Houston\"</blarg><region=\"TX\"></region><temp=\"68\"></temp></rss>";
    test.strictEqual("68", weather.weatherXMLKeyToValue(xml, "temp"));
    test.done();
}

exports.testTurnCityDataIntoTupleForCity = function(test){
    var xml = "<rss><blarg city=\"Houston\"</blarg><region=\"TX\"></region><temp=\"68\"></temp></rss>";
    var cityTuple = weather.weatherXMLToTuple(xml);
    test.strictEqual("Houston", cityTuple[0]);
    test.done();
}

exports.testTurnCityDataIntoTupleForRegion = function(test){
    var xml = "<rss><blarg city=\"Houston\"</blarg><region=\"TX\"></region><temp=\"68\"></temp></rss>";
    var cityTuple = weather.weatherXMLToTuple(xml);
    test.strictEqual("TX", cityTuple[1]);
    test.done();
}

exports.testTurnCityDataIntoTupleForTemperature = function(test){
    var xml = "<rss><blarg city=\"Houston\"</blarg><region=\"TX\"></region><temp=\"68\"></temp></rss>";
    var cityTuple = weather.weatherXMLToTuple(xml);
    test.strictEqual("68", cityTuple[2]);
    test.done();
}

