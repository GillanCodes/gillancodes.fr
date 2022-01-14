import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userUpdate } from '../../actions/user.action';
import UserInfo from './UserInfo';
import { isEmpty } from './../Utils';
import UplaodUserPic from './UplaodUserPic';
import ProfileBody from './ProfileBody';
import Loading from '../module/Loading';

export default function ProfilPage() {

    const userData = useSelector((state) => state.userReducer);
    const [isLoading, setIsLoading] = useState(true);

            const [bio, setBio] = useState(userData.bio);
            const [website, setWebsite] = useState('');
            const [github, setGithub] = useState('');
            const [twitter, setTwitter] = useState('');

    useEffect(() => {
        if(!isEmpty(userData)) {
            setWebsite(userData.links ? userData.links.website : "");
            setGithub(userData.links ? userData.links.github : "");
            setTwitter(userData.links ? userData.links.twitter : "");
            setIsLoading(false);
        }
    }, [userData ,setWebsite, setGithub, setTwitter, setIsLoading])

    const [updateProfil, setUpdateProfil] = useState(false);

    const dispatch = useDispatch();


    const updateHandle = (event) => {

        const updatedLinks = {"website" : website, "github" : github, "twitter": twitter}

        if (bio !== userData.bio || updatedLinks !== userData.links){
            dispatch(userUpdate(userData._id, bio, updatedLinks));
        }
        setUpdateProfil(false);
    }



    return (

        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className='profile-page'>
                    <div className="profilContainer">
                        
                        <div className="profilHeader">
                        <div className='picture'>
                            <img src={userData.userpic} alt={userData.username} className="profilPicture" />
                            {updateProfil === true && (
                                <UplaodUserPic />
                            )}
                        </div>
                            <div className="profil">
                                <UserInfo withBadges username={userData.username} />
                                {updateProfil === true && (
                                    <>
                                        <textarea name="bio" id="bio" className="bioInput" defaultValue={userData.bio} onChange={(e) => setBio(e.target.value)}></textarea> <br />
                                        <i className="fas fa-link"></i> <input type="text" name="website" id="website" defaultValue={website} onChange={(e) => setWebsite(e.target.value)} className="linkInput"/> <br />
                                        <i className="fab fa-github"></i> <input type="text" name="github" id="github" defaultValue={github} onChange={(e) => setGithub(e.target.value)} className="linkInput"/> <br />
                                        <i className="fab fa-twitter"></i> <input type="text" name="twitter" id="twitter" defaultValue={twitter} onChange={(e) => setTwitter(e.target.value)} className="linkInput"/>
                                    </>
                                )} 

                                {updateProfil === false && (
                                    <>
                                        <p className="bio">{userData.bio}</p>
                                        {website && (<a href={website} target='_blank' rel="noreferrer" className="link"><i className="fas fa-link"></i></a>)}
                                        {github && (<a href={"https://github.com/" + github} target='_blank' rel="noreferrer" className="link"><i className="fab fa-github"></i></a>)}
                                        {twitter && (<a href={"https://twitter.com/" + twitter} target='_blank' rel="noreferrer" className="link"><i className="fab fa-twitter"></i></a>)}
                                    </>
                                )}
                                
                            </div>
                            <p className="custom-button">
                                <i className="fas fa-edit" title="Modifier le profil" onClick={() => setUpdateProfil(!updateProfil)}></i> <br />
                                {updateProfil === true && (
                                    <i className="fas fa-save" title="Enregistrer les modifications" onClick={updateHandle}></i>
                                )}
                            </p>
                        
                        </div>
                    </div>
                    <ProfileBody user={userData} />
                </div>
            )}
        </>
        
    )
}
