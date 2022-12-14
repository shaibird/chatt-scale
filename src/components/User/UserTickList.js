import { useState, useEffect } from "react"
import { GiMountainClimbing } from "react-icons/gi"
import { UserTickSendForm } from "./UserTickSendForm"

import { Link, useNavigate } from "react-router-dom"
import { UserTickDelete } from "./UserTickDelete"


export const UserTickList = () => {
    const [userTicks, setUserTicks] = useState([])
    const [filteredBoulders, setFilteredBoulders] = useState([])
    const [modal, setModal] = useState(false)

    const localScaleUser = localStorage.getItem("scale_user")
    const scaleUserObject = JSON.parse(localScaleUser)

    const navigate = useNavigate()

    //This fetch gets the user specific tick list based on the user who is logged in. 
    const getAllTicks = () => {

        fetch(`http://localhost:8088/userTickList?user=${scaleUserObject.id}&_expand=boulder&_expand=boulderGrade&_expand=boulderHoldType&_expand=boulderSteep&_expand=crag`)
            .then(response => response.json())
            .then((data) => {
                setUserTicks(data)
            })
    }

    useEffect(
        () => {
            getAllTicks()
        }, [])

    const toggleModal = () => {
        setModal(!modal)
    }

console.log(userTicks)
    return <>
    <div className="profile-panel">
        <article className="userTickList" >
            <header className="profile-header">Tick List</header>
            {userTicks.map(
                (tick) => {
                    return <section className="TickList" key={`Tick--${tick.id}`} id={`${tick.id}`}>
                        <header>
                            {tick.boulder.boulderName}  Grade: {tick.boulderGrade.boulderGrade} Holds: {tick.boulderHoldType.type} <button onClick={() => {
                                setFilteredBoulders(tick);
                                toggleModal()
                            }}><GiMountainClimbing/></button><UserTickDelete tick={tick} getTicks={getAllTicks} />
                        </header>
                    </section>

                }
            )
            }

        </article>
        </div>

        {modal && <UserTickSendForm setModal={setModal} filteredBoulders={filteredBoulders} getTicks={getAllTicks} />}

    </>
}
