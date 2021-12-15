import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { dislikeArticle, likeArticle } from '../../actions/article.action'
import { UidContext } from '../App.context';

export default function LikeArticleButton({ article }) {
    
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext)
    
    const dispatch = useDispatch();

    const like = () => {
        dispatch(likeArticle(article._id, uid))
        setLiked(true);
    }

    const unlike = () => {
        dispatch(dislikeArticle(article._id, uid))
        setLiked(false);
    }
    useEffect(() => {
        if (article.likers.includes(uid)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
        // eslint-disable-next-line
    }, [uid]);
    
    return (
        <>
            {uid && liked === false && (
                <i className="far fa-heart" onClick={like}></i>
            )}

            {uid && liked === true && (
                <i className="fas fa-heart liked" onClick={unlike}></i> 
            )}
        </>
    )
}
