import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom';
import { UidContext } from './App.context';
import Logout from './Log/Logout';

export default function Navbar() {

    const uid = useContext(UidContext);
    const userData = useSelector(state => state.userReducer);

    console.log(userData)

    return (
        <nav>
            <div className="nav-container">
                <ul>
                    <NavLink exact to="/" className="header-icon">
                        <li> <i className="fas fa-home"></i></li>
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
                    <NavLink exact to="/lorem" className="item">
                        <li><i className="fas fa-address-card"></i> Lorem</li>
                    </NavLink>
                    {uid ? (
                        <div className="right">
                            <NavLink exact to="/profil" className="item">
                                <li><i className="fas fa-user"></i> {userData.username}</li>
                            </NavLink>
                            <Logout />
                        </div>
                    ): (
                        <div className="right">
                            <NavLink exact to="/profil" className="item">
                                <li><i class="fas fa-user"></i> Anonyme</li>
                            </NavLink>
                        </div>
                    )}
                </ul>
                <div className="spacer"></div>
            </div>
        </nav>
    )
}
