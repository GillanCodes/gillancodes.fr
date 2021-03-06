import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from '../Utils';
import ProfileBody from './ProfileBody';
import UserInfo from './UserInfo';

export default function UserPage({ username }) {

    const [isLoading, setIsLoading] = useState(true);

    const usersData = useSelector(state => state.usersReducer);
    const userData = useSelector(state => state.userReducer);

    useEffect(() => {
        if (!isEmpty(usersData)){
            setIsLoading(false);
        }
    }, [usersData, userData])

    return (
        <>
            {!isLoading && (
                <div>
                    {usersData.map((user) => {
                        if (user.username === username) {
                            return (
                                <>
                                <div className="profilContainer">
                                <div className="profilHeader">
                                <img src={user.userpic} alt={user.username} className="profilPicture" />
                                    <div className="profil">
                                        <UserInfo username={user.username} withBadges />
                                        <p className="bio">{user.bio}</p>
                                        {user.links && user.links.website && (<a href={user.links.website} target='_blank' rel="noreferrer" className="link"><i className="fas fa-link"></i></a>)}
                                        {user.links && user.links.github && (<a href={"https://github.com/" + user.links.github} target='_blank' rel="noreferrer" className="link"><i className="fab fa-github"></i></a>)}
                                        {user.links && user.links.twitter && (<a href={"https://twitter.com/" + user.links.twitter} target='_blank' rel="noreferrer" className="link"><i className="fab fa-twitter"></i></a>)}
                                        </div>
                                        {!isEmpty(userData) && (
                                            <>
                                            {userData.permissions.ADMIN && (
                                                <p className="button">
                                                    <a href={"/dashboard/user/" + user.username}><i className="fas fa-edit" data-tip={"Modifier le profil de " + user.username}></i></a>
                                                </p>
                                            )}
                                            </>
                                            
                                        )}
                                    </div>
                                    
                                </div>
                                <div className="profil-body">
                                    <ProfileBody user={user}/>
                                </div>
                                </>
                                
                            )
                        }
                        return null
                    })}
                </div>
            )}

        </>
    )
}
