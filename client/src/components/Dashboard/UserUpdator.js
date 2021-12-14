import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updatePermissionsUserAdmin, updateUserAdmin } from '../../actions/admin.action';
import UserInfo from '../Profil/UserInfo';
import {Switch} from '@mui/material'
import { getUsers } from '../../actions/users.action';

export default function UserUpdator({ user }) {

    const [bio, setBio] = useState(user.bio);
    const [website, setWebsite] = useState(user.links ? user.links.website : "");
    const [github, setGithub] = useState(user.links ? user.links.github : "");
    const [twitter, setTwitter] = useState(user.links ? user.links.twitter : "");

    const [isAdmin, setIsAdmin] = useState(user.permissions.ADMIN)
    const [isMod, setIsMod] = useState(user.permissions.MOD)
    const [isDev, setIsDev] = useState(user.permissions.DEV)
    const [isAuthor, setIsAuthor] = useState(user.permissions.AUTHOR)
    const [isCertified, setIsCertified] = useState(user.certified)


    const dispatch = useDispatch()

    const updateUser = () => {
        const data = {
            bio : bio,
            links: {website, github, twitter}
        }
        dispatch(updateUserAdmin(user._id, data));
    }

    const updateUserPermissions = () => {
        const data = {
            certified : isCertified,
            ADMIN: isAdmin,
            MOD: isMod,
            AUTHOR: isAuthor,
            DEV: isDev
            
        }

        console.log(data)
        dispatch(updatePermissionsUserAdmin(user._id, data))
        .then(() => dispatch(getUsers()));
        
    }

    return (
            <>
                <div className='head'>
                    <h1>Editing of : </h1>
                    <UserInfo username={user.username} withBadges userPic="med" linked />
                </div>
                <div className='profil'>
                    <textarea name="bio" id="bio" className="bioInput" defaultValue={user.bio} onChange={(e) => setBio(e.target.value)}></textarea> <br />
                    <i className="fas fa-link"></i> <input type="text" name="website" id="website" defaultValue={website} onChange={(e) => setWebsite(e.target.value)} className="linkInput"/> <br />
                    <i className="fab fa-github"></i> <input type="text" name="github" id="github" defaultValue={github} onChange={(e) => setGithub(e.target.value)} className="linkInput"/> <br />
                    <i className="fab fa-twitter"></i> <input type="text" name="twitter" id="twitter" defaultValue={twitter} onChange={(e) => setTwitter(e.target.value)} className="linkInput"/>
                    <p className="btn" onClick={updateUser}>Save Profil</p>
                </div>
                
                <div className='permissions'>
                    <i className="fas fa-tools" data-tip="Admin"></i><Switch checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} /> <br />
                    <i className="fas fa-user-shield" data-tip="Mod"></i> <Switch checked={isMod} onChange={(e) => setIsMod(e.target.checked)}/> <br />
                    <i className="fas fa-pencil-alt" data-tip="Author"></i> <Switch checked={isAuthor} onChange={(e) => setIsAuthor(e.target.checked)}/> <br />
                    <i className="fab fa-dev" data-tip="Dev"></i> <Switch checked={isDev} onChange={(e) => setIsDev(e.target.checked)} /> <br />
                    <i className="far fa-check-circle" data-tip="Certified User"></i> <Switch checked={isCertified} onChange={(e) => setIsCertified (e.target.checked)} /> <br />
                    <p className="btn" onClick={updateUserPermissions}>Save user Permission</p>
                </div>
                
            </>
            
            
    )
}
