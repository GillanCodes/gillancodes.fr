import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { UidContext } from './App.context';
import ArticleDashboard from './Dashboard/ArticleDashboard';
import UsersList from './Dashboard/UsersList';
import UserInfo from './Profil/UserInfo';
import { isEmpty } from './Utils';

export default function Dashboard() {
    
    const [isLoading, setIsLoading] = useState(true);
    const [active, setActive] = useState("default");

    const userData = useSelector(state => state.userReducer);
    const uid = useContext(UidContext);

    

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

                <>
                    {!uid ? (
                        <h1>Not logged !</h1>
                    ):(
                        <div className="dashboard-container">

                            <div className="tabs">
                                <ul>
                                    {/* eslint-disable-next-line */}
                                    <li className={active === "default" ? "is-active": ""}><a onClick={(e) => setActive('default')}>Dashboard</a></li>
                                    {/* eslint-disable-next-line */}
                                    {userData.permissions.ADMIN === true && <li className={active === "redirect" ? "is-active": "" }><a onClick={(e) => setActive('redirect')}>Redirect</a></li>}
                                    {/* eslint-disable-next-line */}
                                    {userData.permissions.AUTHOR === true && <li className={active === "posts" ? "is-active": ""}><a onClick={(e) => setActive('posts')}>Posts</a></li>}
                                    {/* eslint-disable-next-line */}
                                    {userData.permissions.MOD === true && userData.permissions.ADMIN === true && <li className={active === "users" ? "is-active": ""}><a onClick={(e) => setActive('users')}>Users</a></li>}
                                </ul>
                            </div>

                            <div className="dashboard-content">

                                {userData.permissions.ADMIN === true && active === "redirect" && <h1>Redirect</h1>}
                                {userData.permissions.MOD === true && active === "users" && <UsersList />}
                                {userData.permissions.AUTHOR === true && active === "posts" && <ArticleDashboard />}

                                {active === "default" && (
                                    <div className='default'>
                                        <UserInfo username={userData.username} linked withBadges userPic="big" />
                                        <div className="dash-welcom">
                                            <h1 className='title'>Bienvenue sur le dashboard</h1>
                                            
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </>
                
            )}
        </>
    )
}
