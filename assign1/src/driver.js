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


//Venkat: Can we refactor this further to the following?

//weather.getWeatherForCities("WOEIDS.txt", responseFunction, errorFunction);

//where errorFunction is called if there was an error reading the file and
//responseFunction may be called with a sorted list of weather data.

//That way the driver only has to make one single call with functions that only do console.log();