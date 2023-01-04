import { useEffect, useState } from "react"
import './EditProfile.css'
import { UserDeleteButton } from "./UserDeleteButton"

export const UserSendEdits = ({ setModal, send, getSends }) => {
    const [feedback, setFeedback] = useState("")



    useEffect(() => {
        if (feedback !== "") {
            //Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    const [grades, setGrades] = useState([])
    const [userRatings, setUserRatings] = useState([])
    const [climb, updateClimb] = useState({
        boulderId: send.id,
        comment: "",
        sendDate: "",
        boulderRatingId: 0,
        boulderGradeId: 0,
    })

    const localScaleUser = localStorage.getItem("scale_user")
    const scaleUserObject = JSON.parse(localScaleUser)

    useEffect(() => {
        fetch(`http://localhost:8088/userSendList?id=${send.id}`)
            .then(response => response.json())
            .then((data) => {
                updateClimb(data)

            })
    },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
        fetch(`http://localhost:8088/users/${climb.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(send)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback("Update successfully saved")
            })
    }

    useEffect(
        () => {
            fetch(`http://localhost:8088/boulderGrades`)
                .then((res) => res.json())
                .then((gradesArray) => {
                    setGrades(gradesArray)
                })

            fetch(`http://localhost:8088/boulderRatings`)
                .then((res) => res.json())
                .then((ratingsArray) => {
                    setUserRatings(ratingsArray)
                })
        }, 
        []
    )

    
    return (
        <form className="profile">
            <div className="modal">
                <div className="overlay">
                    <div className="modal-content">
                        <h2 className="profile__title">Edit {send.boulder.boulderName} Ascent </h2>
                        <UserDeleteButton send={send} getSends={getSends} />
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="specialty">Comment:</label>
                                <input
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    value={send.comment}
                                    onChange={
                                        (evt) => {
                                            const copy = { ...climb }
                                            copy.comment = evt.target.value
                                            updateClimb(copy)
                                        }
                                    } />
                            </div>
                        </fieldset>
                        <div className="edit-buttons"><button className=".close-modal" type="button" onClick={(e) => setModal(false)}>Cancel</button>
                        <button
                            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                            className=".close-modal">
                            Save Send
                        </button></div>
                    </div>
                </div>
            </div>
        </form>
    )

}