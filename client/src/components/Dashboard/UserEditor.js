import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router'
import Loading from '../module/Loading';
import { isEmpty } from '../Utils';
import UserUpdator from './UserUpdator';

export default function UserEditor() {

    const { username } = useParams();

    const [isLoading, setIsLoading] = useState(true);
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
                            return <UserUpdator user={user} /> 
                        }
                        return null
                    })}
                </div>
            ) : (
                <Loading />
            )}
        </div>
    )
}
