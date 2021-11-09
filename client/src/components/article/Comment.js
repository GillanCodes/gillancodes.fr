import React, { useContext, useState } from 'react'
import { UidContext } from '../App.context';
import { useDispatch } from 'react-redux';
import { isEmpty, timestampParser } from '../Utils'
import { addComment, getArticles } from '../../actions/article.action';

export default function Comment({ article }) {
    
    const [comment, setComment] = useState("");
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const handlePostComment = (e) => {
        e.preventDefault();

        if (comment) {
            dispatch(addComment(comment, article._id))
                .then(() => dispatch(getArticles()))
                .then(() => setComment(''))
        }

    }
     

    return (
        <div className="comment-container">

            {uid && (
                <>
                    <div className="spacer"></div>

                    <div className="form">
                        <textarea name="comment" id="comment" onChange={(e) => setComment(e.target.value)}></textarea>
                        <input type="submit" className="submit-btn" onClick={handlePostComment}/>
                    </div>
                </>
            )}

            {!isEmpty(article.comments) && (
                <div className="spacer"></div>
            )}
            
           {article.comments.map((comment) => {
                return (
                    
                    <div className="comment">
                        <div className="comment-head">
                            <img className="user-icon" src={comment.commenterPic} alt={comment.commenterUsername} />
                            <p>{comment.commenterUsername}</p>
                        </div>
                        <div className="comment-body">
                            <p>{comment.text}</p>
                        </div>
                        <div className="comment-footer">
                            <p className="date">{timestampParser(comment.timestamp)}</p>
                        </div>
                    </div>
                )

           })}
        </div>

    )
}
