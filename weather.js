// API Key by city

var cityName = "New York";
var queryURL =
  "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=c7629276d88b73d9dee17485c554906b"

  $.ajax({
    url: queryURL
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });