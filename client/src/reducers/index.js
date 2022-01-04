import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import articleReducer from "./article.reducer";
import editoReducer from "./edito.reducer";

export default combineReducers({
    userReducer,
    usersReducer,
    articleReducer,
    editoReducer
});