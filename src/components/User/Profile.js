import { useEffect, useState } from 'react'
import { EditProfileForm } from './EditProfileForm'
import { ProfileDetails } from './ProfileDetails'
import { UserSendList } from './UserSendList'
import { UserTickList } from './UserTickList'
import { UserChart } from './UserChart'
import "./Profile.css"
import "@fontsource/open-sans";



export const Profile = () => {
    const [userSends, setUserSends] = useState([])
    const [userProfile, setUserProfile] = useState([])
    const [filtered, setFiltered] = useState([])

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

    
useEffect(
    () => {
        const mySends = userSends.filter(send => send.userId === scaleUserObject.id)
        setFiltered(mySends)
    }, [userSends]
)
console.log(filtered)

    return <article className="center-panel">
        <section className="right-panel">
        <ProfileDetails  userProfile={userProfile} setUserProfile={setUserProfile} getProfileDetails={getProfileDetails}/>
        </section>
        <section className="right-side">
        <UserChart filtered={filtered} getSends={getAllSends}/>
    <section className = "panel">
        
            <UserSendList filtered={filtered} getSends={getAllSends}/>
            <UserTickList getSends={getAllSends}/>
            </section>
            </section>
            </article>
}

