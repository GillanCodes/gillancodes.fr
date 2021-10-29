import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router'
import ArticleView from './article/ArticleView';
import { isEmpty } from './Utils';

export default function Article() {
    
    const {id} = useParams();

    const [isLoading, setIsLoading] = useState(true)
    
    const userData = useSelector(state => state.userReducer);
    const articlesData = useSelector(state => state.articleReducer);

    useEffect(() => {
        if (!isEmpty(userData) && !isEmpty(articlesData)){
            setIsLoading(false);
        }
    }, [userData, articlesData])

    return (
        <div className="articleContainer">
            {!isLoading ? (
                <>
                    {articlesData.map((article) => {
                        if (article._id === id) {
                            return <ArticleView article={article} key={article._id} />
                        }
                        return null
                    })}
                </>
            ) : (
                <h1>Loading</h1>
            )}
        </div>
    )
}
