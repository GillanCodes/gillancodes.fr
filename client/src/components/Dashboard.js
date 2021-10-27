import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { isEmpty } from './Utils';

export default function Dashboard() {
    
    const [isLoading, setIsLoading] = useState(true);
    const [active, setActive] = useState("default");

    const userData = useSelector(state => state.userReducer);

    

    useEffect(() => {
        if(!isEmpty(userData) && isLoading) {
            setIsLoading(false)
        }
    },[userData, isLoading])

    return (
        <>
            {isLoading ? (
                <h1>Loading</h1>
            ): (
                <div className="dashboard-container">
                    <div className="menu">
                        <ul>
                            {userData.permissions.includes("ADMIN") && <li onClick={(e) => setActive('redirect')}>Redirect</li>}
                            {userData.permissions.includes("AUTHOR") && <li onClick={(e) => setActive('posts')}>Posts</li>}
                            {userData.permissions.includes("MOD") && userData.permissions.includes("ADMIN") && <li onClick={(e) => setActive('users')}>User</li>}
                        </ul>
                    </div>

                    <div className="content">
                        {userData.permissions.includes("ADMIN") && active === "redirect" && <h1>Redirect</h1>}
                        {userData.permissions.includes("MOD") && active === "users" && <h1>Users</h1>}
                        {userData.permissions.includes("AUTHOR") && active === "posts" && <h1>Posts</h1>}

                        {active === "default" && <h1>Default</h1>}
                    </div>
                </div>
            )}
        </>
    )
}
