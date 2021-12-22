import axios from 'axios';
import React from 'react'

export default function DeleteUser({user}) {

    const deleteHandle = () => {
        axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}/api/user/delete/${user._id}`,
            withCredentials: true
        }).then((res) => {
            window.location = '/';
        }).catch((err) =>{
            console.log(err);
        })

    }

    return (
        <div className="field">
            <p className="btn" onClick={() => deleteHandle()}>Delete account</p>
        </div>
    )
}
