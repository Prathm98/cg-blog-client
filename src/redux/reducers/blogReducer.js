import { Add_COMMENT, FETCH_BLOG_FAIL, FETCH_BLOG_START, FETCH_BLOG_SUCCESS, LIKE_BLOG, UNLIKE_BLOG } from "../actions/types";

const initialState = {data: [], error: null, loading: false}

const blogReducer = (state=initialState, action) => {
    let updatedData;
    switch(action.type){
        case FETCH_BLOG_SUCCESS:
            return {
                ...state, 
                data: [...action.payload], 
                loading: false
            }
        case FETCH_BLOG_START:
            return {
                ...state, 
                loading: true
            }
        case FETCH_BLOG_FAIL:
            return {
                ...state, 
                loading: false, 
                error: action.payload
            }
        case LIKE_BLOG:
            updatedData = state.data.map(item => {
                if(item.id === action.payload){
                    return {...item, likes: +item.likes + 1, isLiked: "1"}
                }else{
                    return item;
                }
            })
            return {
                ...state, 
                data: [...updatedData]
            }
        case UNLIKE_BLOG:
            updatedData = state.data.map(item => {
                if(item.id === action.payload){
                    return {...item, likes: +item.likes - 1, isLiked: "0"}
                }else{
                    return item;
                }
            })
            return {
                ...state, 
                data: [...updatedData]
            }
        case Add_COMMENT:
            updatedData = state.data.map(item => {
                if(item.id === action.payload){
                    return {...item, comments: +item.comments + 1}
                }else{
                    return item;
                }
            })
            return {
                ...state, 
                data: [...updatedData]
            }
        default:
            return state;
    }
}

export default blogReducer