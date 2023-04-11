import React from 'react'
import { Card } from 'primereact/card';
import { Link } from 'react-router-dom';
import { likeBlog, unlikeBlog } from '../../redux/actions/BlogActions';
import { useDispatch } from 'react-redux';
import { formatDate } from '../../utils/helpers';

const BlogComponent = ({blog: {id, title, likes, comments, description, username, created, isLiked}}) => {
    const dispatch = useDispatch();
    
    const titleHeader = (
        <Link to={`/blogs/${id}/view`} className="blog-title">{title}</Link>
    )

    const subTitle = (
        <sup>{formatDate(created)} : Posted by &nbsp;
            <Link to={`/users/${username}`}>{username}</Link>
        </sup> 
    )
    const footer = (
        <div className="flex flex-wrap justify-content gap-2">
            { +isLiked === 0?
                <i className="cursor-pointer pi pi-thumbs-up" style={{color: 'black'}}
                onClick={() => dispatch(likeBlog(id))}></i>
                :<i className="cursor-pointer pi pi-thumbs-up-fill" style={{color: 'black'}}
                onClick={() => dispatch(unlikeBlog(id))}></i>
            } {likes}
            <i className="cursor-pointer pi pi-comments" style={{color: 'black'}}></i> {comments}
        </div>
    );

  return (
    <div className="card flex justify-content-center mt-4">
        <Card title={titleHeader} subTitle={subTitle} footer={footer} style={{width: '100%'}} >
            <p className="m-0">
                {description}
            </p>
        </Card>
    </div>
  )
}

export default BlogComponent