import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import articleReducer from "./article.reducer";

export default combineReducers({
    userReducer,
    articleReducer,
})