import { ADD_COMMENT, DISLIKE_ARTICLE, GET_ARTICLES, LIKE_ARTICLE } from "../actions/article.action";

const initialState = {};

export default function articleReducer(state = initialState, action){
    switch(action.type) {
        case GET_ARTICLES:
            return action.payload;
        case LIKE_ARTICLE:
            return state.map((article) => {
                if (article._id === action.payload.articleId){
                    return {
                        ...article,
                        likers: [action.payload.articleId, ...article.likers]
                    }
                }
                return article
            })
        case DISLIKE_ARTICLE:
            return state.map((article) => {
                if(article._id === action.payload.articleId){
                    return {
                        ...article,
                        likers : article.likers.filter((id) => id !== action.payload.userId)
                    }
                }
                return article
            });
        case ADD_COMMENT:
            
        default:
            return state;
    }
}