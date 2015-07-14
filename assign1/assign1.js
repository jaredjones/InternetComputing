// You must run: npm install http-sync

var fs = require('fs');
var httpSync = require('http-sync');

var WeatherXMLToArray = function(bodyString)
{
	var searchStringCity = "<yweather:location city=\"";
	var searchStringState = "region=\"";
	var searchStringTemp = "temp=\"";
	
	var cityIndex = bodyString.search(searchStringCity);
	var dataLine = bodyString.substring(cityIndex + searchStringCity.length);
	var endIndex = dataLine.indexOf("\"");
	
	var city = dataLine.substring(0, endIndex);
	
	var regionIndex = dataLine.search(searchStringState);
	dataLine = dataLine.substring(regionIndex + searchStringState.length);
	endIndex = dataLine.indexOf("\"");
	
	var state = dataLine.substring(0, endIndex);
	
	regionIndex = dataLine.search(searchStringTemp);
	dataLine = dataLine.substring(regionIndex + searchStringTemp.length);
	endIndex = dataLine.indexOf("\"");
	
	var temp = dataLine.substring(0, endIndex);
	
	return [city, state, temp];
}

var GetWeatherData = function(woeid)
{
	var request = httpSync.request({
	    method: 'GET',
	    headers: {},
	    protocol: 'http',
	    host: 'weather.yahooapis.com',
	    port: 80,
	    path: '/forecastrss?w=' + woeid
	});
	
    var response = request.end()
	return response.body.toString();
}

var City = function(city,state,temp) 
{
    this.city = city;
    this.state = state;
    this.temp = temp;
	
	this.getCity = function() { return this.city; };
	this.getState = function() { return this.state; };
	this.getTemp = function() { return this.temp; };
}

var fileData = fs.readFileSync(__dirname + '/input.txt', 'utf8');
var WOEIDArray = fileData.split('\n');
WOEIDArray.pop();

console.log("Please Wait (Getting Weather Data)...");

var cityArray = new Array();
WOEIDArray.forEach(function(e)
{
	var weatherXMLData = GetWeatherData(e);
	var weatherData = WeatherXMLToArray(weatherXMLData);
	
	var c = new City(weatherData[0], weatherData[1], weatherData[2]);
	cityArray.push(c);
});

cityArray.sort(function(a,b)
{
	if (a.getCity() < b.getCity())
		return -1;
	if (a.getCity() > b.getCity())
		return 1;
	if (a.getState() < b.getState())
		return -1;
	if (a.getState() > b.getState())
		return 1;
	return 0;
});

console.log("City, State    Temperature");
cityArray.forEach(function(e){
	console.log(e.getCity() + " " + e.getState() + " " + e.getTemp());
})

