import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'

const Log = (props) => {

    const [SingUpModal, setSingUpModal] = useState(props.singUp)
    const [SingInModal, setSingInModal] = useState(props.singIn)

    const modalsHandle = (event) => {
        if(event.target.id === "register"){
            setSingInModal(false);
            setSingUpModal(true);
        }
        if (event.target.id === "login") {
            setSingInModal(true);
            setSingUpModal(false);
        }
    }
    
    return (
        <div className="connection-form">
            <div className="form-container">

                <ul>
                    <li onClick={modalsHandle} id="register" className={SingUpModal ? "active-btn" : null}>S'inscrire</li>
                    <li onClick={modalsHandle} id="login" className={SingInModal ? "active-btn" : null}>Se connecter</li>
                </ul>

                <div className="form">
                    {SingInModal && <Login />}
                    {SingUpModal && <Register />}
                </div>

            </div>
        </div>
    )
}

export default Log;
