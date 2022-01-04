import axios from "axios";

export const GET_EDITO = "GET_EDITO";

export const getEdito = () => {
    return (dispatch) => {
        return axios({
            method: 'get',
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/edito/`
        }).then((res) => {
            console.log(res);
            dispatch({type: GET_EDITO, payload: res.data})
        }).catch((err) => console.log(err));
    }
}