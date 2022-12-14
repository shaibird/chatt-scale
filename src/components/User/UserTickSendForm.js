import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import "./UserTickSendForm.css"



export const UserTickSendForm = ({ setModal, filteredBoulders, getTicks, getSends }) => {
    const localScaleUser = localStorage.getItem("scale_user")
    const scaleUserObject = JSON.parse(localScaleUser)

    const [send, setSend] = useState({
        boulderId: filteredBoulders.boulder.id,
        comment: "",
        sendDate: "",
        boulderRatingId: 0,
        boulderGradeId: 0,
        userId: scaleUserObject.id
    })

    const [grades, setGrades] = useState([])
    const [userRatings, setUserRatings] = useState([])

    const navigate = useNavigate()



    const handleSaveButtonClick = (click) => {
        click.preventDefault()

        const sendToSendToAPI = {
            ...send
        }

        fetch(`http://localhost:8088/userSendList`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                fetch(`http://localhost:8088/UserTickList/${filteredBoulders.id}`, {
                    method: "DELETE"
                })
                .then(() => {
                    setModal(false)
                })
                    .then(() => {
                        getTicks()
                    })
                    .then(() => {
                        getSends()
                    })
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
        }, [])


    return (
        <>
            (
            <form className="userSendForm">
                <div className="modal">
                    <div className="overlay">
                        {/* figure out how to route the boulder that the button was selected from and render the name, while holding the id */}
                        <div className="modal-content">
                            <h2 className="sendForm__title">{filteredBoulders.boulderName}</h2>
                            <fieldset>
                                <div className="form-group">
                                    <label htmlFor="description">Comment:</label>
                                    <input
                                        required autoFocus
                                        type="text"
                                        className="form-control"
                                        placeholder="Thoughts?"
                                        value={send.comment}
                                        onChange={
                                            (evt) => {
                                                const copy = { ...send }
                                                copy.comment = evt.target.value
                                                setSend(copy)
                                            }
                                        } />
                                </div>
                                <fieldset>
                                    <div className="sendForm">
                                        <div>Rating: </div>
                                        {userRatings.map((userRating) => {
                                            return (
                                                <div key={userRating.id} className="radio">
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            value={userRating.id}
                                                            onChange={(event) => {
                                                                const copy = { ...send }
                                                                copy.boulderRatingId = parseInt(event.target.value)
                                                                setSend(copy)
                                                            }}
                                                        />
                                                        {userRating.boulderRating}
                                                    </label>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </fieldset>
                                <div className="sendForm">
                                    <label htmlFor="grade">Perceived Difficulty:</label>
                                    <select onChange={(evt) => {
                                        const copy = { ...send };
                                        copy.boulderGradeId = parseInt(evt.target.value)
                                        setSend(copy);
                                    }}>
                                        <option value={0}>Grade</option>
                                        {grades.map((grade) => {
                                            return <option key={`userGrade--${grade.id}`}
                                                value={grade.id}>{grade.boulderGrade}</option>
                                        }
                                        )
                                        }
                                    </select>
                                </div>
                            </fieldset>

                            <div className="sendForm">
                                <label>Date</label>
                                <input type='date'
                                    min="2012-01-01"
                                    max="2022-12-31"
                                    onChange={(evt) => {
                                        const copy = { ...send };
                                        copy.sendDate = evt.target.value;
                                        setSend(copy);
                                    }}
                                />
                            </div>

                            <div className="sendForm">
                                <button className=".close-modal" type="button" onClick={(e) => setModal(false)}>Cancel</button>
                                <button className=".close-modal" onClick={handleSaveButtonClick}>Log Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </>
    )
}