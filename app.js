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

function cityWeatherSearch(citySearchName) {
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    citySearchName +
    "&appid=8293cdf1f821bcf9f4e30739c53476af";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response.name);
    // console.log("weather summary: " + response.weather[0].main);
    // console.log("weather description: " + response.weather[0].description);
    // console.log("current temp: " + response.main.temp);
    // console.log("min temp: " + response.main.temp_min);
    // console.log("max temp: " + response.main.temp_max);
    // console.log("humidity: " + response.main.humidity);
    // console.log("pressure: " + response.main.pressure);
    // console.log("wind degree: " + response.wind.deg);
    // console.log("wind speed: " + response.wind.speed);
    // console.log("longitude: " + response.coord.lon);
    // console.log("latitude: " + response.coord.lat);

    $("#contentsDescription").text(
      "Weather Description: " + response.weather[0].description
    );
    $("#contentsTemperature").text(
      "Current Temperature: " + response.main.temp
    );
    $("#contentsHumidity").text("humidity: " + response.main.humidity);
    $("#contentsWind").text("wind speed: " + response.wind.speed);
    // Google maps
    $("#contentsGoogleMaps").removeClass("invisible").addClass("visible");
    initMap(response.coord.lat, response.coord.lon);
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
    $("#contentsCityName").text($(this)[0].innerText);
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
