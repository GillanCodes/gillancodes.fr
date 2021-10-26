import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userUpdate } from '../../actions/user.action';
import UserBadges from './UserBadges';

export default function ProfilPage() {

    const userData = useSelector((state) => state.userReducer);

    const [bio, setBio] = useState(userData.bio);
    const [link, setLink] = useState(userData.link);

    const [updateProfil, setUpdateProfil] = useState(false);

    const dispatch = useDispatch();


    const updateHandle = (event) => {

        if (bio !== userData.bio || link !== userData.link){
            dispatch(userUpdate(userData._id, bio, link));
        }
        setUpdateProfil(false);
    }



    return (
        <div className="profilContainer">
            
            <div className="profilHeader">
            <img src={userData.userpic} alt={userData.username} className="profilPicture" />
                <div className="profil">
                    <h2 className="username"> {userData.username} <UserBadges/></h2> 
                    {updateProfil === true && (
                        <>
                            <textarea name="bio" id="bio" className="bioInput" defaultValue={userData.bio} onChange={(e) => setBio(e.target.value)}></textarea> <br />
                            <input type="text" name="link" id="link" defaultValue={userData.link} onChange={(e) => setLink(e.target.value)} className="linkInput"/>
                        </>
                    )} 

                    {updateProfil === false && (
                        <>
                            <p className="bio">{userData.bio}</p>
                            <i className="fas fa-link"></i> <a href={userData.link} target='_blank' rel="noreferrer" className="link">{userData.link}</a>
                        </>
                    )}
                    
                </div>
                <p className="button">
                    <i className="fas fa-edit" title="Modifier le profil" onClick={() => setUpdateProfil(!updateProfil)}></i> <br />
                    {updateProfil === true && (
                        <i class="fas fa-save" title="Enregistrer les modifications" onClick={updateHandle}></i>
                    )}
                </p>
                
            </div>
            
            

        </div>
    )
}
