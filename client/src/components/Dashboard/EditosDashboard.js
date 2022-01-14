import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { EditoHistory } from '../../actions/admin.action';
import Loading from '../module/Loading';
import { isEmpty } from '../Utils';

export default function EditoDashboard() {

    const [isLoading, setIsLoading] = useState(true);
    const [isDispatched, setIsDispatched] = useState(false)

    const dispatch = useDispatch();

    const editosData = useSelector(state => state.editoReducer);
    
    useEffect(() => {
        if (!isDispatched) {
            dispatch(EditoHistory());
            setIsDispatched(true);
        }
        if (!isEmpty(editosData)){
            setIsLoading(false);
        }

    }, [editosData, isLoading, dispatch, isDispatched])

    return (
        <div className="container userlist-container" key="test">

            <div className="thread-head" key="test2">
                <h1 className="title">Editos List</h1>
            </div>

            {!isLoading ? (
                
                <table>
                    <thead>
                        <tr>
                            <th>Edito Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {editosData.map((edito) => {
                        return (
                            <tr key={edito._id}>
                                <th>{edito.title}</th>
                                <th><a href={"/dashboard/edito/" + edito._id}>Edit</a> <a href={"/dashboard/edito/" +  edito._id + "/delete"}>Delete</a></th>
                            </tr>
                        )
                    })}

                            <tr>
                                <th>New Edito</th>
                                <th><a href={"/dashboard/edito/"}>Create</a></th>
                            </tr>
                    
                    </tbody>
                </table>
        

            ): (
                <Loading />
            )}

        </div>
    )
}
