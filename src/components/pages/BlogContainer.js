import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../../redux/actions/BlogActions';
import BlogComponent from './BlogComponent';
import BlogContainerSkelton from './helper/BlogContainerSkelton';

const BlogContainer = () => {
    const blog = useSelector(state => state.blog)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const toast = useRef(null)

    useEffect(() => {
        if(blog.data && blog.data.length === 0){
            dispatch(fetchBlogs())
        }
    }, [blog.data, dispatch])

    return (
        <div className="grid">
            <Toast ref={toast} />
            {user && <div className="lg:col-12 md:col-12 col-12 mt-4 text-right create-blog-button">
                <Link to="/blogs/post" className='mr-4'><Button icon="pi pi-plus-circle" iconPos="right">&nbsp;Post new Blog</Button></Link>
            </div>}
            <div className="lg:col-2 md:col-2 col-1"></div>
            <div className="lg:col-8 md:col-8 col-10">{
                blog.loading? 
                    <BlogContainerSkelton /> : (
                        blog.error? 
                            <h3 className='center'>Unable to fetch blogs at moment. Please try again.</h3>
                            : ( blog.data && blog.data.length === 0? 
                                <h3 className='center'>No blogs available</h3>
                                : blog.data.map(blog => <BlogComponent blog={blog} key={blog.id} 
                                    user={user} toast={toast} />)
                            )
                    )
            }
            </div>
            <div className="lg:col-2 md:col-2 col-1"></div>
        </div>
    )
}

export default BlogContainer