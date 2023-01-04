import { Link } from 'react-router-dom'
import "../Map/MapDisplay.css"

export const Crag = ({id, cragName, state, country, description, boulderId }) => {
    return <section className="crag" key={`crag--${id}`}>
        <div className="each-crag">
            <Link to={`/crags/${id}`}>{cragName}</Link>
        </div>
    </section>
}