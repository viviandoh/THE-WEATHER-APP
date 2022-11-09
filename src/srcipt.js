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
search("Mamprobi");

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let setTemp = document.querySelector("#theCurrentTemp");
  setTemp.innerHTML = `${temperature}`;
  let city = document.querySelector("#search-city");
  city.innerHTML = response.data.name;
  // console.log(response);
  let getHumidity = document.querySelector("#humidity");
  getHumidity.innerHTML = `${response.data.main.humidity}%`;
  let getWind = document.querySelector("#wind");
  getWind.innerHTML = `${response.data.wind.speed}km/h`;
  let getDescription = document.querySelector("#feels-like");
  getDescription.innerHTML = response.data.weather[0].description;
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
