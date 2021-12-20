import { Switch } from '@mui/material';
import axios from 'axios';
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

    const deleteHandle = () => {
        axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}/api/user/delete/${userData._id}`,
            withCredentials: true
        }).then((res) => {
            window.location = '/';
        }).catch((err) =>{
            console.log(err);
        })

    }

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

                        <div className="field">
                            <p className="btn" onClick={() => deleteHandle()}>Delete account</p>
                        </div>
                    </div>
                </div>
            ) : (
                <h1>Not logged</h1>
            )}
        
        </>
    )
}
