import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ArticleView from './article/ArticleView';
import EditoView from './edito/EditoView';
import Loading from './module/Loading';
import OffersModule from './module/OffersModule';
import { isEmpty } from './Utils';

export default function Home() {
    
    const [isLoading, setIsLoading] = useState(true)
    const [edito, setedito] = useState(false)

    const articlesData = useSelector(state => state.articleReducer);
    const editoData = useSelector(state => state.editoReducer)

    useEffect(() => {
        if (!isEmpty(articlesData)){
            setIsLoading(false);
        }
        if (!isEmpty(editoData)){
            setedito(true);
        }
    }, [articlesData, editoData])

    return (
        <div className="container" key="test">

            <div className="thread-head" key="test2">
                <h1 className="title">Gillancodes - Developpeur Freelance</h1>
            </div>

            {!isLoading ? (
                
                <div className="article-edito">
                    <div className="articleContainer">
                        <div className="thread-head" key="test2">
                            <h2 className="title">Dernier Article</h2>
                        </div>
                        <ArticleView article={articlesData[0]} cutter={articlesData[0].body.length > 700 ? "700" : "full"}  /> 
                    </div>

                    {edito && (
                        <div className="articleContainer">
                        <div className="thread-head" key="test2">
                                <h2 className="title">Edito</h2>
                            </div>
                            <EditoView edito={editoData[0]} /> 
                        </div>
                    )}
                </div>


            ): (
                <Loading />
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
                <OffersModule />
            </div>

        </div>
    )
}
