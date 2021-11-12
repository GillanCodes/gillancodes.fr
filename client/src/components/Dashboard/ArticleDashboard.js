import React, { useState } from 'react'
import Editor from './Editor';
import { useParams } from 'react-router'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { isEmpty } from '../Utils';

export default function ArticleDashboard() {

    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);

    const articlesData = useSelector(state => state.articleReducer);

    useEffect(() => {
        if (!isEmpty(articlesData)) {
            setIsLoading(false);
        }
    }, [articlesData]);

    return (
        <>
         {!isLoading ? (
            <>
                {id ? (
                    <>
                        {articlesData.map((article) => {
                            if (article._id === id) {
                                return <Editor article={article} key={article._id} />
                            }
                            return null
                        })}
                    </>
                ): (
                    <Editor />
                )}
            
            </>
         ) : (
            <h1>LOADING</h1>
         )}
        
        </>
    )
}
