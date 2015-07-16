var weather = require('../src/weather');

weather.readWOEIDFile("WOEIDS.txt", function(data, error){
    if (error){
        return console.log('Error Reading File!');
    }

    var WOEIDArray = weather.fileStringToWOEIDArray(data);
    var WOEIDArrayFinalized = weather.removeEmptyOrInvalidDataFromArray(WOEIDArray);
    outputWeatherDataGivenArray(WOEIDArrayFinalized);
});

var outputWeatherDataGivenArray = function(woeidArray){
    console.log('Please Wait (Getting Weather Data)...');
    weather.getWeatherData(woeidArray[0], weatherDataXMLReceived);
}

var weatherDataXMLReceived = function(data){
    var cityTuple = weather.weatherXMLToTuple(data);
    console.log(cityTuple[0] + " " + cityTuple[1] + " " + cityTuple[2]);
}
