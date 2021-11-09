import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import UserInfo from '../Profil/UserInfo';
import { isEmpty } from '../Utils'

export default function UsersList() {

    const [isLoading, setIsLoading] = useState(true)

    const usersData = useSelector(state => state.usersReducer);

    useEffect(() => {
        if (!isEmpty(usersData)) {
            setIsLoading(false)
        }
    }, [usersData, isLoading])

    return (
        <div className='userlist-container'>
            <h1 className='title'>Users List</h1>

            {!isLoading ? (
                <div className='userlist'>

                    <ul>
                        {usersData.map((user) => {
                            return <li key={user._id}><UserInfo linked userPic="med" withBadges username={user.username} /> <a href={"/dashboard/user/" + user.username}>Edit</a></li>
                        })}
                    </ul>

                </div>
            ): (
                <h1>Loading</h1>
            )}

        </div>
    )
}
