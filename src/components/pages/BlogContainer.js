import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlog } from '../../redux/features/blogSlice';
import BlogComponent from './BlogComponent';
import BlogContainerSkelton from './helper/BlogContainerSkelton';
import MessageComponent from './helper/MessageComponent';

// Blog container component to load all blog cards
const BlogContainer = () => {
    // Declaration and Initialization of states and dispatch
    const blog = useSelector(state => state.blog)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const toast = useRef(null)

    // effect for blogs fetching
    useEffect(() => {
        if(!blog.isFetched){
            dispatch(fetchBlog())
        }
    }, [blog.isFetched, dispatch])

    return (
        <div className="grid">
            <Toast ref={toast} />
            {user && 
                <div className="lg:col-12 md:col-12 col-12 mt-4 text-right create-blog-button">
                    <Link to="/blogs/post" className='mr-4'>
                        <Button icon="pi pi-plus-circle" iconPos="right">
                            &nbsp;Post new Blog
                        </Button>
                    </Link>
                </div>}
            <div className="lg:col-2 md:col-2 col-1"></div>
            <div className="lg:col-8 md:col-8 col-10">{
                blog.loading? 
                    <BlogContainerSkelton /> : (
                        blog.error? 
                            <MessageComponent 
                                message="Unable to fetch blogs at moment. Please try again." 
                                type="error" />
                            : ( blog.data && blog.data.length === 0? 
                                <MessageComponent 
                                    message="No blogs available" 
                                    type="not-found" />
                                : blog.data.map(blog => 
                                    <BlogComponent 
                                        blog={blog} 
                                        key={blog.id} 
                                        user={user} 
                                        toast={toast} />)
                            )
                    )
            }
            </div>
            <div className="lg:col-2 md:col-2 col-1"></div>
        </div>
    )
}

export default BlogContainer