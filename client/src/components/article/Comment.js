import React from 'react'
import { timestampParser } from '../Utils'

export default function Comment({ article }) {
    
     

    return (
        <div className="comment-container">
            
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
