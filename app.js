var cities = [
  "Austin",
  "Atlanta",
  "Boston",
  "Chicago",
  "Denver",
  "New York",
  "Orlando",
  "San Francisco",
  "Seattle",
  "Seoul",
];

// Temperature change
function kelvinToFahrenheit(kelvin) {
  var temp = ((kelvin - 273.15) * 9) / 5 + 32;
  return Math.floor(temp, 2);
}

function cityWeatherSearch(citySearchName) {
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    citySearchName +
    "&appid=8293cdf1f821bcf9f4e30739c53476af";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    $("#contentsDescription").text(
      "Weather Description: " + response.weather[0].description.toUpperCase()
    );
    $("#contentsTemperature").text(
      "Current Temperature: " + kelvinToFahrenheit(response.main.temp) + "℉"
    );
    $("#contentsHumidity").text("humidity: " + response.main.humidity + "%");
    $("#contentsWind").text("wind speed: " + response.wind.speed + "MPH");
    // Google maps
    $("#contentsGoogleMaps").removeClass("invisible").addClass("visible");
    initMap(response.coord.lat, response.coord.lon);
    // 5-day Forecast
    $("#contentsForecastTitle").removeClass("invisible").addClass("visible");
    $("#contentsForecast").removeClass("invisible").addClass("visible");
    cityWeather5DaysForecast(response.coord.lat, response.coord.lon);
    cityWeatherUVIndex(response.coord.lat, response.coord.lon);
  });
}

// 5-day Forecast Function
function cityWeather5DaysForecast(lat, lon) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=hourly,minutely&appid=8293cdf1f821bcf9f4e30739c53476af";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    for (i = 0; i < 5; i++) {
      let unix_timestamp = response.daily[i].dt * 1000;
      var date = new Date(unix_timestamp);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var date = date.getDate() + 1;
      var daySecond = month + "/" + date + "/" + year;
      $(`#forecastTitle${i}`).text(daySecond);
      var dailyTemp = response.daily[i].temp.day;
      $(`#forecastTemp${i}`).text(
        "Temp: " + kelvinToFahrenheit(dailyTemp) + "℉"
      );
      var dailyHum = response.daily[i].humidity;
      $(`#forecastHum${i}`).text("Hum: " + dailyHum + "%");
      var dailyWeather = response.daily[i].weather[0].main;
      if (dailyWeather == "Rain") {
        $(`#forecastWeather${i}`).html(
          `<i class="fas fa-cloud-showers-heavy"></i>`
        );
      } else if (dailyWeather == "Clouds") {
        $(`#forecastWeather${i}`).html(`<i class="fas fa-cloud"></i>`);
      } else if (dailyWeather == "Clear") {
        $(`#forecastWeather${i}`).html(`<i class="fas fa-sun"></i>`);
      }
    }
  });
}

function cityWeatherUVIndex(lat, lon) {
  var queryURL =
    "http://api.openweathermap.org/data/2.5/uvi?appid=8293cdf1f821bcf9f4e30739c53476af&lat=" +
    lat +
    "&lon=" +
    lon;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    $("#contentsUVIndex").text("UV Index: " + response.value);
    // UV information color change
    if (response.value < 6) {
      $("#contentsUVIndex").css("background-color", "green");
    } else if (response.value >= 6 && response.value < 8) {
      $("#contentsUVIndex").css("background-color", "yellow");
    } else {
      $("#contentsUVIndex").css("background-color", "red");
    }

    $("#contentsUVIndex").css("border-radius", "3px");
  });
}

function printCityList() {
  // city history list
  var createUlEl = $(`<ul class="list-group">`);
  $("#sidebarHistory").append(createUlEl);
  for (city of cities) {
    createUlEl.append(
      `<li><a href="#" class="sidebarHistoryCities list-group-item">${city}</a></li>`
    );
  }
  // dashboard container title replacement
  $(".sidebarHistoryCities").on("click", function (e) {
    $("#contentsCityName").text($(this)[0].innerText.toUpperCase());
    // change the variable "cityName"
    var citySearchName = $("#contentsCityName")[0].innerHTML;
    cityWeatherSearch(citySearchName);
  });
}

printCityList();

// Google maps
let map;

function initMap(latitude, longitude) {
  var options = {
    zoom: 11,
    center: { lat: latitude, lng: longitude },
  };
  var map = new google.maps.Map(
    document.getElementById("contentsGoogleMaps"),
    options
  );
}

function inputSearchCityWeather() {
  $("#searchCityWeather").on("click", function () {
    $("#contentsCityName").text($("#searchCity").val().toUpperCase());
    cityWeatherSearch($("#searchCity").val());
  });
}

inputSearchCityWeather();
