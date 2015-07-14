var weather = require('../weather');

exports.testIsNotEmptyPredicate = function(test){
    test.ok(weather.isNotEmptyPredicate("hiya"));
    test.ok(weather.isNotEmptyPredicate("1"));
    test.ok(!weather.isNotEmptyPredicate(""));
    test.ok(!weather.isNotEmptyPredicate(undefined));
    test.done();
}

exports.testSanatizeArray = function(test){
    var a = weather.sanatizeArray(["hiya", "", 125, "", undefined, "262"]);
    test.strictEqual(a[0], "hiya", "First element in array is incorrect!");
    test.strictEqual(a[1], 125, "Second element in array is incorrect!");
    test.strictEqual(a[2], "262", "Third element in array is incorrect!");
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
