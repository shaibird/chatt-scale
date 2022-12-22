import { Link } from "react-router-dom"
import { GetWeather } from "../weather/GetWeather"
import './Map.css'

export const MapPopUp = ({crag}) => {
return <section className="popup-crag" key={`crag--${crag.id}`}>
<div>
    <Link to={`/crags/${crag.id}`}>{crag.cragName}</Link>
</div>
{/* <GetWeather crag={crag}/> */}
</section>
}
