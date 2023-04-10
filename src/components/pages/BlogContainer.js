import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../../redux/actions/BlogActions';
import BlogComponent from './BlogComponent';
import BlogContainerSkelton from './helper/BlogContainerSkelton';

const BlogContainer = () => {
    const blog = useSelector(state => state.blog)
    const dispatch = useDispatch()

    useEffect(() => {
        if(blog.data && blog.data.length === 0){
            dispatch(fetchBlogs())
        }
    }, [blog.data, dispatch])

    return (
        <div className="grid">
            <div className="col-2"></div>
            <div className="col-8">{
                blog.loading? 
                    <BlogContainerSkelton /> : (
                        blog.error? 
                            <h3 className='center'>Unable to fetch blogs at moment. Please try again.</h3>
                            : ( blog.data && blog.data.length === 0? 
                                <h3 className='center'>No blogs available</h3>
                                : blog.data.map(blog => <BlogComponent blog={blog} key={blog.id} />)
                            )
                    )
            }
            </div>
            <div className="col-2"></div>
        </div>
    )
}

export default BlogContainer