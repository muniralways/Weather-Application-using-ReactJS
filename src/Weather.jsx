import React, { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "1c1859579706509017feb12de7729377";

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      const result = await response.json();

      console.log(data);
      

      if (result.cod === "404") {
        setError("City Not Found!");
        setData(null);
      } else {
        setData(result);
        setError("");
      }
    } catch (err) {
      setError("Something went wrong!");
      setData(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchWeather();


  };

  return (
    <div className="weather-container">
      <h1 className="weather-heading">🌤 Weather App</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {data && (
        <div className="weather-card">
          <h2>
            {data.name}, {data.sys.country}
          </h2>
          <h3>{data.main.temp}°C</h3>
          <p>{data.weather[0].main}</p>
          <p>Humidity: {data.main.humidity}%</p>
          <p>Wind: {data.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
