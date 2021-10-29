import { GET_ARTICLES } from "../actions/article.action";

const initialState = {};

export default function articleReducer(state = initialState, action){
    switch(action.type) {
        case GET_ARTICLES:
            return action.payload;
        default:
            return state;
    }
}