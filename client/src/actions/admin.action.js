import axios from "axios";

export const UPDATE_USER = "UPDATE_USER";

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