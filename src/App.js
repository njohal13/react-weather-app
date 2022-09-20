import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import { WEATHER_API_URL, WEATHER_API_KEY} from './api';
import { useState } from 'react';



function App() {

  //usestate hooks
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    //console.log(searchData);
    //location info
    const [lat, lon] = searchData.value.split(' ');
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch,forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city:searchData.label, ...weatherResponse});
        setForecast({ city:searchData.label, ...forecastResponse});
      })
      .catch((err) => console.log(err));
}
//check
  console.log(currentWeather);
  console.log(forecast);


  return (
    <div className='container'>
      <Search onSearchChange={handleOnSearchChange}/>
      {/* Load weather if it exists w/ &&. Then pass in {data} into currentWeather() in current-weather.js */}
      {currentWeather && <CurrentWeather data={currentWeather}/>}
      {forecast && <Forecast data={forecast}/>}
    </div>
    
  );
}

export default App;
