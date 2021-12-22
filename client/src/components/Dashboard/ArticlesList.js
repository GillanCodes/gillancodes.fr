import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { isEmpty } from '../Utils';

export default function ArticlesList() {

    const [isLoading, setIsLoading] = useState(true)

    const articlesData = useSelector(state => state.articleReducer);

    useEffect(() => {
        if (!isEmpty(articlesData)){
            setIsLoading(false);
        }
    }, [articlesData])

    return (
        <div className="container userlist-container" key="test">

            <div className="thread-head" key="test2">
                <h1 className="title">Articles List</h1>
            </div>

            {!isLoading ? (
                
                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {articlesData.map((article) => {
                        return (
                            <tr key={article._id}>
                                <th><a href={"/article/" + article._id}>{article.title}</a></th>
                                <th><a href={"/dashboard/article/" + article._id}>Edit</a> <a href={"/dashboard/article/" +  article._id + "/delete"}>Delete</a></th>
                            </tr>
                        )
                    })}
                    
                    </tbody>
                </table>
        

            ): (
                <h1>Loading</h1>
            )}

        </div>
    )
}
