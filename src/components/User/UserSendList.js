import { useState, useEffect } from "react"
import { BsTrash } from 'react-icons/bs'
import { Link, useNavigate } from "react-router-dom"
import { UserDeleteButton } from "./UserDeleteButton"
import { UserSendEdits } from "./UserSendEdit"
import './Profile.css'


export const UserSendList = ({ userSends, getSends }) => {
    const [allBoulders, setAllBoulders] = useState([])
    const [filtered, setFiltered] = useState([])
    const [modal, setModal] = useState(false)
    const [filteredSend, setFilteredSend] = useState([])

    const localScaleUser = localStorage.getItem("scale_user")
    const scaleUserObject = JSON.parse(localScaleUser)

    const navigate = useNavigate()


    //This fetch gets the user specific send list based on the user who is logged in. 


    useEffect(
        () => {
            getSends()

            fetch(`http://localhost:8088/crags`)
                .then(response => response.json())
                .then((boulderArray) => {
                    setAllBoulders(boulderArray)
                })
        },
        []
    )

    useEffect(
        () => {
            const mySends = userSends.filter(send => send.userId === scaleUserObject.id)
            setFiltered(mySends)
        }, [userSends]
    )
    const toggleModal = () => {
        setModal(!modal)
    }

// matching the ids in the send list, to the actual boulder so we can display the boulder information
// not getting all of the boulders in the list. It's stopping after the first match. 

return <>
    <div className="profile-panel">
        <article className="userSendList" >
            <header className="profile-header">Ascents</header>
            <div className="panel-features">
                {filtered.map(
                    (send) => {
                        return <section className="ascents" key={`ascent--${send.id}`} id={`${send.id}`}>
                            <header>
                                {send.boulder.boulderName}  Perceived Grade: {send.boulderGrade.boulderGrade} Comment: {send.comment}</header>
                                <button className="edit-button" onClick={() => {
                                setFilteredSend(send);
                                toggleModal()
                                }}>Edit</button>
                        </section>

                    }
                )
                }
            </div>
            {modal && <UserSendEdits send={filteredSend} setModal={setModal}/>}
        </article>
    </div>
</>
}
