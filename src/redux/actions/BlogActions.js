import blogData from './../../data/blogs.json'
import {FETCH_BLOG_SUCCESS} from './types'

export const fetchBlogs = (start=0, end=10) => async (dispatch) => {
    dispatch({
        type: FETCH_BLOG_SUCCESS,
        payload: blogData
    })
}