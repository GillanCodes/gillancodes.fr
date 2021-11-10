import axios from "axios";

export const GET_USER = "GET_USER";
export const UPDATE_USER = "UPDATE_USER";
export const UPLOAD_USER_PIC = "UPLAOD_USER_PIC";


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


export const userUpdate = (userId, bio, links) => {

    return(dispatch) => {
        return axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}/api/user/${userId}`,
            withCredentials: true,
            data: {bio, links}
        })
        .then((res)=> {    
            dispatch({type: UPDATE_USER, payload: res.data});
        })
        .catch((err) => {
            console.log(err);
        })
    }

}

export const uploadUserPic = (data, id) => {
    return (dispatch) => {
        return axios({
            method: 'post',
            withCredentials: true,
            url : `${process.env.REACT_APP_API_URL}/api/user/upload/picture`,
            data: data
        }).then((res) => {
                if(res.data.errors) {
                    return null//dispatch({type : GET_USER_ERRORS, payload: res.data.errors});
                } else {                  
                    //dispatch({type : GET_USER_ERRORS, payload: ""});
                    return axios
                        .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
                        .then((res) => {
                            dispatch({  Type: UPLOAD_USER_PIC, payload: res.data.userpic})
                        }).catch(err =>  console.log(err))
                }
                
            })
            .catch((err) => {
                console.log(err);
            })
    }
}