const apiKey = "5d50cb77a4d850371ce5a430e31c9b24";
const weatherDataEl = document.querySelector(".weather-data");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");
const getWeatherData = async (cityValue) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;
  console.log("city", cityValue);

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    weatherDataEl.querySelector(
      ".icon"
    ).innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">`;
    weatherDataEl.querySelector(
      ".temperature"
    ).textContent = `${data.main.temp} °C`;
    weatherDataEl.querySelector(".description").textContent =
      data.weather[0].description;
    weatherDataEl.querySelector(
      ".details"
    ).innerHTML = `Humidity: ${data.main.humidity}%<br>Wind Speed: ${data.wind.speed} m/s`;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value;
  getWeatherData(cityValue);
});
