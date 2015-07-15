var weather = require('../src/weather');

exports.testCanReadWOEIDsFromFile = function(test){
    test.doesNotThrow(weather.readWOEIDFile, Error, 'File reading has failed!');
    test.done();
}

exports.testRequestValidXMLURL = function(test){
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

exports.testWeatherXMLKeyToValue = function(test){
    var xml = "<rss><blarg city=\"Houston\"</blarg><region=\"TX\"></region><temp=\"68\"></temp></rss>";
    test.strictEqual("Houston", weather.weatherXMLKeyToValue(xml, "city"));
    test.strictEqual("TX", weather.weatherXMLKeyToValue(xml, "region"));
    test.strictEqual("68", weather.weatherXMLKeyToValue(xml, "temp"));
    test.done();
}

exports.testWeatherXMLToTuple = function(test){
    var xml = "<rss><blarg city=\"Houston\"</blarg><region=\"TX\"></region><temp=\"68\"></temp></rss>";
    var t = weather.weatherXMLToTuple(xml);
    test.strictEqual("Houston", t[0]);
    test.strictEqual("TX", t[1]);
    test.strictEqual("68", t[2]);
    test.done();
}
