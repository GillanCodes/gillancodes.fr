import { GET_USER, UPDATE_USER } from "../actions/user.action";

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
        default:
            return state;
    }
}