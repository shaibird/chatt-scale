import { useEffect, useState, Component } from "react"
import { CragForecast } from "./CragForecast"


import axios from 'axios';

export const GetWeather = (props) => {
  const [forecast, setForecast] = useState(null);

  const api_key = "725b7899469aa9a7c3fdb66722cc4b3a"

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
    return <div>Loading forecast...</div>;
  }


  return (
    <div className="Weather-forecast">
    <CragForecast forecast={forecast} />
    </div>
  );
}
