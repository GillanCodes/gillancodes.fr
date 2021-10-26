import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function Dashboard() {
    
    const [hasPerm, setHasPerm] = useState(false);
    const [active, setActive] = useState("redirect");

    const userData = useSelector(state => state.userReducer);
    var i=0;

    useEffect(() => {
        for (i; i<userData.permissions.length; i++){
            if(userData.permissions[i] === "ADMIN" ){
                setHasPerm(true);
            }
        }
    }, [userData, hasPerm, i])

    return (
        <>
            {!hasPerm ? (
                <h1>No Perm</h1>
            ): (
                <div className="dashboard-container">
                    <div className="menu">
                        <ul>
                            <li onClick={(e) => setActive('redirect')}>Redirect</li>
                            <li onClick={(e) => setActive('users')}>Users</li>
                            <li onClick={(e) => setActive('posts')}>Posts</li>
                        </ul>
                    </div>

                    <div className="content">
                        {active === "redirect" && (
                            <h1>Redirect</h1>
                        )}
                        {active === "users" && (
                            <h1>Users</h1>
                        )}
                        {active === "posts" && (
                            <h1>Posts</h1>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
