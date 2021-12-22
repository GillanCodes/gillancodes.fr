import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ArticleView from './article/ArticleView';
import Offers from './module/Offers';
import { isEmpty } from './Utils';

export default function Home() {
    
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
                <h1 className="title">Gillancodes - Developpeur Freelance</h1>
            </div>

            {!isLoading ? (
                
                <div className="articleContainer">
                    <div className="thread-head" key="test2">
                        <h2 className="title">Dernier Article</h2>
                    </div>
                    <ArticleView article={articlesData[0]} cutter={articlesData[0].body.length > 700 ? "700" : "full"}  /> 
                </div>


            ): (
                <h1>Loading</h1>
            )}

            <div className="thread-head" key="test2">
                <h1 className="title">A propos</h1>
            </div>

            <div className="about-container">
                
            </div>


            <div className="thread-head" key="test2">
                <h1 className="title">Les Offres</h1>
            </div>

            <div>
                <Offers />
            </div>

        </div>
    )
}
