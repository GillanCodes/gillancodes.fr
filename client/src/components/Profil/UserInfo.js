import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { isEmpty } from './../Utils';

export default function UserInfo(props) {
    
    const userData = useSelector((state) => state.userReducer);

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!isEmpty(userData)) {
            setIsLoading(false);
        }
    }, [isLoading, userData]);

    return (
        <>
         {!isLoading ? (
             <div className="userInfo">
             {props.userPic === "big" && (
                 <img src={userData.userpic} alt={userData.userName} className="icon-big"/>
             )}
             {props.userPic === "med" && (
                 <img src={userData.userpic} alt={userData.userName} className="icon-med"/>
             )}
             {props.userPic === "small" && (
                 <img src={userData.userpic} alt={userData.userName} className="icon-small"/>
             )}
 
             {props.linked ? (
                 <a href="/TODO" className="username">{userData.username}</a>
             ): (
                 <p className="username">{userData.username}</p>
             )}
 
                {props.withBadges && (
                    <div className='badges'>
                        {userData.permissions.ADMIN === true && (
                            <i class="fas fa-tools"></i>
                        )}
                        {userData.permissions.MOD === true && (
                            <i class="fas fa-user-shield"></i>
                        )}
                        {userData.permissions.AUTHOR === true && (
                            <i class="fas fa-pencil-alt"></i>
                        )}
                        {userData.permissions.DEV === true && (
                            <i class="fab fa-dev"></i>
                        )}
                    </div>
                )}
            </div>
         ) : (
             <h1>LOADING</h1>
         )}
        
        </>
    )
}
