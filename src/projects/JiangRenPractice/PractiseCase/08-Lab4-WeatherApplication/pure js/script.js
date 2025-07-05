// Weather App JavaScript

// API key for OpenWeatherMap (you'll need to replace this with your own)
const API_KEY = '5d50cb77a4d850371ce5a430e31c9b24'; // Replace with your actual API key
const DEFAULT_CITY = 'Sydney';

// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const weatherCondition = document.getElementById('weather-condition');
const weatherIcon = document.getElementById('weather-icon');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const forecastContainer = document.getElementById('forecast-container');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  updateDateTime();
  getWeatherData(DEFAULT_CITY);
  
  // Update time every minute
  setInterval(updateDateTime, 60000);
});

searchBtn.addEventListener('click', () => {
  const city = searchInput.value.trim();
  if (city) {
    getWeatherData(city);
  }
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const city = searchInput.value.trim();
    if (city) {
      getWeatherData(city);
    }
  }
});

// Functions
function updateDateTime() {
  const now = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  dateElement.textContent = now.toLocaleDateString('en-US', options);
}

async function getWeatherData(city) {
  try {
    // Current weather
    const currentResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!currentResponse.ok) {
      throw new Error('City not found');
    }
    
    const currentData = await currentResponse.json();
    
    // Forecast
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!forecastResponse.ok) {
      throw new Error('Forecast data not available');
    }
    
    const forecastData = await forecastResponse.json();
    
    // Update UI
    updateCurrentWeather(currentData);
    updateForecast(forecastData);
    
  } catch (error) {
    alert(error.message);
  }
}

function updateCurrentWeather(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  tempElement.textContent = `${Math.round(data.main.temp)}°C`;
  weatherCondition.textContent = data.weather[0].main;
  feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
  humidity.textContent = `${data.main.humidity}%`;
  windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`; // Convert m/s to km/h
  
  // Update weather icon
  updateWeatherIcon(data.weather[0].id);
}

function updateWeatherIcon(weatherId) {
  let iconClass = 'fas fa-cloud';
  
  if (weatherId >= 200 && weatherId < 300) {
    iconClass = 'fas fa-bolt'; // Thunderstorm
  } else if (weatherId >= 300 && weatherId < 400) {
    iconClass = 'fas fa-cloud-rain'; // Drizzle
  } else if (weatherId >= 500 && weatherId < 600) {
    iconClass = 'fas fa-cloud-showers-heavy'; // Rain
  } else if (weatherId >= 600 && weatherId < 700) {
    iconClass = 'fas fa-snowflake'; // Snow
  } else if (weatherId >= 700 && weatherId < 800) {
    iconClass = 'fas fa-smog'; // Atmosphere
  } else if (weatherId === 800) {
    iconClass = 'fas fa-sun'; // Clear
  } else if (weatherId > 800) {
    iconClass = 'fas fa-cloud'; // Clouds
  }
  
  weatherIcon.className = iconClass;
}

function updateForecast(data) {
  forecastContainer.innerHTML = '';
  
  // Filter the forecast for the next 5 days (at noon)
  const forecastDays = [];
  const today = new Date().setHours(0, 0, 0, 0);
  
  for (const item of data.list) {
    const date = new Date(item.dt * 1000);
    const day = date.setHours(0, 0, 0, 0);
    
    // Check if this is a new day and we haven't got 5 days yet
    if (day > today && !forecastDays.some(d => d.getTime() === day) && forecastDays.length < 5) {
      forecastDays.push(new Date(day));
      
      // Find forecast closest to noon for this day
      const noonForecast = data.list.find(f => {
        const fDate = new Date(f.dt * 1000);
        return fDate.setHours(0, 0, 0, 0) === day &&
               fDate.getHours() >= 11 && fDate.getHours() <= 13;
      }) || item; // fallback to the current item if noon forecast not found
      
      // Create forecast item
      createForecastItem(noonForecast);
    }
  }
}

function createForecastItem(item) {
  const date = new Date(item.dt * 1000);
  const day = date.toLocaleDateString('en-US', { weekday: 'short' });
  
  const forecastItem = document.createElement('div');
  forecastItem.className = 'forecast-item';
  
  const dayElement = document.createElement('p');
  dayElement.className = 'day';
  dayElement.textContent = day;
  
  const iconElement = document.createElement('i');
  // Set icon based on weather id
  const weatherId = item.weather[0].id;
  let iconClass = 'fas fa-cloud';
  
  if (weatherId >= 200 && weatherId < 300) {
    iconClass = 'fas fa-bolt';
  } else if (weatherId >= 300 && weatherId < 400) {
    iconClass = 'fas fa-cloud-rain';
  } else if (weatherId >= 500 && weatherId < 600) {
    iconClass = 'fas fa-cloud-showers-heavy';
  } else if (weatherId >= 600 && weatherId < 700) {
    iconClass = 'fas fa-snowflake';
  } else if (weatherId >= 700 && weatherId < 800) {
    iconClass = 'fas fa-smog';
  } else if (weatherId === 800) {
    iconClass = 'fas fa-sun';
  } else if (weatherId > 800) {
    iconClass = 'fas fa-cloud';
  }
  
  iconElement.className = iconClass;
  
  const tempElement = document.createElement('p');
  tempElement.className = 'temp';
  tempElement.textContent = `${Math.round(item.main.temp)}°C`;
  
  forecastItem.appendChild(dayElement);
  forecastItem.appendChild(iconElement);
  forecastItem.appendChild(tempElement);
  
  forecastContainer.appendChild(forecastItem);
}

// Initialize with default data in case API is not available
function initializeWithDefaultData() {
  cityName.textContent = 'Sydney, AU';
  tempElement.textContent = '28°C';
  weatherCondition.textContent = 'Sunny';
  feelsLike.textContent = '30°C';
  humidity.textContent = '65%';
  windSpeed.textContent = '18 km/h';
  weatherIcon.className = 'fas fa-sun';
  
  // Create default forecast
  forecastContainer.innerHTML = '';
  const days = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const icons = ['fas fa-sun', 'fas fa-cloud', 'fas fa-cloud-rain', 'fas fa-cloud', 'fas fa-sun'];
  const temps = [29, 27, 24, 26, 30];
  
  for (let i = 0; i < 5; i++) {
    const forecastItem = document.createElement('div');
    forecastItem.className = 'forecast-item';
    
    forecastItem.innerHTML = `
      <p class="day">${days[i]}</p>
      <i class="${icons[i]}"></i>
      <p class="temp">${temps[i]}°C</p>
    `;
    
    forecastContainer.appendChild(forecastItem);
  }
}

// If API key is not provided, use default data
if (API_KEY === 'YOUR_API_KEY') {
  initializeWithDefaultData();
}
