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
                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersData.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <th><UserInfo linked userPic="med" withBadges username={user.username} /></th>
                                    <th><a href={"/dashboard/user/" + user.username}>Edit</a></th>
                                </tr>
                            )
                        })}
                        
                    </tbody>

                    
                </table>


                // <div className='userlist'>

                //     <ul>
                //         
                //     </ul>

                // </div>
            ): (
                <h1>Loading</h1>
            )}

        </div>
    )
}
