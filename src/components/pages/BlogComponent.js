import React from 'react'
import { Card } from 'primereact/card';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { formatDate, truncateText } from '../../utils/helpers';
import { likeUnlikeBlog } from '../../redux/features/blogSlice';

/**
 * Component to show blog cards
 * Props:
 * blog - Blog object
 * user - current user object
 *  toast - parent toast reference
 */
const BlogComponent = ({blog:
    {id, title, likes, comments, description, username, created, isLiked}, 
    user, 
    toast
}) => {
    //    Declation and intitalization of state and dispatch
    const dispatch = useDispatch();
    
    // Title markup for card
    const titleHeader = (
        <Link to={`/blogs/${id}/view`} className="blog-title">{title}</Link>
    )

    // Subtitle markup for card
    const subTitle = (
        <sup>
            {/* Calling formatDate fuction to get date in required format */}
            {formatDate(created)} 
            &nbsp; : Posted by &nbsp;
            <Link to={`/user/${username}`}>{username}</Link>
        </sup> 
    )

    /**
     * Like action handler
     * @param {number} id - Id of the blog
     * @param {boolean} isLiked - status if like or not
     */
    const handleLike = (id, isLiked) => {
        if(user){
            if(isLiked) dispatch(likeUnlikeBlog({id, doLike: true}));
            else dispatch(likeUnlikeBlog({id, doLike: false}));
        }else{
            toast.current.show({
              severity: 'info',
              summary: 'Login to like the blog.',
              life: 3000,
            })
        }
    }

    // Returns footer markup for card
    const footer = (
        <div className="flex flex-wrap justify-content gap-2">
            {
            +isLiked === 0?
                <i className="cursor-pointer pi pi-thumbs-up" 
                    style={{color: 'black'}}
                    onClick={() => handleLike(id, true)}></i> :
                <i className="cursor-pointer pi pi-thumbs-up-fill" 
                    style={{color: 'black'}}
                    onClick={() => handleLike(id, false)}></i>
            } {likes}
            <i className="cursor-pointer pi pi-comments" 
                style={{color: 'black'}}></i> {comments}
        </div>
    );

  return (
    <div className="card flex justify-content-center mt-4">
        <Card 
            title={titleHeader}
            subTitle={subTitle}
            footer={footer}
            style={{width: '100%'}} >
            <p className="m-0">
                {truncateText(description)}
            </p>
        </Card>
    </div>
  )
}

export default BlogComponent