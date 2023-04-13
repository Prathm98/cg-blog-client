import { getBlogs, likeDislikeBlog } from '../../services/blog.service'
import {Add_COMMENT, FETCH_BLOG_FAIL, FETCH_BLOG_START, FETCH_BLOG_SUCCESS, LIKE_BLOG, UNLIKE_BLOG} from './types'

// It fetched the blogs from server and dispatches the action for the same
export const fetchBlogs = (start=0, end=10) => async (dispatch) => {
    dispatch({
        type: FETCH_BLOG_START
    })

    // Get blogs service call
    const data = await getBlogs();

    if(data){
        // Dispatch action for fetch success
        dispatch({
            type: FETCH_BLOG_SUCCESS,
            payload: data
        })
    }else{
        // Dispatch action for fetch failure
        dispatch({
            type: FETCH_BLOG_FAIL,
            payload: "Unable to fetch blogs"
        })
    }
}

// Likes the blog and update the state for the same
export const likeBlog = (blog_id) => async (dispatch) => {
    // service call for blog like
    const res = await likeDislikeBlog(blog_id, true);

    if(res){
        dispatch({
            type: LIKE_BLOG,
            payload: blog_id
        })
    }
}

// Unlikes the blog and update the state for the same
export const unlikeBlog = (blog_id) => async (dispatch) => {
    // service call for blog like
    const res = await likeDislikeBlog(blog_id, false);
    
    if(res){
        dispatch({
            type: UNLIKE_BLOG,
            payload: blog_id
        })
    }
}

// Updates state for comment
export const commentBlog = (comment) => async (dispatch) => {
    dispatch({
        type: Add_COMMENT,
        payload: comment
    })
}

export const likeUnlikeBlog = (blog_id, isLiked) => dispatch => {
    if(isLiked){
        dispatch({
            type: LIKE_BLOG,
            payload: blog_id
        })
    }else{
        dispatch({
            type: UNLIKE_BLOG,
            payload: blog_id
        })
    }
}