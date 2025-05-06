import React, { useState } from 'react';
import axios from 'axios';
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  let api_key = 'dd5d32c26faa45e5a3d113958250605';

  const handleSearch = async () => {
    if (!city) return;
    setWeatherData(null);
    setLoading(true);
    setMsg("Loading data…");
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`
      );
      setWeatherData(response.data);
      setLoading(false);
      setMsg("");
    
    } catch (err) {
      setWeatherData(null);
      setLoading(true);
      setMsg("Loading data…");
      alert( "Failed to fetch weather data");
    }
    
  };

  //console.log(weatherData);

  return (
    <div className="weather-container">
      <div className="search-container">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>{msg}</p>}

      {weatherData && (
        <div className="weather-cards">
          <div className='weather-card'>
            <h2>Termpreture</h2>
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <div className='weather-card'>
            <h2>Humidity</h2>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className='weather-card'>
            <h2>Condition</h2>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className='weather-card'>
            <h2>Wind Speed</h2>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
