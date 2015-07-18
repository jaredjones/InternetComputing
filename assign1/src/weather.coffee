fs = require('fs')
http = require('http')

getWeatherForCities = (filename, responseFunction, errorFunction) ->
  buildWeatherData = (data, err) ->
    if err
      errorFunction(data, err)
  
    woeidArray = removeEmptyOrInvalidDataFromArray(fileStringToWOEIDArray(data))
    numberOfWOEIDS = woeidArray.length
    weatherTupleArray = []

    weatherDataReceived = (xmlData) ->
      cityTuple = weatherXMLToTuple(xmlData)
      weatherTupleArray.push cityTuple
      numberOfWOEIDS--
  
      if numberOfWOEIDS == 0
        sortWeatherTuple weatherTupleArray
        responseFunction weatherTupleArray

    woeidArray.forEach (id) ->
      getWeatherData id, weatherDataReceived

  readWOEIDFile filename, buildWeatherData

readWOEIDFile = (filename, callback) ->
  fileReceivedCallback = (err, data) ->
    callback data, err

  fs.readFile __dirname + '/' + filename, 'utf8', fileReceivedCallback

fileStringToWOEIDArray = (fileString) ->
  fileString.split '\n'

getWeatherData = (woeid, callback) ->
  weatherDataCallback = (res) ->
    data = ''
    res.on 'data', (chunk) ->
      data += chunk
    res.on 'end', ->
      callback data

  req = http.get({
    host: 'weather.yahooapis.com'
    path: '/forecastrss?w=' + woeid
  }, weatherDataCallback)

sortWeatherTuple = (weatherTupleArray) ->
  weatherTupleArray.sort (a, b) ->
    firstCity = a[0]
    firstRegion = a[1]
    secondCity = b[0]
    secondRegion = b[1]
    if firstCity < secondCity
      -1
    if firstCity > secondCity
      1
    if firstRegion < secondRegion
      -1
    if firstRegion > secondRegion
      1
    0

isNotEmptyPredicate = (str) ->
  str and str.length != 0

removeEmptyOrInvalidDataFromArray = (arr) ->
  arr.filter isNotEmptyPredicate

weatherXMLToTuple = (xmlData) ->
  city = weatherXMLKeyToValue(xmlData, 'city')
  region = weatherXMLKeyToValue(xmlData, 'region')
  temp = weatherXMLKeyToValue(xmlData, 'temp')
  [city,region,temp]

weatherXMLKeyToValue = (s, key) ->
  beginTag = '="'
  index = s.indexOf(key + beginTag) + key.length + beginTag.length
  end = s.indexOf('"', index)
  s.slice index, end

exports.getWeatherForCities = getWeatherForCities
exports.readWOEIDFile = readWOEIDFile
exports.fileStringToWOEIDArray = fileStringToWOEIDArray
exports.getWeatherData = getWeatherData
exports.sortWeatherTuple = sortWeatherTuple
exports.isNotEmptyPredicate = isNotEmptyPredicate
exports.removeEmptyOrInvalidDataFromArray = removeEmptyOrInvalidDataFromArray
exports.weatherXMLKeyToValue = weatherXMLKeyToValue
exports.weatherXMLToTuple = weatherXMLToTuple
