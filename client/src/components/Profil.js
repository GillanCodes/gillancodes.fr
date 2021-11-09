import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { UidContext } from './App.context'
import Log from './Log'
import ProfilPage from './Profil/ProfilPage';
import UserPage from './Profil/UserPage';

export default function Profil() {
    
    const uid = useContext(UidContext);
    const {username} = useParams();
    
    return (
        <div className="log-container">
            {username ? (
                <UserPage username={username} />
            ) : (
                <>
                    {uid ? (
                        <ProfilPage />
                    ): (
                        <Log singUp={false} singIn={true} />
                    )}
                </>
            )}
            
            
        </div>
    )
}
