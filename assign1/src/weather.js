var fs = require('fs');
var http = require('http');

var readWOEIDFile = function(filename, callback){
    var fileReceivedCallback = function(err, data){
        callback(data, err);
    }
    fs.readFile(__dirname + '/' + filename, 'utf8', fileReceivedCallback);
}

var fileStringToWOEIDArray = function(fileString){
    return fileString.split('\n');
}

var getWeatherData = function(woeid, callback){
    var weatherDataCallback = function(res){
        var data = '';
        res.on('data', function (chunk){
            data += chunk;
        });
        res.on('end', function (){
            callback(data);
        });
    }
    var req = http.get({
        host: 'weather.yahooapis.com',
        path: '/forecastrss?w=' + woeid
    }, weatherDataCallback);
}

var isNotEmptyPredicate = function(str){
    return (str && str.length != 0);
}

var removeEmptyOrInvalidDataFromArray = function(arr){
    return arr.filter(isNotEmptyPredicate);
}

var weatherXMLToTuple = function(xmlData){
    var city = weatherXMLKeyToValue(xmlData, "city");
    var region = weatherXMLKeyToValue(xmlData, "region");
    var temp = weatherXMLKeyToValue(xmlData, "temp");
    return [city, region, temp];
}

var weatherXMLKeyToValue = function(s, key){
    var beginTag = "=\"";
    var index = s.indexOf(key + beginTag) + key.length + beginTag.length;
    var end = s.indexOf("\"", index);
    return s.slice(index, end);
}

exports.readWOEIDFile = readWOEIDFile;
exports.fileStringToWOEIDArray = fileStringToWOEIDArray;
exports.getWeatherData = getWeatherData;
exports.isNotEmptyPredicate = isNotEmptyPredicate;
exports.removeEmptyOrInvalidDataFromArray = removeEmptyOrInvalidDataFromArray;
exports.weatherXMLKeyToValue = weatherXMLKeyToValue;
exports.weatherXMLToTuple = weatherXMLToTuple;
