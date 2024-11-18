import { useState } from "react";


const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] =useState(null);
    const [error, setError] = useState('');

    const featchWeather = async () =>{
        setError('');
        const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
        const url =`https://api.weatherapi.com/v1/current.json?key=9a924cac310c4619bfa94129241411&q=${city}`;

        try{
            const res = await fetch(url);
            if(!res.ok){
                throw new Error('city not Found');
            }
            const data = await res.json();
            setWeatherData(data);
        } catch (err) {
            setError("could't fetch data.");
            setWeatherData(null);
        }
    };
    const handleInputChange = (e) => {
        setCity(e.target.value);
    };
    const handleFormeSubmit = (e) => {
        e.preventDefault();
        featchWeather();
    };

    return ( 
        <div>
      <h1>Weather Forecast</h1>
      <form onSubmit={handleFormeSubmit}>
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        placeholder="Enter city name"
      />
      <button onClick={featchWeather}>Get Weather</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weatherData && (
        <div className="recData">
          <h2>Weather in {weatherData.location.name}</h2>
          <p>Temperature: {weatherData.current.temp_c} °C</p>
          <p>Humidity: {weatherData.current.temp_f}%</p>
          <p>Local Time: {weatherData.location.localtime}</p>
          <p>Condition: {weatherData.current.condition[2]}</p>
        </div>
      )}
    </div>
     );
};
 
export default Weather;