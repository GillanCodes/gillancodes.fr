import { GET_EDITO_HISTORY } from "../actions/admin.action";
import { GET_EDITO } from "../actions/edito.action";

const initialState = {};

export default function editoReducer(state = initialState, action){
    switch(action.type) {
        case GET_EDITO_HISTORY:
            return action.payload;
        case GET_EDITO:
            return action.payload;
        default:
            return state;
    }
}