import React from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { deleteArticle } from '../../actions/admin.action';
import { getArticles } from '../../actions/article.action';

export default function ArticleDelete() {
    
    const {id} = useParams();

    const dispatch = useDispatch();

    const deleteHandle = () => {
        console.log('click')
        dispatch(deleteArticle(id))
            .then(() => dispatch(getArticles())
            .then(() => window.location = `/article/${id}`))
        
        // 
    }
    
    
    return (
        <div className='delete-fields'>
            <h1>Delete Article {id} ?</h1>

            <div className="buttons">
                <p onClick={() => deleteHandle()} className='btn error'>Yes</p>
                <p onClick={() => document.location = "/articles"} className='btn sucess'>No</p>
            </div>
        </div>
    )
}
