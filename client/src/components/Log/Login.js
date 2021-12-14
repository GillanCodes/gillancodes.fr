import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [NotificationDisplay, setNotificationDisplay] = useState(false);
    
    const handleLogin = (event) => {

        event.preventDefault();

        axios({
            method:'post',
            url: `${process.env.REACT_APP_API_URL}/api/user/login`,
            withCredentials:true,
            data: {
                username,
                password
            },
        }).then((res) => {

            if (res.data.errors) {
                setNotificationDisplay(true);
                const Error = document.querySelector('.error');
                if (res.data.errors.username) Error.innerHTML = res.data.errors.username;
                if (res.data.errors.password) Error.innerHTML = res.data.errors.password;
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

                {NotificationDisplay && (
                    <>
                        <div class="notification is-danger is-light error">
                        </div>
                    </>
                )}

            <div className="field">
                <label htmlFor="password" className="label">Username</label>
                <div className="control">
                    <input type="text" name="username" id="username" className='input' autoComplete="off" onChange={(event) => setUsername(event.target.value)} value={username}/>
                </div>
            </div>

            <div className="field">
                <label htmlFor="password" className="label">Password</label>
                <div className="control">
                    <input type="password" name="password" id="password" className='input' autoComplete="off" onChange={(event) => setPassword(event.target.value)}  value={password}/>
                </div>
            </div>

            <div class="field">
                <p class="control">
                    <input type="submit" value="Se Connecter" className='btn' />
                </p>
            </div>

            </form>
        </div>
    )
}
