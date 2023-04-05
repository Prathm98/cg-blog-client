import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../../redux/actions/BlogActions';
import BlogComponent from './BlogComponent';

const BlogContainer = () => {
    const blog = useSelector(state => state.blog)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(blog);
        if(blog.data.length === 0){
            dispatch(fetchBlogs())
        }
    }, [])

    return (
        <div className="grid">
            <div className="col-2"></div>
            <div className="col-8">
                {blog.data.map(blog => <BlogComponent blog={blog} key={blog.id} />) }
            </div>
            <div className="col-2"></div>
        </div>
    )
}

export default BlogContainer