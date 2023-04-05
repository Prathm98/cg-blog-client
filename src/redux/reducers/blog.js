import { FETCH_BLOG_SUCCESS } from "../actions/types";

const initialState = {data:[], error: null}

const blogReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_BLOG_SUCCESS:
            return {...state, data: [...state.data, ...action.payload]}
        default:
            return state;
    }
}

export default blogReducer