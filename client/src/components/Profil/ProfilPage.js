import React, {useState} from 'react'
import { useSelector } from 'react-redux'

export default function ProfilPage() {

    const userData = useSelector((state) => state.userReducer);


    const [updateProfil, setUpdateProfil] = useState(false)

    return (
        <div className="profilContainer">
            
            <div className="profilHeader">
            <img src={userData.userpic} alt={userData.username} className="profilPicture" />
                <div className="profil">
                    {updateProfil === true && (
                        <>
                            <input type="text" name="username" id="username" className="usernameInput" value={userData.username} />
                            <textarea name="bio" id="bio" value={userData.bio}></textarea>
                        </>
                    )} 
                    {updateProfil === false && (
                        <>
                            <h2 className="username"> {userData.username}</h2>
                            <p className="bio">{userData.bio}</p>
                        </>
                    )}
                    <i className="fas fa-link"></i> <a href={userData.link} target='_blank' className="link">{userData.link}</a>

                    <p className="button" onClick={() => setUpdateProfil(!updateProfil)}>
                        Edit
                    </p>
                </div>
            </div>
            

        </div>
    )
}
