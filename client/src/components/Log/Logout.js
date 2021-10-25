import axios from 'axios';
import React from 'react'
import cookie from 'js-cookie';

export default function Logout() {


    const removeCookie = (key) => {
        if (window !== "undefined"){
            cookie.remove(key, {expire: 1});
        }
    }

    const logout = async () => {
        await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/user/logout`,
            withCredentials: true
        }).then(() => {
            removeCookie("gillancodes_user")
        }).catch((err) => {
            console.log(err);
        })

        window.location = '/';
    }

    return (
        <div className="item is-clickable">
            <li onClick={logout}>
                <i className="fas fa-sign-out-alt"></i>Déconnexion 
            </li>
        </div>
    )
}
