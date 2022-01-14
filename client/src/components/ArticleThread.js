import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ArticleView from './article/ArticleView';
import Loading from './module/Loading';
import { isEmpty } from './Utils';

export default function ArticleThread() {

    const [isLoading, setIsLoading] = useState(true)

    const articlesData = useSelector(state => state.articleReducer);

    useEffect(() => {
        if (!isEmpty(articlesData)){
            setIsLoading(false);
        }
    }, [articlesData])

    return (
        <div className="container" key="test">

            <div className="thread-head" key="test2">
                <h1 className="title">Articles</h1>
            </div>

            {!isLoading ? (
                
                <div className="articleContainer">
                    {articlesData.map((article) => {
                            return (
                                <div key={article.body}>
                                    <ArticleView article={article} cutter={article.body.length > 700 ? "700" : "full"}  /> 
                                </div>
                            ) 
                    })}
                </div>


            ): (
                <Loading />
            )}

        </div>
    )
}
