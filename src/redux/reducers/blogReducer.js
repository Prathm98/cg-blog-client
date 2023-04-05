import { FETCH_BLOG_SUCCESS, LIKE_BLOG, UNLIKE_BLOG } from "../actions/types";

const initialState = {data:[], error: null}

const blogReducer = (state=initialState, action) => {
    let updatedData;
    switch(action.type){
        case FETCH_BLOG_SUCCESS:
            return {...state, data: [...state.data, ...action.payload]}
        case LIKE_BLOG:
            updatedData = state.data.map(item => {
                if(item.id === action.payload){
                    return {...item, likes: item.likes + 1}
                }else{
                    return item;
                }
            })
            return {...state, data: [...updatedData]}
        case UNLIKE_BLOG:
            updatedData = state.data.map(item => {
                if(item.id === action.payload){
                    return {...item, likes: item.likes + 1}
                }else{
                    return item;
                }
            })
            return {...state, data: [...updatedData]}
        default:
            return state;
    }
}

export default blogReducer