import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { dislikeArticle, likeArticle } from '../../actions/article.action'
import { UidContext } from '../App.context';

export default function LikeArticleButton(props) {
    
    const [liked, setLiked] = useState(false);

    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const likeHandle = () => {
        dispatch(likeArticle(props.article._id, uid))
        setLiked(true);
        console.log(liked + " | Like")
    }
  
    const dislikeHandle = () => {
        dispatch(dislikeArticle(props.article._id, uid))
        setLiked(false);
        console.log(liked + " | Dislike")
    }

    useEffect(() => {
        if(props.article.likers.includes(uid)){
            setLiked(true);
            console.log(liked + " | Like UseEffetc")
        } else {
            setLiked(false);
            console.log(liked + " | Dislike UseEffect")
        }
        return
    }, [uid, props.article, liked]);
    
    return (
        <>
            {liked === true && (
                <i className="fas fa-heart" onClick={dislikeHandle}></i> 
            )}

            {liked === false && (
                <i className="far fa-heart" onClick={likeHandle}></i>   
            )}
        </>
    )
}
