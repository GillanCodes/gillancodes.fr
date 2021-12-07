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
        <div className="log-form">
            <div className="form-container">
                <div class="tabs is-centered is-toggle">
                    <ul>
                        {/* eslint-disable-next-line */}
                        <li className={SingUpModal ? "is-active" : null}><a onClick={modalsHandle} id="register">S'inscrire</a></li>
                        {/* eslint-disable-next-line */}
                        <li className={SingInModal ? "is-active" : null}><a onClick={modalsHandle} id="login">Se connecter</a></li>
                    </ul>
                </div>

                {/* <div class="tabs is-centered is-boxed">
                    <ul>
                        
                    </ul>
                </div> */}

                <div className="form">
                    {SingInModal && <Login />}
                    {SingUpModal && <Register />}
                </div>

            </div>
        </div>

    )
}

export default Log;
