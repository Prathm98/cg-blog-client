import React from 'react'
import { Card } from 'primereact/card';
import { Link } from 'react-router-dom';
import { likeBlog, unlikeBlog } from '../../redux/actions/BlogActions';
import { useDispatch } from 'react-redux';
import { formatDate, truncateText } from '../../utils/helpers';

const BlogComponent = ({blog: {id, title, likes, comments, description, username, created, isLiked}, user, toast}) => {
    const dispatch = useDispatch();
    
    const titleHeader = (
        <Link to={`/blogs/${id}/view`} className="blog-title">{title}</Link>
    )

    const subTitle = (
        <sup>{formatDate(created)} : Posted by &nbsp;
            <Link to={`/user/${username}`}>{username}</Link>
        </sup> 
    )

    const handleLike = (id, isLiked) => {
        if(user){
            if(isLiked) dispatch(likeBlog(id));
            else dispatch(unlikeBlog(id));
        }else{
            toast.current.show({
              severity: 'info',
              summary: 'Login to like the blog.',
              life: 3000,
            })
        }
    }

    const footer = (
        <div className="flex flex-wrap justify-content gap-2">
            { +isLiked === 0?
                <i className="cursor-pointer pi pi-thumbs-up" style={{color: 'black'}}
                onClick={() => handleLike(id, true)}></i>
                :<i className="cursor-pointer pi pi-thumbs-up-fill" style={{color: 'black'}}
                onClick={() => handleLike(id, false)}></i>
            } {likes}
            <i className="cursor-pointer pi pi-comments" style={{color: 'black'}}></i> {comments}
        </div>
    );

  return (
    <div className="card flex justify-content-center mt-4">
        <Card title={titleHeader} subTitle={subTitle} footer={footer} style={{width: '100%'}} >
            <p className="m-0">
                {truncateText(description)}
            </p>
        </Card>
    </div>
  )
}

export default BlogComponent