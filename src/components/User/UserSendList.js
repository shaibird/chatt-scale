import { useState, useEffect } from "react"
import { BsTrash } from 'react-icons/bs'
import { Link, useNavigate } from "react-router-dom"
import { UserDeleteButton } from "./UserDeleteButton"
import { UserSendEdits } from "./UserSendEdit"
import './Profile.css'


export const UserSendList = ({ getSends, filtered }) => {
    const [allBoulders, setAllBoulders] = useState([])
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

    const toggleModal = () => {
        setModal(!modal)
    }

    console.log(filtered)

return <>
    <div className="profile-panel">
        <article className="userSendList" >
            <header className="profile-title">Ascents</header>
            <div className="ascents-block">
                {filtered.map(
                    (send) => {
                        return <section className="ascents" key={`ascent--${send.id}`} id={`${send.id}`}>
                            <header className="sends">
                                <div className="details">
                                <div className="Name">{send.boulder.boulderName}</div> 
                                <div className="second-row"><div className="info"><div className="grade">{send.boulderGrade.boulderGrade}</div> <div className="description">Comment: {send.comment}</div></div>
                                <div className="button"><button className="edit-button" onClick={() => {
                                setFilteredSend(send);
                                toggleModal()
                                }}>Edit</button></div></div>
                                </div>
                                </header>
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
