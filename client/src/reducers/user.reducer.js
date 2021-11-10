import { GET_USER, UPDATE_USER, UPLOAD_USER_PIC } from "../actions/user.action";

const initialState = {};

export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case GET_USER:
            return action.payload;
        case UPDATE_USER:
            return {
                ...state,
                bio: action.payload.bio,
                links: action.payload.links,
            };
        case UPLOAD_USER_PIC:
            return {
                ...state,
                userpic: action.payload
            }
        default:
            return state;
    }
}