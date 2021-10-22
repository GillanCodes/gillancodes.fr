import React from 'react';
import {NavLink} from 'react-router-dom';

export default function Navbar() {
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
                    <NavLink exact to="/lorem" className="item">
                        <li><i className="fas fa-address-card"></i> Lorem</li>
                    </NavLink>
                    <NavLink exact to="/lorem" className="item">
                        <li><i className="fas fa-address-card"></i> Lorem</li>
                    </NavLink>
                    <NavLink exact to="/profil" className="item right">
                        <li><i class="fas fa-user"></i> Anonyme</li>
                    </NavLink>
                </ul>
                <div className="spacer"></div>
            </div>
        </nav>
    )
}
