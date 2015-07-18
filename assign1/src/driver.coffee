weather = require('../src/include')

errorCallback = (err) ->
  console.log err
  return

responseCallback = (weatherTupleArray) ->
  console.log 'City             Region      Temp'

  weatherTupleArray.forEach (tuple) ->
    city = tuple[0]
    region = tuple[1]
    temp = tuple[2]

    console.log city + Array(20 - (city.length)).join(' ') + region + '         ' + temp
    return
  return

weather.getWeatherForCities 'WOEIDS.txt', responseCallback, errorCallback
