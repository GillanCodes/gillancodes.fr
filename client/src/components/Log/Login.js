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

        <div>
            <form action="" method="post" onSubmit={handleLogin}>

            <div className="field">
                <label htmlFor="password" className="label">Username</label>
                <div className="control">
                    <input type="text" name="username" id="username" className='input' onChange={(event) => setUsername(event.target.value)} value={username}/>
                </div>
            </div>

            <div className="field">
                <label htmlFor="password" className="label">Password</label>
                <div className="control">
                    <input type="password" name="password" id="password" className='input' onChange={(event) => setPassword(event.target.value)}  value={password}/>
                </div>
            </div>

            <div class="field">
                <p class="control">
                    <input type="submit" value="Se Connecter" className='button is-info' />
                </p>
            </div>

            </form>
        </div>
    )
}
