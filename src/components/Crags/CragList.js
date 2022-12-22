import { useEffect, useState } from "react"
import { MapDisplay } from "../Map/MapDisplay"
import { Crag } from "./Crags"
import '../Map/MapDisplay.css'

export const CragList = ({ searchTermState }) => {
    const [crags, setCrags] = useState([])
    const [filteredCrags, setFilteredCrags] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/crags?&_embed=boulders`)
            .then(response => response.json())
            .then((cragArray) => {
                setCrags(cragArray)
            })
        },
        []
    )

    useEffect(
        () => {
            const searchedBoulders = crags.filter(crag => crag.cragName.startsWith(searchTermState))
            setFilteredCrags(searchedBoulders)
        },
        [searchTermState]
    )

        console.log(crags)
    return <article className="crags">

   <div className = "crag-container">
        {
            crags.map(crag => <Crag key={`crag--${crag.id}`}
                    id={crag.id} cragName={crag.cragName} />)
                    
        }        
        </div>

    </article>
    
}