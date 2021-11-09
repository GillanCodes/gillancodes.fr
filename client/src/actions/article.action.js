import axios from "axios";

export const GET_ARTICLES = "GET_ARTICLES";
export const LIKE_ARTICLE = "LIKE_ARTICLE";
export const DISLIKE_ARTICLE = "DISLIKE_ARTICLE";
export const ADD_COMMENT = "ADD_COMMENT";

export const getArticles = () => {

    return(dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}/api/article/`)
            .then((res) => {
                dispatch({type: GET_ARTICLES, payload: res.data})
            })  
            .catch((err) => {
                console.log(err);
            })
    }

}

export const likeArticle = (articleId, userId) => {
    return(dispatch) => {
        return axios({
            method:'patch',
            url: `${process.env.REACT_APP_API_URL}/api/article/like/` + articleId,
            withCredentials: true,
            data: {userId}
        })
        .then((res) => {
            dispatch({type: LIKE_ARTICLE, payload: {articleId, userId}});
        }).catch((err) => console.log(err));
    }   
}

export const dislikeArticle = (articleId, userId) => {
    return(dispatch) => {
        return axios({
            method:'patch',
            url: `${process.env.REACT_APP_API_URL}/api/article/dislike/` + articleId,
            withCredentials: true,
            data: {userId}
        })
        .then((res) => {
            dispatch({type: DISLIKE_ARTICLE, payload: {articleId, userId}});
        }).catch((err) => console.log(err));
    }   
}

export const addComment = (comment, articleId) => {
    return(dispatch) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}/api/article/${articleId}/comment/post`,
            withCredentials: true,
            data: {
                text: comment
            }
        }).then((res) => {
            dispatch({type: ADD_COMMENT, payload: res.data});
        }).catch(err => console.log(err));
    }
}
