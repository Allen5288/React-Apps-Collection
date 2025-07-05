import {
  Air,
  CloudQueue,
  Water,
  WaterDrop,
  WbSunny,
} from "@mui/icons-material";

const WeatherType = {
  SUNNY: "sunny",
  CLOUDY: "cloudy",
  RAINY: "water",
  WIND: "wind",
};

const getWeatherIcon = (size = 24, color = "#fff") => {
  return {
    [WeatherType.SUNNY]: <WbSunny style={{ fontSize: size, color }} />,
    [WeatherType.CLOUDY]: <CloudQueue style={{ fontSize: size, color }} />,
    [WeatherType.RAINY]: <Water style={{ fontSize: size, color }} />,
    [WeatherType.WIND]: <Air style={{ fontSize: size, color }} />,
  };
};
const weatherMap = getWeatherIcon();

const sampleData = {
  currentCity: {
    date: "23 July, Sunday 12:00",
    city: "Sydney",
    minTemp: "28",
    maxTemp: "32",
    weather: WeatherType.SUNNY,
    water: "85%",
    wind: "9km/h",
    uv: "75ug",
    something: "26",
  },
  forecast: [
    {
      day: "Monday",
      date: "24 July",
      weather: [WeatherType.CLOUDY],
      minTemp: "20",
      maxTemp: "25",
    },
    {
      day: "Monday",
      date: "24 July",
      weather: [WeatherType.CLOUDY],
      minTemp: "20",
      maxTemp: "25",
    },
    {
      day: "Monday",
      date: "24 July",
      weather: [WeatherType.CLOUDY],
      minTemp: "20",
      maxTemp: "25",
    },
    {
      day: "Monday",
      date: "24 July",
      weather: [WeatherType.CLOUDY],
      minTemp: "20",
      maxTemp: "25",
    },
  ],
  otherCities: [
    {
      city: "Melbourne",
      weather: WeatherType.SUNNY,
      minTemp: "25",
      maxTemp: "32",
    },
    {
      city: "Melbourne",
      weather: WeatherType.SUNNY,
      minTemp: "25",
      maxTemp: "32",
    },
    {
      city: "Melbourne",
      weather: WeatherType.SUNNY,
      minTemp: "25",
      maxTemp: "32",
    },
    {
      city: "Melbourne",
      weather: WeatherType.SUNNY,
      minTemp: "25",
      maxTemp: "32",
    },
  ],
};
const WeatherHome = () => {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex gap-2 p-5" style={{ backgroundColor: "#F2F2FC" }}>
        <div
          style={{ backgroundColor: "#4382F7" }}
          className="rounded-xl text-white p-5"
        >
          <p className="text-xs">{sampleData.currentCity.date}</p>
          <p className="text-center text-2xl py-5">
            {sampleData.currentCity.city}
          </p>
          <p className="text-center text-6xl">
            {sampleData.currentCity.maxTemp}
          </p>
          <p className="text-center stext-xs">
            {sampleData.currentCity.minTemp +
              "~" +
              sampleData.currentCity.maxTemp}
          </p>
          <p className="text-center pt-5 pb-7">
            {getWeatherIcon(95, "#fff")[sampleData.currentCity.weather]}
          </p>
          <div className="flex justify-center bg-white text-black gap-2 p-3 rounded-lg">
            <div>
              <WaterDrop style={{ fontSize: 24, color: "#000" }} />
              <p>{sampleData.currentCity.water}</p>
            </div>
            <div>
              <Air style={{ fontSize: 24, color: "#000" }} />
              <p>{sampleData.currentCity.wind}</p>
            </div>
            <div>
              <WbSunny style={{ fontSize: 24, color: "#000" }} />
              <p>{sampleData.currentCity.uv}</p>
            </div>
            <div>
              <Water style={{ fontSize: 24, color: "#000" }} />
              <p>{sampleData.currentCity.something}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-5">
            {sampleData.forecast.map((day, index) => (
              <div key={index} className="text-center">
                <p className="font-bold">{day.day}</p>
                <p className="text-xs">{day.date}</p>
                <p className="mt-4">
                  {getWeatherIcon(100, "#000")[day.weather]}
                </p>
                <p className="text-xs">{day.minTemp + "~" + day.maxTemp}</p>
              </div>
            ))}
          </div>
          <div className="mt-24">
            <div className="mb-5 relative" style={{ width: "60%" }}>
              <input
                type="text"
                placeholder="Search for a city"
                className="input-default"
              />
              <button type="button" className="button-default">
                Search
              </button>
            </div>
            <div className="flex gap-5 text-white">
              {sampleData.otherCities.map((city, index) => (
                <div
                  key={city.city + index}
                  className="rounded-xl p-3 text-center"
                  style={{ backgroundColor: "#4382F7" }}
                >
                  <p>{city.city}</p>
                  <p className="font-bold">{weatherMap[city.weather]}</p>
                  <p className="text-xs">{city.minTemp + "~" + city.maxTemp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WeatherHome;
