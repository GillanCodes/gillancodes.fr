import axios from "axios";

export const GET_ARTICLES = "GET_ARTICLES";
export const LIKE_ARTICLE = "LIKE_ARTICLE";
export const DISLIKE_ARTICLE = "DISLIKE_ARTICLE";

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
            data: {userId}
        })
        .then((res) => {
            dispatch({type: DISLIKE_ARTICLE, payload: {articleId, userId}});
        }).catch((err) => console.log(err));
    }   
}
