var searchHistory = []; // added
$(document).ready(() => {
  console.log("ready");
  // added

  // API Key by city
  // Dependencies
  // DOM elements ===============
  // Starter Data ==============

  // Functions======================
  // Display Data ==========

  // User Functions ==============

  console.log($(".submit"));

  $(".submit").on("click", function () {
    event.preventDefault();
    var cityNameInput = $("#city-name").val();
    console.log(cityNameInput);

    var queryURL =
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
      cityNameInput +
      "&units=imperial&appid=c7629276d88b73d9dee17485c554906b";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (result) {
      console.log(result);

      //  Current weather displays
      //      city name
      var cityName = result.city.name;
      $("#current-city").text(cityName);
      //      the date
      var date = moment();
      var dateDisplay = date.format("MMM Do YYYY");
      console.log(dateDisplay);
      $("#current-date").text(dateDisplay);
      //      an icon representation of weather conditions
      var iconCode = result.list[0].weather[0].icon;
      var iconImage = "http://openweathermap.org/img/w/" + iconCode + ".png";
      console.log(iconCode);
      console.log(iconImage);
      $("#current-weather-icon").attr("src", iconImage);
      //      the temperature
      var currentTemp = result.list[0].main.temp;
      console.log(currentTemp);
      $("#current-temp").text(currentTemp);
      //      the humidity
      var currentHumidity = result.list[0].main.humidity;
      console.log(currentHumidity);
      $("#current-humidity").text(currentHumidity);
      //      the wind speed
      var currentWindSpeed = result.list[0].wind.speed;
      console.log(currentWindSpeed);
      $("#current-windspeed").text(currentWindSpeed);
      //      the UV index
      var lat = result.city.coord.lat;
      var lon = result.city.coord.lon;
      //          The UV Index color coding
      var uvQueryURL =
        "http://api.openweathermap.org/data/2.5/uvi?appid=c7629276d88b73d9dee17485c554906b&lat=" +
        lat +
        "&lon=" +
        lon;
      $.ajax({
        url: uvQueryURL,
        method: "GET",
      }).then(function (result) {
        console.log(result);
        var uvIndex = result.value;
        console.log(typeof uvIndex);
        var uvIndexValue = Math.floor(parseInt(uvIndex));
        console.log(uvIndexValue);
        $("#current-uvindex").text(uvIndex);
        //      presented with a color that indicates whether the conditions are favorable, moderate, or severe
        if (uvIndexValue <= 2) {
          $("#current-uvindex").css("background-color", "green");
        } else if (uvIndexValue >= 6) {
          $("#current-uvindex").css("background-color", "red");
        } else {
          $("#current-uvindex").css("background-color", "yellow");
        }
      });
      //  Future weather displays
      //      5-day forecast that displays:
      //          the date
      //
      $("#temperature-one").text(result.list[8].main.temp);

      $("#humidity-one").text(result.list[8].main.humidity);
      $("#temperature-two").text(result.list[16].main.temp);
      $("#humidity-two").text(result.list[16].main.humidity);
      $("#temperature-three").text(result.list[16].wind.speed);
      $("#humidity-three").text(result.list[16].main.pressure);
      $("#temperature-four").text(result.list[24].main.temp);
      $("#humidity-four").text(result.list[24].main.humidity);
      $("#temperature-five").text(result.list[32].main.temp);
      $("#humidity-five").text(result.list[32].main.humidity);
      displayHistory();
    });

    //  Search history is saved
    //  Search history saved below
    // added
    function displayHistory() {
      $("#history").empty();
      for (var i = 0; i < searchHistory.length; i++) {
        var cityDiv = $("<div>");
        cityDiv.addClass("list-group-item");
        cityDiv.text(searchHistory[i]);
        $("#history").append(cityDiv);
      }

      //added user inputs search
      function searchCity(event) {
        event.preventDefault();
        var cityName = $("#city-name").val();
        localStorage.setItem("cities", JSON.stringify(searchHistory));
        searchHistory.unshift(cityName);
        displayHistory();
        $("#city-name").val("");
      }
      searchCity();
    }
  });

  // I open the weather dashboard
  // I am presented with the last searched city forecast
});
