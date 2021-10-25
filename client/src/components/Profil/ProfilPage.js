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
                    <h2 className="username"> {userData.username}</h2>
                    {updateProfil === true && (
                        <>
                            <textarea name="bio" id="bio" className="bioInput" defaultValue={userData.bio}></textarea> <br />
                            <input type="text" name="link" id="link" defaultValue={userData.link} className="linkInput"/>
                        </>
                    )} 
                    {updateProfil === false && (
                        <>
                            <p className="bio">{userData.bio}</p>
                            <i className="fas fa-link"></i> <a href={userData.link} target='_blank' className="link">{userData.link}</a>
                        </>
                    )}
                    
                </div>
                <p className="button">
                    <i className="fas fa-edit" title="Modifier le profil" onClick={() => setUpdateProfil(!updateProfil)}></i> <br />
                    {updateProfil === true && (
                        <i class="fas fa-save" title="Enregistrer les modifications"></i>
                    )}
                </p>
                
            </div>
            
            

        </div>
    )
}
