import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ArticleView from './article/ArticleView';
import { isEmpty } from './Utils';

export default function ArticleThread() {

    const [isLoading, setIsLoading] = useState(true)

    const userData = useSelector(state => state.userReducer);
    const articlesData = useSelector(state => state.articleReducer);

    useEffect(() => {
        if (!isEmpty(userData) && !isEmpty(articlesData)){
            setIsLoading(false);
        }
    }, [userData, articlesData])

    return (
        <div className="container">

            <div className="thread-head">
                <h1 className="title">Articles</h1>
            </div>

            {!isLoading ? (
                
                <div className="articleContainer">
                    {articlesData.map((article) => {
                            return <ArticleView article={article} cutter={article.body.length > 700 ? "700" : "full"} />  
                    })}
                </div>


            ): (
                <h1>Loading</h1>
            )}

        </div>
    )
}
