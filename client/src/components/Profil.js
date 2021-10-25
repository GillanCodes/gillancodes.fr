import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import { UidContext } from './App.context'
import Log from './Log'
import ProfilPage from './Profil/ProfilPage';

export default function Profil() {
    
    const uid = useContext(UidContext);
    
    return (
        <div className="log-container">
            {uid ? (
                <ProfilPage />
            ): (
                <Log singUp={false} singIn={true} />
            )}
        </div>
    )
}
