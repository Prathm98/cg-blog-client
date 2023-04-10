import { getBlogs } from '../../services/blog.service'
import {FETCH_BLOG_FAIL, FETCH_BLOG_START, FETCH_BLOG_SUCCESS, LIKE_BLOG} from './types'

export const fetchBlogs = (start=0, end=10) => async (dispatch) => {
    dispatch({
        type: FETCH_BLOG_START
    })

    const data = await getBlogs();

    if(data){
        dispatch({
            type: FETCH_BLOG_SUCCESS,
            payload: data
        })
    }else{
        dispatch({
            type: FETCH_BLOG_FAIL,
            payload: "Unable to fetch blogs"
        })
    }
}

export const likeBlog = (blog_id, user_id) => async (dispatch) => {
    dispatch({
        type: LIKE_BLOG,
        payload: blog_id
    })
}