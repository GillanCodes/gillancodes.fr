import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import Loading from '../module/Loading';
import { isEmpty } from './../Utils';

export default function UserInfo(props) {
    
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isEmpty(usersData)) {
            setIsLoading(false);
        }
    }, [isLoading, usersData]);

    return (
        <>
         {!isLoading ? (
             <>
                {usersData.map(user => {
                    if (user.username === props.username) {
                        return (
                            <div className="userInfo" key={user.username}>
                                {props.userPic === "big" && (
                                    <img src={user.userpic} alt={user.userName} className="icon-big"/>
                                )}
                                {props.userPic === "med" && (
                                    <img src={user.userpic} alt={user.userName} className="icon-med"/>
                                )}
                                {props.userPic === "small" && (
                                    <img src={user.userpic} alt={user.userName} className="icon-small"/>
                                )}
                                {props.userPic === "extra-small" && (
                                    <img src={user.userpic} alt={user.userName} className="icon-xsmall"/>
                                )}
                
                                {props.linked ? (
                                    <>
                                        {userData && userData.username === user.username ? (
                                            <a href="/profil/" className="username">{user.username}</a>
                                        ) : (
                                            <a href={"/profil/" + user.username} className="username">{user.username}</a>
                                        )}
                                    </>
                                ): (
                                    <p className="username">{user.username}</p>
                                )}
                                        <div className='badges'>
                                            {user.certified === true && (
                                                <i className="far fa-check-circle" data-tip="Certified User"></i>
                                            )}
                                            {props.withBadges && (
                                                <>
                                                    {user.permissions.ADMIN === true && (
                                                        <i className="fas fa-tools" data-tip="Admin"></i>
                                                    )}
                                                    {user.permissions.MOD === true && (
                                                        <i className="fas fa-user-shield" data-tip="Mod"></i>
                                                    )}
                                                    {user.permissions.AUTHOR === true && (
                                                        <i className="fas fa-pencil-alt" data-tip="Author"></i>
                                                    )}
                                                    {user.permissions.DEV === true && (
                                                        <i className="fab fa-dev" data-tip="Dev"></i>
                                                    )}
                                                </> 
                                            )}
                                            <ReactTooltip place="top"/>
                                    </div>
                            </div>
                        )
                    }
                    return null
                })}
             
               

             </>
           
         ) : (
             <Loading />
         )}
        
        </>
    )
}
