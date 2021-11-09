import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import articleReducer from "./article.reducer";

export default combineReducers({
    userReducer,
    usersReducer,
    articleReducer,
});