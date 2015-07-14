var fs = require('fs');
var httpSync = require('http-sync');

var isNotEmptyPredicate = function(n){
    return (n && n.length != 0);
}

var sanatizeArray = function(a){
    return a.filter(isNotEmptyPredicate);
}

var GetWeatherData = function(woeid){
    var request = httpSync.request({
        method:     'GET',
        protocol:   'http',
        host:       'weather.yahooapis.com',
        port:       80,
        path:       '/forecastrss?w=' + woeid
    });
    return request.end().body.toString();
}

var WeatherXMLKeyToValue = function(s, key){
    var beginTag = "=\"";
    var index = s.indexOf(key + beginTag) + key.length + beginTag.length;
    var end = s.indexOf("\"", index);
    return s.slice(index, end);
}

var WeatherXMLToTuple = function(s){
    var city = WeatherXMLKeyToValue(s, "city");
    var region = WeatherXMLKeyToValue(s, "region");
    var temp = WeatherXMLKeyToValue(s, "temp");
    return [city, region, temp];
}

var fileData = fs.readFileSync(__dirname + '/WOEIDS.txt', 'ascii');
var WOEIDArray = sanatizeArray(fileData.split('\n'));

console.log('Please Wait (Getting Weather Data)...');

WOEIDArray.forEach(function(e){
    var weatherXMLString = GetWeatherData(e);
    var weatherTuple = WeatherXMLToTuple(weatherXMLString);
    console.log(weatherTuple[0] + " " + weatherTuple[1] + " " + weatherTuple[2]);
});

exports.isNotEmptyPredicate = isNotEmptyPredicate;
exports.sanatizeArray = sanatizeArray;

