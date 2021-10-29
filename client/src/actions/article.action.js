import axios from "axios";

export const GET_ARTICLES = "GET_ARTICLES";

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