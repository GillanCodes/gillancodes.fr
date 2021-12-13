import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom';
import { UidContext } from './App.context';
import Logout from './Log/Logout';
import { isEmpty } from './Utils';

export default function Navbar() {

    const uid = useContext(UidContext);
    const userData = useSelector(state => state.userReducer);

    const [displayUser, setDisplayUser] = useState(false)

    useEffect(() => {
        if (!isEmpty(uid) && !isEmpty(userData)) { 
                setDisplayUser(true);
        } else {
            setDisplayUser(false);
        }
    }, [uid, userData])

    return (
        <nav>
            <div className="nav-container">
                <ul>
                    <NavLink exact to="/" className="header-icon">
                        <li> <i className="fas fa-home"></i></li>
                    </NavLink>
                    <NavLink exact to="/articles" className="item">
                        <li><i className="far fa-newspaper"></i> Articles</li>
                    </NavLink>
                    <NavLink exact to="/offers" className="item">
                        <li><i className="fas fa-copy"></i> Offres</li>
                    </NavLink>
                    <NavLink exact to="/about" className="item">
                        <li><i className="fas fa-address-card"></i> A Propos</li>
                    </NavLink>
                    
                    <NavLink exact to="/lorem" className="item">
                        <li><i className="fas fa-address-card"></i> Lorem</li>
                    </NavLink>
                    {displayUser ? (
                        <div className="right">
                            {userData.permissions.MOD && (
                                <NavLink exact to="/dashboard" className="item">
                                    <li><i className="fas fa-user"></i> Dashboard</li>
                                </NavLink>
                            )}
                            <NavLink exact to="/profil" className="item">
                                <li><i className="fas fa-user"></i> {userData.username} {userData.certified && (<i className="far fa-check-circle"></i>)}</li>
                            </NavLink>
                            <Logout />
                        </div>
                    ): (
                        <div className="right">
                            <NavLink exact to="/profil" className="item">
                                <li><i className="fas fa-user"></i> Anonyme</li>
                            </NavLink>
                        </div>
                    )}
                </ul>
                <div className="spacer"></div>
            </div>
        </nav>
    )
}
