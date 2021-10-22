import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = (event) => {

        event.preventDefault();
        const usernameError = document.querySelector('.username.error');
        const passwordError = document.querySelector('.password.error');

        axios({
            method:'post',
            url: `${process.env.REACT_APP_API_URL}/api/user/login`,
            withCredentials:true,
            data: {
                username,
                password
            },
        }).then((res) => {

            console.log(res)

            if (res.data.errors) {
                usernameError.innerHTML = res.data.errors.username;
                passwordError.innerHTML = res.data.errors.password;
            } else {
                window.location = '/';
            }
        }).catch((err) => {
            console.log(err);
        })

    }


    return (
        <div className="form-content">
            <form action="" method="post" onSubmit={handleLogin}>

                <div className="field">
                    <label htmlFor="username">Nom d'utilisateur</label> <br />
                    <input type="text" name="username" id="username" autoComplete="off" onChange={(event) => setUsername(event.target.value)} value={username} /> <br />
                    <p className="username error"></p>
                </div>
                <div className="field">
                    <label htmlFor="password">Mot de Passe</label> <br />
                    <input type="password" name="password" id="password" autoComplete="off" onChange={(event) => setPassword(event.target.value)}  value={password}/><br />
                    <p className="password error"></p>
                </div>
                <br />
                <input type="submit" value="Se connecter" className="button" />
                

            </form>
        </div>
    )
}
