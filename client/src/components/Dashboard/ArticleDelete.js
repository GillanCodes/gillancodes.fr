import React from 'react'
import { useParams } from 'react-router-dom'

export default function ArticleDelete() {
    
    const {id} = useParams();

    const deleteHandle = () => {

    }
    
    const cancelHandle = () => {

    }
    
    
    
    return (
        <div>
            <h1>Delete Article {id} ?</h1>

            <div className="buttons">
                <p>Yes</p>
                <p>No</p>
            </div>
        </div>
    )
}
