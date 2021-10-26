import axios from "axios";

export const GET_USER = "GET_USER";
export const UPDATE_USER = "UPDATE_USER";


export const getUser = (uid) => {

    return(dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}/api/user/${uid}`)
            .then((res) =>{
                dispatch({type: GET_USER, payload: res.data});
            })
            .catch((err) => {
                console.log(err);
            })
    }

}


export const userUpdate = (userId, bio, link) => {

    return(dispatch) => {
        return axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}/api/user/${userId}`,
            withCredentials: true,
            data: { bio, link}
        })
        .then((res)=> {    
            dispatch({type: UPDATE_USER, payload: res.data});
        })
        .catch((err) => {
            console.log(err);
        })
    }

}