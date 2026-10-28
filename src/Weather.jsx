import { useState, useEffect } from 'react';
import axios from 'axios';


function getWeatherDescription(code) {
  if (code === 0) return { icon: '☀️', description: 'Clear skies' };
  if (code <= 3) return { icon: '⛅', description: 'Partly cloudy' };
  if (code <= 48) return { icon: '🌫️', description: 'Foggy' };
  if (code <= 67) return { icon: '🌧️', description: 'Rainy' };
  if (code <= 77) return { icon: '❄️', description: 'Snowy' };
  if (code <= 82) return { icon: '🌦️', description: 'Showers' };
  if (code <= 86) return { icon: '❄️', description: 'Snow showers' };
  if (code >= 95) return { icon: '⛈️', description: 'Thunderstorms' };

  return { icon: '🌤️', description: 'Current conditions' };
}

function Weather() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: 32.7157,
        longitude: -117.1611,
        current: 'temperature_2m,apparent_temperature,weather_code',
        temperature_unit: 'fahrenheit',
        timezone: 'America/Los_Angeles'
      }
    })
      .then((response) => {
        setWeather(response.data.current);
      })
      .catch((error) => {
        console.error('Weather API error:', error);
      });
  }, []);

  const conditions = weather
  ? getWeatherDescription(weather.weather_code)
  : null;

  return (
     <div className="weather-widget">
      {weather ? (
        <div>
          <div className="weather-main">
             <span className="weather-icon">{conditions.icon}</span>
             <span className="weather-temperature">
                {Math.round(weather.temperature_2m)}°F
             </span>
           </div>

           <div className="weather-description">
              {conditions.description} in San Diego
           </div>
          </div>
        ) : (
          <p>Loading weather...</p>
        )}
      </div>
    );
}

export default Weather;