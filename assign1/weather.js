var fs = require('fs');
var httpSync = require('http-sync');

var isNotEmptyPredicate = function(n){
    return (n && n.length != 0);
}

var sanatizeArray = function(a){
    return a.filter(isNotEmptyPredicate);
}

var getWeatherData = function(woeid){
    var request = httpSync.request({
        method:     'GET',
        protocol:   'http',
        host:       'weather.yahooapis.com',
        port:       80,
        path:       '/forecastrss?w=' + woeid
    });
    return request.end().body.toString();
}

var weatherXMLKeyToValue = function(s, key){
    var beginTag = "=\"";
    var index = s.indexOf(key + beginTag) + key.length + beginTag.length;
    var end = s.indexOf("\"", index);
    return s.slice(index, end);
}

var weatherXMLToTuple = function(s){
    var city = weatherXMLKeyToValue(s, "city");
    var region = weatherXMLKeyToValue(s, "region");
    var temp = weatherXMLKeyToValue(s, "temp");
    return [city, region, temp];
}

var main = function(){

    var fileData = fs.readFileSync(__dirname + '/WOEIDS.txt', 'ascii');
    var WOEIDArray = sanatizeArray(fileData.split('\n'));

    console.log('Please Wait (Getting Weather Data)...');

    WOEIDArray.forEach(function(e){
        var weatherXMLString = getWeatherData(e);
        var weatherTuple = weatherXMLToTuple(weatherXMLString);
        console.log(weatherTuple[0] + " " + weatherTuple[1] + " " + weatherTuple[2]);
    });
}

if (require.main === module){
    main();
}

exports.isNotEmptyPredicate = isNotEmptyPredicate;
exports.sanatizeArray = sanatizeArray;
exports.weatherXMLKeyToValue = weatherXMLKeyToValue;
exports.weatherXMLToTuple = weatherXMLToTuple;
