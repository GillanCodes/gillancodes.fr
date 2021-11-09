import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from '../Utils';
import UserInfo from './UserInfo';

export default function UserPage({ username }) {

    const [isLoading, setIsLoading] = useState(true);

    const usersData = useSelector(state => state.usersReducer);

    useEffect(() => {
        if (!isEmpty(usersData)){
            setIsLoading(false);
        }
    }, [usersData])

    return (
        <>
            {!isLoading && (
                <div>
                    {usersData.map((user) => {
                        if (user.username.toLowerCase() === username.toLowerCase()) {
                            return (
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
                                    </div>
                                </div>
                            )
                        }
                        return null
                    })}
                </div>
            )}

        </>
    )
}
