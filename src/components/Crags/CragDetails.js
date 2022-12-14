//page for creating the display for crag data
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react"
import { UserSendForm } from './UserSendForm'
import { useNavigate } from 'react-router-dom'


export const CragDetails = () => {
    const { cragId } = useParams()
    const [crags, updateCrag] = useState({})
    const [boulders, setBoulders] = useState([])
    const [cragBoulders, setCragBoulders] = useState([])
    const [boulderGrades, setBoulderGrades] = useState([])
    const [modal, setModal] = useState(false)
    const [filteredBoulders, setFilteredBoulders] = useState({})

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
                navigate("/crags")


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

    

    return <>
        <article className="boulders" >
            <header>{crags.cragName}</header>
            {
                cragBoulders.map(
                    (boulder) => {
                        return <section className="boulder" key={`boulder--${boulder.id}`} id={`${boulder.id}`}>
                            <header>{boulder.boulderName}<button onClick={() => {
                                setUserTick(boulder)
                                }}>Add to Tick List</button> <button onClick={() => {
                                setFilteredBoulders(boulder);
                                toggleModal()
                            }}>Log Send</button></header>
                        </section>
                    }
                )
            }
        </article>

        {modal && <UserSendForm setModal={setModal} filteredBoulders={filteredBoulders} />}
    </>

}




//once the crag is clicked on the main crags page, then this page will render. Here, we need the boulders in each crag to display
//need to match 

//use params to grb boulderId or pass props 
//create new modula popup.js jsk pass the id as a prop. on click pop up, render the element . event.target.value. make a form, try and making it popup when clicked. 