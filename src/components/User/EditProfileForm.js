import { useEffect, useState } from "react"
import './EditProfile.css'

export const EditProfileForm = ({ setModal }) => {
    const [feedback, setFeedback] = useState("")



    useEffect(() => {
        if (feedback !== "") {
            //Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    const [profile, updateProfile] = useState({
        username: "",
        email: "",
        apeIndex: 0,
        height: 0

    })

    const localScaleUser = localStorage.getItem("scale_user")
    const scaleUserObject = JSON.parse(localScaleUser)

    useEffect(() => {
        fetch(`http://localhost:8088/users?id=${scaleUserObject.id}`)
            .then(response => response.json())
            .then((data) => {
                const userObject = data[0]
                updateProfile(userObject)

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
        fetch(`http://localhost:8088/users/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback("Userprofile successfully saved")
            })
    }

    <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
        {feedback}
    </div>



    return (
        <form className="profile">
            <div className="modal">
                <div className="overlay">
                    <div className="modal-content">
                        <h2 className="profile__title">Edit Profile</h2>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="specialty">Username:</label>
                                <input
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    value={profile.username}
                                    onChange={
                                        (evt) => {
                                            const copy = { ...profile }
                                            copy.username = evt.target.value
                                            updateProfile(copy)
                                        }
                                    } />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="specialty">Email:</label>
                                <input
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    value={profile.email}
                                    onChange={
                                        (evt) => {
                                            const copy = { ...profile }
                                            copy.email = evt.target.value
                                            updateProfile(copy)
                                        }
                                    } />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="name">Ape Index:</label>
                                <input type="number"
                                    className="form-control"
                                    value={profile.apeIndex}
                                    onChange=
                                    {
                                        (evt) => {
                                            const copy = { ...profile }
                                            copy.apeIndex = parseInt(evt.target.value)
                                            updateProfile(copy)
                                        }
                                    } />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="height">Height:</label>
                                <input
                                    required autoFocus
                                    type="number"
                                    className="form-control"
                                    value={profile.height}
                                    onChange={
                                        (evt) => {
                                            const copy = { ...profile }
                                            copy.height = parseInt(evt.target.value)
                                            updateProfile(copy)
                                        }
                                    } />
                            </div>
                        </fieldset>
                        <button className=".close-modal" type="button" onClick={(e) => setModal(false)}>Cancel</button>
                        <button
                            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                            className=".close-modal">
                            Save Profile
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )

}