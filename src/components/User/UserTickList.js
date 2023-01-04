import { useState, useEffect } from "react"
import { GiMountainClimbing } from "react-icons/gi"
import { UserTickSendForm } from "./UserTickSendForm"

import { Link, useNavigate } from "react-router-dom"
import { UserTickDelete } from "./UserTickDelete"


export const UserTickList = ({getSends}) => {
    const [userTicks, setUserTicks] = useState([])
    const [filteredBoulders, setFilteredBoulders] = useState([])
    const [modal, setModal] = useState(false)
    const [filtered, setFiltered] = useState([])

    const localScaleUser = localStorage.getItem("scale_user")
    const scaleUserObject = JSON.parse(localScaleUser)

    const navigate = useNavigate()

    //This fetch gets the user specific tick list based on the user who is logged in. 
    const getAllTicks = () => {

        fetch(`http://localhost:8088/userTickList?user&_expand=boulder&_expand=boulderGrade&_expand=boulderHoldType&_expand=boulderSteep&_expand=crag`)
            .then(response => response.json())
            .then((data) => {
                setUserTicks(data)
            })
    }

    useEffect(
        () => {
            getAllTicks()
        }, [])

        useEffect(
            () => {
                const mySends = userTicks.filter(tick => tick.userId === scaleUserObject.id)
                setFiltered(mySends)
            }, [userTicks]
        )
    
    const toggleModal = () => {
        setModal(!modal)
    }

console.log(filtered)
    return <>
    <div className="profile-panel">
        <article className="userTickList" >
            <header className="profile-header">Tick List</header>
            {filtered.map(
                (tick) => {
                    return <section className="TickList" key={`Tick--${tick.id}`} id={`${tick.id}`}>
                        <header className="tick">
                            <div className="details"><div className="Name"> {tick.boulder.boulderName}</div>
                            <div className="boulder-crag">{tick.crag.cragName}</div>  
                            <div className="second"><div className="grade">{tick.boulderGrade.boulderGrade}</div><div className="description">{tick.boulderHoldType.type} </div> <div className="tick-buttons"><button className="log" onClick={() => {
                                setFilteredBoulders(tick);
                                toggleModal()
                            }}>Log Ascent</button><UserTickDelete tick={tick} getTicks={getAllTicks} /></div></div></div>
                        </header>
                    </section>

                }
            )
            }

        </article>
        </div>

        {modal && <UserTickSendForm setModal={setModal} filteredBoulders={filteredBoulders} getTicks={getAllTicks} getSends={getSends}/>}

    </>
}
