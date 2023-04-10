import React from 'react'
import { Card } from 'primereact/card';
import { Link } from 'react-router-dom';
import { likeBlog } from '../../redux/actions/BlogActions';
import { useDispatch } from 'react-redux';

const BlogComponent = ({blog: {id, title, likes, comments, description, username, created, isLiked}}) => {
    const dispatch = useDispatch();
    const subTitle = (
        <sup>5 Apr, 23 : Posted by &nbsp;
            <Link to={`/users/${username}`}>{username}</Link>
            </sup> 
    )
    const footer = (
        <div className="flex flex-wrap justify-content gap-2">
            { isLiked == 0?
                <i className="cursor-pointer pi pi-thumbs-up" style={{color: 'black'}}
                onClick={() => dispatch(likeBlog(id, "test"))}></i>
                :<i className="cursor-pointer pi pi-thumbs-up-fill" style={{color: 'black'}}></i>
            } {likes}
            <i className="cursor-pointer pi pi-comments" style={{color: 'black'}}></i> {comments}
        </div>
    );

  return (
    <div className="card flex justify-content-center mt-4">
        <Card title={title} subTitle={subTitle} footer={footer} style={{width: '100%'}} >
            <p className="m-0">
                {description}
            </p>
        </Card>
    </div>
  )
}

export default BlogComponent