import { useEffect, useState } from 'react'
import { EditProfileForm } from './EditProfileForm'
import { ProfileDetails } from './ProfileDetails'
import { UserSendList } from './UserSendList'
import { UserTickList } from './UserTickList'
import "./Profile.css"
import "@fontsource/open-sans";



export const Profile = () => {
    const [userSends, setUserSends] = useState([])
    const [userProfile, setUserProfile] = useState([])

    const localScaleUser = localStorage.getItem("scale_user")
    const scaleUserObject = JSON.parse(localScaleUser)
    
    const getAllSends = () => {

        fetch(`http://localhost:8088/userSendList?user=${scaleUserObject.id}&_expand=boulder&_expand=boulderGrade`)
            .then(response => response.json())
            .then((data) => {
                setUserSends(data)
            })
    }

    const getProfileDetails = () => {

        fetch(`http://localhost:8088/users/${scaleUserObject.id}`)
        .then(response => response.json())
        .then((data) => {
            setUserProfile(data)
        })
}

    


    return <article className="center-panel">
        <section className="right-panel">
        <ProfileDetails  userProfile={userProfile} setUserProfile={setUserProfile} getProfileDetails={getProfileDetails}/>
        </section>
    <section className = "panel">
        
            <UserSendList userSends={userSends} setUserSends={setUserSends} getSends={getAllSends}/>
            <UserTickList getSends={getAllSends}/>
            </section>
            </article>
}

