import { useState, useEffect } from "react"
import { BsTrash } from 'react-icons/bs'
import { Link, useNavigate } from "react-router-dom"
import { UserDeleteButton } from "./UserDeleteButton"
import './Profile.css'


export const UserSendList = () => {
    const [userSends, setUserSends] = useState([])
    const [allBoulders, setAllBoulders] = useState([])

    const localScaleUser = localStorage.getItem("scale_user")
    const scaleUserObject = JSON.parse(localScaleUser)

    const navigate = useNavigate()


    //This fetch gets the user specific send list based on the user who is logged in. 
    const getAllSends = () => {

        fetch(`http://localhost:8088/userSendList?user=${scaleUserObject.id}&_expand=boulder&_expand=boulderGrade`)
            .then(response => response.json())
            .then((data) => {
                setUserSends(data)
            })
    }


    useEffect(
        () => {
            getAllSends()

            fetch(`http://localhost:8088/crags`)
                .then(response => response.json())
                .then((boulderArray) => {
                    setAllBoulders(boulderArray)
                })
        },
        []
    )


    // matching the ids in the send list, to the actual boulder so we can display the boulder information
    // not getting all of the boulders in the list. It's stopping after the first match. 

    return <>
        <div className="profile-panel">
        <article className="userSendList" >
            <header className="profile-header">Ascents</header>
            <div className="panel-features">
            {userSends.map(
                (send) => {
                    return <section className="ascents" key={`ascent--${send.id}`} id={`${send.id}`}>
                        <header>
                            <Link to={`UserSendList/${send.id}/edit`}>{send.boulder.boulderName}</Link>  Perceived Grade: {send.boulderGrade.boulderGrade} Comment: {send.comment}</header><UserDeleteButton send={send} getSends={getAllSends} />
                    </section>
                
                }
            )
            }
            </div>

        </article>
</div>
    </>
}
