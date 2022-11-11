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
search("Hohoe");

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let setTemp = document.querySelector("#theCurrentTemp");
  let city = document.querySelector("#search-city");
  let getHumidity = document.querySelector("#humidity");
  let getWind = document.querySelector("#wind");
  let getDescription = document.querySelector("#feels-like");
  let iconElement = document.querySelector("#icon");

  setTemp.innerHTML = `${temperature}`;
  city.innerHTML = response.data.name;
  // console.log(response);
  getHumidity.innerHTML = `${response.data.main.humidity}%`;
  getWind.innerHTML = `${response.data.wind.speed}km/h`;
  getDescription.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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

let button = document.querySelector("#current-location-button");
button.addEventListener("click", showCurrent);
