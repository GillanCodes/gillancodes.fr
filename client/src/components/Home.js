import React from 'react'
import UserInfo from './Profil/UserInfo'

export default function Home() {
    return (
        <div className="container">
            Home

            <UserInfo userPic="big" withBadges linked/>
        </div>
    )
}
