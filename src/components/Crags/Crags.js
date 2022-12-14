import { Link } from 'react-router-dom'

export const Crag = ({id, cragName, state, country, description, boulderId }) => {
    return <section className="crag" key={`crag--${id}`}>
        <div>
            <Link to={`/crags/${id}`}>{cragName}</Link>
        </div>
    </section>
}