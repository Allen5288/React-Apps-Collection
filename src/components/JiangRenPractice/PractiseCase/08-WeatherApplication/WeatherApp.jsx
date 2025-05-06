import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Box, Typography } from "@mui/material";
import "./WeatherApp.scss";

function WeatherApp() {
  const apiKey = "5d50cb77a4d850371ce5a430e31c9b24";
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({
    icon: "",
    temperature: "",
    description: "",
    humidity: "",
    windSpeed: "",
    error: null,
    isLoading: false,
  });

  const getWeatherData = async (cityValue) => {
    if (!cityValue) return;

    setWeatherData((prev) => ({ ...prev, isLoading: true, error: null }));
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();

      setWeatherData({
        icon: data.weather[0].icon,
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData((prev) => ({
        ...prev,
        error: error.message,
        isLoading: false,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getWeatherData(city);
  };

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        component="h1"
        align="center"
        className="weather-app-title"
        gutterBottom
      >
        Weather Application
      </Typography>

      <div id="weather-app-container">
        <h1>Weather Application</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="city-input"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input type="submit" value="Get Weather" id="submit-button" />
        </form>
        <ul className="weather-data">
          <li className="icon">
            {weatherData.icon && (
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                alt={weatherData.description}
              />
            )}
          </li>
          <li className="temperature">
            {weatherData.temperature && `${weatherData.temperature} °C`}
          </li>
          <li className="description">{weatherData.description}</li>
          <li className="details">
            {weatherData.humidity && (
              <>
                Humidity: {weatherData.humidity}%
                <br />
                Wind Speed: {weatherData.windSpeed} m/s
              </>
            )}
          </li>
          {weatherData.error && <li className="error">{weatherData.error}</li>}
        </ul>
      </div>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          component={Link}
          to="/jiangRenPractice"
          variant="contained"
          color="primary"
        >
          Back to Practice Home
        </Button>
      </Box>
    </Container>
  );
}

export default WeatherApp;
