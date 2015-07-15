var weather = require('../src/weather');

//Venkat: Instead of dow not throw write a test to check what it should really do if file was valid
exports.testCanReadWOEIDsFromFile = function(test){
    test.doesNotThrow(weather.readWOEIDFile, Error, 'File reading has failed!');
    test.done();
}

//Venkat: Write a test for invalid file.

exports.testRequestValidXMLURLFromWOEID = function(test){
    var resp = function(data){
        test.ok(data.indexOf('<?xml') >= 0);
        test.done();
    }
    weather.getWeatherData(12791557, resp);    
}

//Venkat: Write a test for invalid WOEID.

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

exports.testRemoveEmptyOrInvalidDataFromArrayPosZero = function(test){
    var a = weather.removeEmptyOrInvalidDataFromArray(["hiya", "", 125, "", undefined, "262"]);
    test.strictEqual(a[0], "hiya", "First element in array is incorrect!");
    test.done();
}

exports.testRemoveEmptyOrInvalidDataFromArrayPosOne = function(test){
    var a = weather.removeEmptyOrInvalidDataFromArray(["hiya", "", 125, "", undefined, "262"]);
    test.strictEqual(a[1], 125, "Second element in array is incorrect!");
    test.done();
}

exports.testRemoveEmptyOrInvalidDataFromArrayPosTwo = function(test){
    var a = weather.removeEmptyOrInvalidDataFromArray(["hiya", "", 125, "", undefined, "262"]);
    test.strictEqual(a[2], "262", "Third element in array is incorrect!");
    test.done();
}

exports.testRemoveEmptyOrInvalidDataFromArrayCorrectLength = function(test){
    var a = weather.removeEmptyOrInvalidDataFromArray(["hiya", "", 125, "", undefined, "262"]);
    test.strictEqual(3, a.length, "Your array is of invalid length");
    test.done();
}

//Venkat: Don't put multiple independent asserts in one test. Separare this to three tests.
exports.testExtractDataFromXML = function(test){
    var xml = "<rss><blarg city=\"Houston\"</blarg><region=\"TX\"></region><temp=\"68\"></temp></rss>";
    test.strictEqual("Houston", weather.weatherXMLKeyToValue(xml, "city"));
    test.strictEqual("TX", weather.weatherXMLKeyToValue(xml, "region"));
    test.strictEqual("68", weather.weatherXMLKeyToValue(xml, "temp"));
    test.done();
}

//Venkat: Use better variable names than meaningless variable names like t.
exports.testTurnCityDataIntoTuple = function(test){
    var xml = "<rss><blarg city=\"Houston\"</blarg><region=\"TX\"></region><temp=\"68\"></temp></rss>";
    var t = weather.weatherXMLToTuple(xml);
    test.strictEqual("Houston", t[0]);
    test.strictEqual("TX", t[1]);
    test.strictEqual("68", t[2]);
    test.done();
}
