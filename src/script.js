//Feature #1
let currentTime = new Date();

let h3 = document.querySelector("h3");

let date = currentTime.getDate();

currentTime.getMinutes(); // 0,1,2, 12
currentTime.getHours(); //1, 2, 3, 4
currentTime.getDate(); //1, 2, 3, 4
currentTime.getDay(); // 0, 1, 2
currentTime.getMonth(); // 0, 1, 2
currentTime.getFullYear(); // 2021

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

h3.innerHTML = `${days[currentTime.getDay()]}, ${currentTime.getDate()} ${
  months[currentTime.getMonth()]
} ${currentTime.getFullYear()} / ${currentTime.getHours()}:${currentTime.getMinutes()}`;

//Feature #2

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector(`#city`).innerHTML = response.data.name;
  document.querySelector(`#temperature`).innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector(`#humidity`).innerHTML = response.data.main.humidity;
  document.querySelector(`#wind`).innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "91976109f2a91771f09b69d01c0d52a3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(`#city-input`).value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "91976109f2a91771f09b69d01c0d52a3";
  let units = "metric";
  let apiUrl = `https://api.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 68;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 20;
}

let cityForm = document.querySelector("#search-form");

cityForm.addEventListener("submit", handleSubmit);

//Bonus Feature

let farenheitLink = document.querySelector("#fahrenheit-link");
farenheitLink.addEventListener("click", convertToFarenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function displayTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let place = response.data.name;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `It is currently ${temperature}°C in ${place}!`;
  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "91976109f2a91771f09b69d01c0d52a3";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?&lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}

navigator.geolocation.getCurrentPosition(showPosition);

searchCity("New York");
