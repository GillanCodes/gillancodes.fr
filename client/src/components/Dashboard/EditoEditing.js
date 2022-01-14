import React, { useState } from 'react'
import EditoEditor from './EditoEditor';
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { isEmpty } from '../Utils';
import { EditoHistory } from '../../actions/admin.action';
import Loading from '../module/Loading';

export default function EditoEditing() {

    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [isDispatched, setIsDispatched] = useState(false)

    const dispatch = useDispatch();

    const editosData = useSelector(state => state.editoReducer);
    

    useEffect(() => {
        if (!isDispatched) {
            dispatch(EditoHistory());
            setIsDispatched(true);
        }
        if (!isEmpty(editosData)) {
            setIsLoading(false);
        }
    }, [editosData, dispatch, isDispatched]);

    return (
        <>
            {id ? (
                <>
                    {!isLoading ? (
                        <>
                            {editosData.map((edito) => {
                                if (edito._id === id) {
                                    return <EditoEditor edito={edito} key={edito._id} />
                                }
                                return null
                            })}
                        </>
                    ): (
                        <Loading />
                    )}
                
                </>
         ) : (
            <EditoEditor />
         )}
        
        </>
    )
}
