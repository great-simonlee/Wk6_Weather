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

var cityName = cities[cities.length - 1];

function cityWeatherSearch() {
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=8293cdf1f821bcf9f4e30739c53476af";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // console.log(response);
  });
}

function printCityList() {
  var createUlEl = $(`<ul class="list-group">`);

  $("#sidebarHistory").append(createUlEl);

  for (city of cities) {
    createUlEl.append(
      `<li><a href="#" class="sidebarHistoryCities list-group-item">${city}</a></li>`
    );
  }

  $(".sidebarHistoryCities").on("click", function (e) {
    $("#contentsWeatherInfo").text($(this)[0].innerText);
  });
}

function searchCityWeather() {}

cityWeatherSearch();
searchCityWeather();
printCityList();
