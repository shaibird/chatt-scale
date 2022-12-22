import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { EditProfileForm } from "./EditProfileForm"

export const ProfileDetails = ({ userProfile, setUserProfile, getProfileDetails }) => {
    // const [userProfile, setUserProfile] = useState({})
    const [modal, setModal] = useState(false)

    const localScaleUser = localStorage.getItem("scale_user")
    const scaleUserObject = JSON.parse(localScaleUser)

    useEffect(
        () => {
            getProfileDetails()
        },
        []
    )


    const toggleModal = () => {
        setModal(!modal)
    }

    return <>
        <div className="profile-panel">

            <section className="profile" >
                <div className="panel-features">
                    <h2>Hello! {userProfile.userName}</h2>
                    <div className="piece">
                        <ul>Name: {userProfile.fullName}</ul>
                        <ul>Email: {userProfile.email}</ul>
                        <ul>Birthday: {userProfile.birthDate}</ul>
                        <ul>Height: {userProfile.height}</ul>
                        <ul>Ape Index: {userProfile.apeIndex}</ul>
                    </div>
                    <button className="panel-button" onClick={() => { toggleModal() }}>Edit Profile</button>
                </div>
            </section>
        </div>

        {modal && <EditProfileForm setUser={userProfile} setModal={setModal} />}
    </>

}