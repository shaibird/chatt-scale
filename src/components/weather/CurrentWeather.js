import { useState, useEffect } from "react";    
import { getWindDescription } from "./FilteringWeather"
import { getWindDirection } from "./FilteringWeather";
import { getWeatherIcon } from "./FilteringWeather"
import { getDateFromTimestamp } from "./FilteringWeather"
import axios from 'axios';
import './CragForecast.css'

export const CurrentWeather = (props) => {
    const [windSpeed, setWindSpeed] = useState()
    const [windDirection, setWindDirection] = useState()
    const [icon, setIcon] = useState()
    const [date, setDate] = useState()
    const [forecast, setForecast] = useState(null);
    const [tomorrowWindSpeed, setTomorrowWindSpeed ] = useState()
    const [tomorrowWindDirection, setTomorrowWindDirection ] = useState()
    const [tomorrowIcon, setTomorrowIcon ] = useState()
    const [tomorrowDate, setTomorrowDate ] = useState()
   



    const api_key = 

    useEffect(() => {
        if (forecast) {
          setWindDirection(getWindDirection(forecast.current.wind_deg));
          setWindSpeed(getWindDescription(forecast.current.wind_speed));
          setIcon(getWeatherIcon(forecast.current.weather[0].description));
          setDate(getDateFromTimestamp(forecast.current.dt));
          setTomorrowWindSpeed(getWindDescription(forecast.daily[1].wind_speed))
          setTomorrowWindDirection(getWindDirection(forecast.daily[1].wind_deg))
          setTomorrowIcon(getWeatherIcon(forecast.daily[1].weather[0].description))
          setTomorrowDate(getDateFromTimestamp(forecast.daily[1].dt))
        }
      }, [forecast]);

    useEffect(() => {
      async function getForecast() {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${props.latitude}&lon=${props.longitude}&units=imperial&appid=${api_key}`
        );
        setForecast(data);
      }
      getForecast();
    }, [props.latitude, props.longitude]);
  
    if (!forecast) {
      return <div className="loading">.</div>;
    }
console.log(forecast)
    return (
        <div className="weather-panel">
        <div className="today">
        <div className="weather-icon">{icon}</div>
        <div className="date">Current Weather</div>         
         <div className="popup">Description: {forecast.current.weather[0].description}</div>
          <div className="popup">Temperature: {forecast.current.temp} °F</div>
          <div className="popup">Humidity: {forecast.current.humidity}%</div>
          <div className="popup">{windSpeed} from the {windDirection}</div>
          </div>
        <div className="tomorrow">
        <div className="weather-icon">{tomorrowIcon}</div>
        <div className="date">Tomorrow</div>         
         <div className="popup">Description: {forecast.daily[1].weather[0].description}</div>
          <div className="popup">High: {forecast.daily[1].temp.max} °F</div>
          <div className="popup">Low: {forecast.daily[1].temp.min} °F</div>
          <div className="popup">Humidity: {forecast.daily[1].humidity}%</div>
          <div className="popup">{tomorrowWindSpeed} from the {tomorrowWindDirection}</div>
          </div>
        </div>
      )
    }
