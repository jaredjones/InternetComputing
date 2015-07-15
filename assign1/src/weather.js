var fs = require('fs');
var http = require('http');

var main = function(){
    fs.readFile(__dirname + '/WOEIDS.txt', 'utf8', fileReceivedCallback);
}

var fileReceivedCallback = function(err, data){
    if (err){
        return console.log(err);
    }
    var WOEIDArray = removeEmptyOrInvalidDataFromArray(data.split('\n')); 
    outputWeatherDataGivenArray(WOEIDArray);
}

var outputWeatherDataGivenArray = function (woeidArray){
    console.log('Please Wait (Getting Weather Data)...');
    getWeatherData(woeidArray[0]);
}

var getWeatherData = function(woeid){
    var req = http.get({
        host: 'weather.yahooapis.com',
        path: '/forecastrss?w=' + woeid
    }, weatherDataCallback);
}

var weatherDataCallback = function(res){
    var data = '';
    res.on('data', function (chunk){
        data += chunk;
    });
    res.on('end', function (){
        var cityTuple = weatherXMLToTuple(data);
        printCityTuple(cityTuple);
    });
}

var isNotEmptyPredicate = function(n){
    return (n && n.length != 0);
}

var removeEmptyOrInvalidDataFromArray = function(a){
    return a.filter(isNotEmptyPredicate);
}

var printCityTuple = function(t){
    console.log(t[0] + " " + t[1] + " " + t[2]);
}

var weatherXMLToTuple = function(s){
    var city = weatherXMLKeyToValue(s, "city");
    var region = weatherXMLKeyToValue(s, "region");
    var temp = weatherXMLKeyToValue(s, "temp");
    return [city, region, temp];
}

var weatherXMLKeyToValue = function(s, key){
    var beginTag = "=\"";
    var index = s.indexOf(key + beginTag) + key.length + beginTag.length;
    var end = s.indexOf("\"", index);
    return s.slice(index, end);
}

if (require.main === module){main();}

exports.isNotEmptyPredicate = isNotEmptyPredicate;
exports.removeEmptyOrInvalidDataFromArray = removeEmptyOrInvalidDataFromArray;
exports.weatherXMLKeyToValue = weatherXMLKeyToValue;
exports.weatherXMLToTuple = weatherXMLToTuple;
