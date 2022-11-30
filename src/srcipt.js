function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  forecastHTML = `<div class= "row">`;
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
      <img class="emoji" src="images/cloudy1.png" alt="cloud" />
      <br />
      <span class="forecast-maximum-temp">29°C </span> <br />
      <span class="forecast-minimum-temp">19°C </span> <br />
      <span class="weather-forecast-day">${day}</span>
    </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(city) {
  let apiKey = "c8735bb7e8e2f8d8a38c7501f3cd47d3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  if (city.length === 0) {
    alert("Please enter a city");
  }
  search(city);
}

function getForecast(coordinates) {
  // console.log(coordinates);
  let apiKey = "b40b135798f82a05aed08769f9275f50";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let temperature = document.querySelector("#theCurrentTemp");
  let city = document.querySelector("#search-city");
  let getHumidity = document.querySelector("#humidity");
  let getWind = document.querySelector("#wind");
  let getDescription = document.querySelector("#feels-like");
  let iconElement = document.querySelector("#icon");
  let paragraph = document.querySelector("#forecastP");

  celciusTemperature = response.data.main.temp;

  temperature.innerHTML = Math.round(celciusTemperature);
  city.innerHTML = response.data.name;
  paragraph.innerHTML = `${response.data.name} in the next 5 days`;
  // console.log(response);
  getHumidity.innerHTML = `${response.data.main.humidity}%`;
  getWind.innerHTML = `${response.data.wind.speed}km/h`;
  getDescription.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

let searchCityForm = document.querySelector("#search-form");
searchCityForm.addEventListener("submit", handleSubmit);

function showCurrentTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "17ad6e67aa629189f73b053634668b20";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

function showCurrent(event) {
  navigator.geolocation.getCurrentPosition(showCurrentTemp);
  event.preventDefault();
}
function convertToFarenheit(event) {
  event.preventDefault();
  let Farenheit = (celciusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#theCurrentTemp");
  temperatureElement.innerHTML = Math.round(Farenheit);
}

function convertToCelcious(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#theCurrentTemp");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", showCurrent);

let farenheitLink = document.querySelector("#farenheit-id");
farenheitLink.addEventListener("click", convertToFarenheit);

let celciousLink = document.querySelector("#celcious-id");
celciousLink.addEventListener("click", convertToCelcious);
//  set global variable
let celciusTemperature = null;

search("Hohoe");
