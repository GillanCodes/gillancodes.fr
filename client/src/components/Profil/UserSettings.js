import { Switch } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { isEmpty } from '../Utils';
import UserInfo from './UserInfo'

export default function UserSettings() {

    const userData = useSelector(state => state.userReducer)

    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        if(!isEmpty(userData)) {
            setIsLogged(true);
        }
    }, [userData])

    return (
        <>
            {isLogged ? (
                <div className='settings-container'>
                    <div className="setting-content">
                        <UserInfo userPic="big" withBadges username={userData.username}/>
                    </div>

                    <div className="setting-content">
                        <div className="field">
                            AdminView <Switch /> <br />
                            ModView <Switch /> <br />
                            AuthorView <Switch /> <br />
                            AdminToolView <Switch /> <br />
                            ModToolView <Switch /> <br />
                            AuthorToolView <Switch /> <br />

                            {/* RoleView = Voir les items invisible pour les autres => Admin/author/mod ... 1 setting pour 1role  */}
                            {/* RoleToolView = Voir les outils (button delete/edit, stats, info comme "ispublish/isdelete" ...) => Admin/author/mod ... 1 setting pour 1role  */}
                            {/* Si ADMIN : 1 params */}
                        </div>
                    </div>
                </div>
            ) : (
                <h1>Not logged</h1>
            )}
        
        </>
    )
}
