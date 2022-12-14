import { useEffect, useState } from 'react'
import { EditProfileForm } from './EditProfileForm'
import { ProfileDetails } from './ProfileDetails'
import { UserSendList } from './UserSendList'
import { UserTickList } from './UserTickList'
import "./Profile.css"
import "@fontsource/open-sans";



export const Profile = () => {
    
    

    return <article className="center-panel">
        <section className="right-panel">
        <ProfileDetails  />
        </section>
    <section className = "panel">
        
            <UserSendList />
            <UserTickList />
            </section>
            </article>
}