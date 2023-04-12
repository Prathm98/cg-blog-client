import { Avatar } from 'primereact/avatar';
import { Card } from 'primereact/card'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { getBlogsByUserName } from '../../services/blog.service';
import { getFirstChar } from '../../utils/helpers'
import BlogContainerSkelton from './helper/BlogContainerSkelton';
import BlogComponent1 from './BlogComponent1';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

const UserProfile = () => {
    const user = useSelector(state => state.user);
    const {username} = useParams();
    const [blogs, setBlogs] = useState(null);
    const toast = useRef(null)

    useEffect(()=>{
        getBlogsByUserName(username).then(data => {
            setBlogs(data);
        })
    }, [username])

    const likeAction = (id, isLiked) => {
        let updatedBlogs = blogs.blogs.map(blog => {
            if(+blog.id === +id){
                if(isLiked) return {...blog, likes: +blog.likes + 1, isLiked}
                return {...blog, likes: +blog.likes - 1, isLiked}
            }
            return blog;
        });
        setBlogs({...blogs, blogs: [...updatedBlogs]})
    }

    return (
        <div className="grid">
            <Toast ref={toast} />
            <div className="lg:col-2 md:col-2 col-1"></div>
            <div className="lg:col-8 md:col-8 col-10 mt-4">
                {blogs !== null ? 
                <Card>
                    <div className='user-card'>
                        <div>
                            <Link to={`/user/${username}`}>
                                <Avatar label={getFirstChar(username)} size="xlarge" shape="circle" />
                            </Link>
                        </div>
                        <div className='user-card-content'>
                            <div className='user-name-title'>{blogs.user.name}</div>
                            @{username} <br />
                            Total Blogs: {blogs.blogs.length}
                        </div>
                    </div>
                    <div>
                        {user && <div className="col-12 mt-4 create-blog-button text-right">
                            <Link to="/blogs/post" className='mr-4'><Button icon="pi pi-plus-circle" iconPos="right">&nbsp;Post new Blog</Button></Link>
                        </div>}
                        <h4 style={{textTransform: 'capitalize'}}>{username}'s Blogs</h4>
                        {(
                            blogs.blogs && blogs.blogs.length === 0? 
                                <h3 className='center'>No blogs available</h3>
                                : blogs.blogs.map(blog => 
                                    <BlogComponent1  
                                    likeAction={likeAction}
                                    user={user} toast={toast}
                                    blog={blog} key={blog.id} />)
                            )
                        }
                    </div>
                </Card>:
                <Card><BlogContainerSkelton /></Card> }
            </div>
            <div className="lg:col-2 md:col-2 col-1"></div>
        </div>
    )
}

export default UserProfile