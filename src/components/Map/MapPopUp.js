import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import './Map.css'
import { CurrentWeather } from "../weather/CurrentWeather"

export const MapPopUp = (props) => {
    // const [latitude, setLatitude] = useState(0)
    // const [longitude, setLongitude] = useState(0)

    // useEffect(() => {
    //     if (props.crag) {
    //       setLatitude(props.crag.lat);
    //       setLongitude(props.crag.lon);
    //     }
    //   }, [props.crag]);

    //   console.log(props.crag.lat)
    //   console.log(latitude)
console.log(props.crag.lat)
return <section className="popup-crag" key={`crag--${props.crag.id}`}>
<div className="popup-panel">
    <Link to={`/crags/${props.crag.id}`}>{props.crag.cragName}</Link>
<div className="weather-weather">
    <CurrentWeather latitude={props.crag.lat} longitude={props.crag.lon}/>
</div></div>
</section>
}
