
import { useEffect, useState, useCallback } from "react"
import { getWindDescription } from "./FilteringWeather"
import { getWindDirection } from "./FilteringWeather"
import { getWeatherIcon } from "./FilteringWeather"
import { getDateFromTimestamp } from "./FilteringWeather"
import "./CragForecast.css"

export const CragForecast = (props) => {
const [daily, setDaily] = useState([])
const [formattedData, setFormattedData] = useState([])

const DailyForecast = (props) => {
 const weather = props.forecast.daily;
 setDaily(weather)
}

useEffect(() => {
    DailyForecast(props)
}, [props]
)


const transformedData = useCallback(() => {
    return daily.map((conditions) => ({
      key: conditions.dt,
      date: getDateFromTimestamp(conditions.dt),
      temp_max: conditions.temp.max,
      temp_min: conditions.temp.min,
      humidity: conditions.humidity,
      description: conditions.weather[0].description,
      wind_direction: getWindDirection(conditions.wind_deg),
      wind_speed: getWindDescription(conditions.wind_speed),
      icon: getWeatherIcon(conditions.weather[0].description)
    }));
  }, [daily, getDateFromTimestamp, getWindDirection, getWindDescription, getWeatherIcon]);


useEffect(() => {
    setFormattedData(transformedData())
     
   }, [transformedData])


console.log(formattedData)
    return <>
    <section className="weekly_forecast">
        {formattedData.slice(0,6).map(
                (day) => {
                    return <div className="forecast" key={`${day.key}`}>
            <div className="icon">{day.icon}</div>
            <div className="weather-details">
            <div className="date">{day.date}</div>
            <div className="description">{day.description}</div>
            <div className="temp_high"> High:{day.temp_max}°F</div>
            <div className="temp_low">Low: {day.temp_min}°F</div>
            <div className="humidity">{day.humidity}% humidity</div>
            <div className="wind">{day.wind_speed} from the {day.wind_direction}</div>
            </div>
            </div>
        }
)}</section>
</>

}