import React from 'react'
import { Card } from 'primereact/card';
import { Link } from 'react-router-dom';
import { formatDate, truncateText } from '../../utils/helpers';
import { likeDislikeBlog } from '../../services/blog.service';
import { useDispatch } from 'react-redux';
import { updateLikeStatus } from '../../redux/features/blogSlice';

/** Component for blogs card for user profile section
 * Props:
 * blog - blog object
 * likeAction: parent's action handler for like updates
 * toast - perent toast ref
 */
const BlogComponent1 = ({blog: 
    {id, title, likes, comments, description, username, created, isLiked}, 
    likeAction, 
    user, 
    toast
}) => {
    // Declaration for dispatch
    const dispatch = useDispatch();

    // Title markup for card
    const titleHeader = (
        <Link to={`/blogs/${id}/view`} className="blog-title">{title}</Link>
    )

    // Submit handler for like action
    const handleLike = (id, isLiked) => {
        if(user){
            // Call to like service
            likeDislikeBlog(id, isLiked).then(data => {
              if(data){
                likeAction(id, isLiked)
                if(isLiked) dispatch(updateLikeStatus({id, doLike: true}));
                else dispatch(updateLikeStatus({id, doLike: false}));
              }
            })
        }else{
            // Showing error when user is not logged in
            toast.current.show({
              severity: 'info',
              summary: 'Login to like the blog.',
              life: 3000,
            })
        }
    }

    // subtitle markup for card
    const subTitle = (
        <sup>{formatDate(created)}</sup> 
    )

    // Footer markup for card
    const footer = (
        <div className="flex flex-wrap justify-content gap-2">
            { +isLiked === 0?
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
        <Card title={titleHeader} 
            subTitle={subTitle} 
            footer={footer} 
            style={{width: '100%'}} 
        >
            <p className="m-0">
                {truncateText(description)}
            </p>
        </Card>
    </div>
  )
}

export default BlogComponent1