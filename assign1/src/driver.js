var weather = require('../src/include');

var errorCallback = function(err){
    console.log(err);
}

var responseCallback = function(weatherTupleArray){
    console.log("City             Region      Temp");
    weatherTupleArray.forEach(function(tuple){
        var city = tuple[0];
        var region = tuple[1];
        var temp = tuple[2];
        console.log(city + Array(20-city.length).join(" ") + region + "         " + temp);
    });
}

weather.getWeatherForCities("WOEIDS.txt", responseCallback, errorCallback); 
