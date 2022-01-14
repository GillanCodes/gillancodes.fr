import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import ArticleView from '../article/ArticleView';
import { timestampParser } from '../Utils';
import UserInfo from './UserInfo';

export default function ProfileBody({user}) {

    const articleData = useSelector((state) => state.articleReducer);

    const [tab, setTab] = useState("coms")


    return (

        <div className="profil-body">
            <div className="profil-tabs">
                <ul>
                    <li className={tab === "coms" ? "is-active" : ""} onClick={() => setTab("coms")}>Comments</li>
                    {user.permissions.AUTHOR && (<li className={tab === "posts" ? "is-active" : ""} onClick={() => setTab("posts")}>Posts</li>)}  
                </ul>
            </div>
            {user.permissions.AUTHOR && (
                <>
                    {tab === "posts" &&  (
                        <div className="articleContainer profil-article">
                        {articleData.map((article) => {
                            if (article.author === user.username) {
                                return <ArticleView article={article} cutter="500" key={article._id}/>
                            }

                            return null
                        })}
                    </div>
                    )}
                </>
            )}

            {tab === "coms" && (
                <div className="comment-container articleContainer">
                    {articleData.map((article) => {
                        return <>
                            {article.comments.map((comment) => {
                                if (comment.commenterUsername === user.username){
                                    return (
                                        <div className="comment">
                                            <h2 data-tip="Voir l'article"><a href={"/article/" + article._id}>{article.title}</a></h2>
                                            <div className="comment-head">
                                                <UserInfo username={comment.commenterUsername} withBadges userPic="small" linked/>
                                            </div>
                                            <div className="comment-body">
                                                <p>{comment.text}</p>
                                            </div>
                                            <div className="comment-footer">
                                                <p className="date">{timestampParser(comment.timestamp)}</p>
                                            </div>
                                            <ReactTooltip/>
                                        </div>
                                    )
                                }

                                return null
                            })}
                        </>
                    })}
                </div>
            )}
        </div>

    )
}
