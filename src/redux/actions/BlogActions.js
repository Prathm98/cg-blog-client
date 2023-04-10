import { getBlogs, likeDislikeBlog } from '../../services/blog.service'
import {FETCH_BLOG_FAIL, FETCH_BLOG_START, FETCH_BLOG_SUCCESS, LIKE_BLOG, UNLIKE_BLOG} from './types'

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

export const likeBlog = (blog_id) => async (dispatch) => {
    await likeDislikeBlog(blog_id, true);

    dispatch({
        type: LIKE_BLOG,
        payload: blog_id
    })
}

export const unlikeBlog = (blog_id) => async (dispatch) => {
    await likeDislikeBlog(blog_id, false);
    
    dispatch({
        type: UNLIKE_BLOG,
        payload: blog_id
    })
}