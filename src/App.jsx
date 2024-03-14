import './App.css'
import Search from './components/search/Search'
import { Weather_Api_Url, Weather_Api_key } from './Api'
import { useState } from 'react'
import CurrentWeather from './components/current-weather/Current-Weather'
import Forecast from './components/forecast/Forecast'

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null)

  const handleOnSearchChange = (searchData) =>{
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${Weather_Api_Url}/weather?lat=${lat}&lon=${lon}&appid=${Weather_Api_key}&units=metric`);
    const forecastFetch = fetch(`${Weather_Api_Url}/forecast?lat=${lat}&lon=${lon}&appid=${Weather_Api_key}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        
        setCurrentWeather({city: searchData.label , ...weatherResponse});
        setForecast({city: searchData.label, ...forecastResponse});

      })
      .catch((err) => console.log(err));
  }

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className='container'>
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast}/>}
    </div>
  )
}

export default App
