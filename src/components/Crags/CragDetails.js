//page for creating the display for crag data
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react"
import { UserSendForm } from './UserSendForm'
import { useNavigate } from 'react-router-dom'
import { ConfirmationOfTick } from './ConfirmationOfTick'
import { GetWeather } from '../weather/GetWeather'
import { CragForecast } from '../weather/CragForecast'
import "./CragDetails.css"


export const CragDetails = () => {
    const { cragId } = useParams()
    const [crags, updateCrag] = useState([])
    const [boulders, setBoulders] = useState([])
    const [cragBoulders, setCragBoulders] = useState([])
    const [boulderGrades, setBoulderGrades] = useState([])
    const [modal, setModal] = useState(false)
    const [filteredBoulders, setFilteredBoulders] = useState([])
    const [tickModal, setTickModal] = useState(false)

    const localScaleUser = localStorage.getItem("scale_user")
    const scaleUserObject = JSON.parse(localScaleUser)
    
    const navigate = useNavigate()

    const [userTick, setUserTick] = useState({})

    const handleSaveButtonClick = (click) => {
        // click.preventDefault()

        console.log(userTick)

        const tickToSend = {
            boulderId: userTick.id,
            boulderName: userTick.boulderName,
            cragId: userTick.cragId,
            sectorId: userTick.sectorId,
            boulderGradeId: userTick.boulderGradeId,
            boulderSteepId: userTick.boulderSteepId,
            boulderHoldTypeId: userTick.boulderHoldTypeId,
            userId: scaleUserObject.id

        }

        fetch(`http://localhost:8088/userTickList`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tickToSend)
        })
            .then(response => response.json())
            .then(() => {
                toggleTickModal()


            })
    }


    useEffect(
        () => {
            fetch(`http://localhost:8088/crags?id=${cragId}&_embed=boulders`)
                .then(response => response.json())
                .then((data) => {
                    updateCrag(data[0])
                })
        },
        [cragId]
    )

    useEffect(
        () => {
            if (userTick.cragId) {handleSaveButtonClick()}
            else {console.log("whoops!")}
        },
        [userTick]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/boulders?_expand=boulderGrade&_expand=boulderHoldType`)
                .then(response => response.json())
                .then((boulderArray) => {
                    setBoulders(boulderArray)
                })
        },
        []
    )

        //This works because we are just creating a new set of data that matched boulders to a crag.
        //then the boulders that are matched with the crag are rendered. 
    useEffect(
        () => {
            const matchedBoulders = boulders.filter(boulder => boulder.cragId === crags.id)
            setCragBoulders(matchedBoulders)
        },
        [boulders]
    )


    const toggleModal = () => {
        setModal(!modal)
    }

    const toggleTickModal = () => {
        setTickModal(!modal)
    }

console.log(cragBoulders)
    return <>
        <article className="boulders" >
            <div className="boulderfield-details">
                <header className="CragName">{crags.cragName}</header>
                <div className="location">{crags.city}, {crags.state}</div>
                <div className="crag-description"><div className="details-header">Description:</div> {crags.description}</div>
                <div className="crag-access"><div className="details-header">Access:</div>{crags.access}</div>
                </div>
            <GetWeather crags={crags}/>
            <div className="boulder-panel">
            {
                cragBoulders.map(
                    (boulder) => {
                        return <section className="boulder" key={`boulder--${boulder.id}`} id={`${boulder.id}`}>
                            <div className="Grade">{boulder.boulderGrade.boulderGrade}</div>
                            <div className="Name">{boulder.boulderName}</div>
                            <div className="buttons"><button className="details-tick" onClick={() => {
                                setUserTick(boulder)
                                toggleTickModal()
                                }}>Add to Tick List</button> <button className="details-send" onClick={() => {
                                setFilteredBoulders(boulder);
                                toggleModal()
                            }}>Log Send</button></div>
                        </section>
                    }
                )
            }
            </div>
        </article>

        {tickModal && <ConfirmationOfTick setTickModal={setTickModal} setTick={userTick}/> }
        {modal && <UserSendForm setModal={setModal} filteredBoulders={filteredBoulders} />}
    </>

}

