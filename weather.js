$(document).ready(() => {
  console.log("ready");
  // API Key by city
  // Dependencies
  // DOM elements ===============
  // Starter Data ==============

  // Functions======================
  // Display Data ==========

  // User Functions ==============

  console.log($(".submit"));

  //   function renderCity() {
  // Clear search history
  // $("#search-history").text("");

  // Render a new li for each city
  //     for (var i = 0; i < cities.length; i++) {
  //       var city = cities[i];
  //       console.log(city);
  //       var li = $("<li>").text(city);
  //       $("#search-history").append(li);
  //     }
  //   }
  // User types a city
  //   $(".city");
  // Submits their search city
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
      //   forEach(futureDates());
      //   $("#date-one").text(result.list[7].dt_txt);
      //          an icon representation of weather conditions
      //          the temperature
      //          the humidity

      //   var cityText = $("#city-name").val();
      //   // Return from function early if submitted cityText is blank
      //   if (cityText === "") {
      //     return;
      //   }
      //   // Add new city to cities array, clear the input
      //   cities.unshift(cityText);
      //   $("#city-name").empty();
      //   // Store updated cities in localStorage, re-render the list
      //   storeCity();
      //   renderCity();
    });
    // function (citySearchHistory() {
    //     for (var i = 0; i < cities.length; i++) {
    //         var cityHistory = cities[i];

    //         var li = document.createElement("li");
    //         li.textContent = city;
    //         li.setAttribute("data-index", i);

    //         cityHistory.appendChild(li);
    //       }

    //     }
    // });

    //  Search history is saved
    //  Search history saved below
  });
  // I click on a city in the search history
  //   function storeCity() {
  //     // Stringify and set "todos" key in localStorage to todos array
  //     localStorage.setItem("cities", JSON.stringify(cities));
  //   }

  //   function init() {
  //     // Parsing the JSON string to an object
  //     var storedCity = JSON.parse(localStorage.getItem("cities"));
  //     // If todos were retrieved from localStorage, update the todos array to it
  //     if (storedCity !== null) {
  //       city = storedCity;
  //     }
  //     // Render todos to the DOM
  //     renderCity();
  //   }

  // I open the weather dashboard
  // I am presented with the last searched city forecast
});
