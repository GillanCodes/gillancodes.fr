import React from 'react'

export default function Comment({ article }) {
    
    

    return (
        <div className="comment-container">
            
           {article.comments.map((comment) => {
                return (
                    <div className="comment">
                        <div className="comment-head">
                            <img src={comment.commenterPic} alt={comment.commenterUsername} />
                            <p>{comment.commenterUsername}</p>
                        </div>
                        <div className="comment-body">
                            <p>{comment.text}</p>
                        </div>
                        <div className="comment-footer">
                            {comment.timestamp}
                        </div>
                    </div>
                )

           })}
        </div>

    )
}
