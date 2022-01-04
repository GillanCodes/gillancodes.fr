import axios from "axios";

export const UPDATE_USER = "UPDATE_USER";
export const DELETE_ARTICLE = "DELETE_ARTICLE";
export const GET_EDITO_HISTORY = "GET_EDITO_HISTORY";

export const updateUserAdmin = (userId, data) => {
    return (dispatch) => {
        return axios({
            method: "put",
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/user/${userId}`,
            data
        }).then((res) => {
            dispatch({type: UPDATE_USER, payload: res.data});
        }).catch(err => console.log(err));
    }

}

export const updatePermissionsUserAdmin = (userId, data) => {
    return (dispatch) => {
        return axios({
            method: "put",
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/user/${userId}/permissions`,
            data
        }).then((res) => {
            dispatch({type: UPDATE_USER, payload: res.data});
        }).catch(err => console.log(err));
    }
}

export const deleteArticle = (articleId) => {
    return (dispatch) => {
        return axios({
            method: 'delete',
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/article/${articleId}/delete`
        }).then((res) => {
            console.log(res);
            dispatch({type: DELETE_ARTICLE, payload: res.data})
        }).catch((err) => console.log(err));
    }
}

export const EditoHistory = () => {
    return (dispatch) => {
        return axios({
            method: 'get',
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/edito/history`
        }).then((res) => {
            console.log(res);
            dispatch({type: GET_EDITO_HISTORY, payload: res.data})
        }).catch((err) => console.log(err));
    }
}