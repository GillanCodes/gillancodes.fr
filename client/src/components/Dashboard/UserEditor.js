import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router'
import UserInfo from '../Profil/UserInfo';
import { isEmpty } from '../Utils';
import ReactToolTip from 'react-tooltip';

export default function UserEditor() {

    const { username } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [bio, setBio] = useState('');
    const [website, setWebsite] = useState('');
    const [github, setGithub] = useState('');
    const [twitter, setTwitter] = useState('');

    const usersData = useSelector(state => state.usersReducer);

    useEffect(() => {
        if (!isEmpty(usersData)) {
            setIsLoading(false)
        } 
    }, [usersData])

    return (
        <div className='usereditor-container'>
            {!isLoading ? (
                <div className='usereditor'>
                    {usersData.map((user) => {
                        if (user.username === username){
                            return (
                                <div className='head'>
                                    <h1>Editing of : </h1>
                                    <UserInfo username={user.username} withBadges userPic="med" />

                                    <div className='profil'>
                                        <textarea name="bio" id="bio" className="bioInput" defaultValue={user.bio} onChange={(e) => setBio(e.target.value)}></textarea> <br />
                                        <i className="fas fa-link"></i> <input type="text" name="website" id="website" defaultValue={user.links.website} onChange={(e) => setWebsite(e.target.value)} className="linkInput"/> <br />
                                        <i className="fab fa-github"></i> <input type="text" name="github" id="github" defaultValue={user.links.github} onChange={(e) => setGithub(e.target.value)} className="linkInput"/> <br />
                                        <i className="fab fa-twitter"></i> <input type="text" name="twitter" id="twitter" defaultValue={user.links.twitter} onChange={(e) => setTwitter(e.target.value)} className="linkInput"/>
                                    </div>
                                    <div className='permissions'>
                                        <i class="fas fa-tools" data-tip="Admin"></i><input type="checkbox" name="admin" id="admin"/> <br />
                                        <i class="fas fa-user-shield" data-tip="Mod"></i> <input type="checkbox" name="mod" id="mod" /> <br />
                                        <i class="fas fa-pencil-alt" data-tip="Author"></i> <input type="checkbox" name="author" id="author" /> <br />
                                        <i class="fab fa-dev" data-tip="Dev"></i> <input type="checkbox" name="dev" id="dev" /> <br />
                                        <i class="far fa-check-circle" data-tip="Certified User"></i> <input type="checkbox" name="certified" id="certified" /> <br />
                                    </div>

                                </div>
                            )
                        }
                        return null
                    })}
                </div>
            ) : (
                <h1>Loading</h1>
            )}
        </div>
    )
}
