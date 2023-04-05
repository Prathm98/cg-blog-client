import blogData from './../../data/blogs.json'
import {FETCH_BLOG_SUCCESS, LIKE_BLOG} from './types'

export const fetchBlogs = (start=0, end=10) => async (dispatch) => {
    dispatch({
        type: FETCH_BLOG_SUCCESS,
        payload: blogData
    })
}

export const likeBlog = (blog_id, user_id) => async (dispatch) => {
    dispatch({
        type: LIKE_BLOG,
        payload: blog_id
    })
}