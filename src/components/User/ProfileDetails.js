import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { EditProfileForm } from "./EditProfileForm"

export const ProfileDetails = () => {
    const [userProfile, setUserProfile] = useState({})
    const [modal, setModal] = useState(false)

    const localScaleUser = localStorage.getItem("scale_user")
    const scaleUserObject = JSON.parse(localScaleUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/users/${scaleUserObject.id}`)
                .then(response => response.json())
                .then((data) => {
                    setUserProfile(data)
                })
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
        <h2>Hello! {userProfile.username}</h2>
        <ul>Name: {userProfile.fullName}</ul>
        <ul>Email: {userProfile.email}</ul>
        <ul>Birthday: {userProfile.birthDate}</ul>
        <ul>Height: {userProfile.height}</ul>
        <ul>Ape Index: {userProfile.apeIndex}</ul>
        </div>

        <button className="panel-button" onClick={() => {toggleModal()}}>Edit Profile</button>
        
    </section>
    </div>

    {modal && <EditProfileForm setUser={userProfile} setModal={setModal}/>}
    </>

}