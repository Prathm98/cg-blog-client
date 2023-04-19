import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { likeUnlikeBlog } from '../../redux/features/blogSlice';
import { getBlogById, likeDislikeBlog } from '../../services/blog.service';
import { formatDate } from '../../utils/helpers';
import BlogViewSkelton from './helper/BlogViewSkelton';
import CommentItem from './helper/CommentItem';
import LikeUserSidebar from './helper/LikeUserSidebar';
import MessageComponent from './helper/MessageComponent';
import Postcomment from './helper/Postcomment';

// Component for single blog view
const BlogView = () => {
  // Declaration and initialization of params & states
  const {blog_id} = useParams();
  const user = useSelector(state => state.user)
  const toast = useRef(null);
  const dispatch = useDispatch();
  const [blogData, setBlogData] = useState({data: null, loading: true, error: null, isLiked: false});

  // Effect for fetching the blog content
  useEffect(() => {
    getBlogById(blog_id).then(data => {
      let isLiked = false;
      // Filter for checking if current user has liked the blog or not 
      if(user) isLiked = data.likes.filter(like => like.username === user.username).length > 0;
      setBlogData({data: data, error: null, loading: false, isLiked})
    }).catch(error => {setBlogData({
        data: null, loading: false,
        error: "Unable to fetch blog content, please try after sometime."
      })
    })
    // eslint-disable-next-line 
  }, [blog_id])

  // Handler for Like/dislike action
  const handleLikeAction = (id, isLiked) => {
    if(user){
      // Call to like service
      likeDislikeBlog(id, isLiked).then(data => {
        if(data){
          // filter for cheking if user has liked the blog or not
          let updatedLikes = blogData.data.likes.filter(like => like.username !==  user.username);
          if(isLiked) updatedLikes = [...blogData.data.likes, {id: 0, username: user.username}]
          dispatch(likeUnlikeBlog({id, doLike: isLiked}))
          setBlogData({...blogData, isLiked, data: {...blogData.data, likes: updatedLikes}})
        }
      })
    }else{
      toast.current.show({
        severity: 'info',
        summary: 'Login to like the blog.',
        life: 3000,
      })
    }
  }

  // Handler for posting the comment and updating current state
  const handleCommentPost = (comment) => {
    setBlogData({...blogData, data: {...blogData.data, 
      comments: [{ 
        username: user.username, 
        comment, 
        created: new Date().toISOString(),
      }, ...blogData.data.comments]
    }})
  }

  // Footer markup for card
  const footer = (id, likes) => (
    <div className="flex flex-wrap justify-content gap-2">
        { !blogData.isLiked?
            <i className="cursor-pointer pi pi-thumbs-up" 
              style={{color: 'black'}}
              onClick={() => handleLikeAction(id, true)}></i> : 
            <i className="cursor-pointer pi pi-thumbs-up-fill" 
              style={{color: 'black'}}
              onClick={() => handleLikeAction(id, false)}></i>
        } <LikeUserSidebar likes={blogData.data.likes} />
    </div>
  );
  
  return (
    <div className="grid">
      <Toast ref={toast} />
      <div className="lg:col-12 md:col-12 col-12 mt-4 text-right create-blog-button">
        <Link to="/blogs/" className='mr-4'>
          <Button icon="pi pi-arrow-left" iconPos="right">
            &nbsp;Go to Blogs
          </Button>
        </Link>
      </div>

      <div className="lg:col-2 md:col-2 col-1"></div>
      <div className="lg:col-8 md:col-8 col-10">
        {blogData.loading? 
          <BlogViewSkelton />: 
          blogData.data && blogData.data.blog? <>
            <Card 
              className='mt-3'
              title={blogData.data.blog.title} 
              footer={footer(blogData.data.blog.id, blogData.data.likes)}
              subTitle={<sup>
                {formatDate(blogData.data.blog.created)} : Posted by &nbsp;
                <Link to={`/user/${blogData.data.blog.user.username}`}>
                  {blogData.data.blog.user.username}
                </Link>
              </sup>} >
              <div>{blogData.data.blog.description}</div>  
            </Card>
            
            {user && <div className="card">
              <Postcomment 
                blog_id={blogData.data.blog.id}
                toast={toast}
                username={user.username}
                handleCommentPost={handleCommentPost} />
            </div>}

            <div className="card">
              <h3>Comments ({blogData.data.comments.length})</h3>
              {blogData.data.comments.map((comment, i) => <CommentItem key={i} comment={comment} />)}
            </div>
          </> : 
          <MessageComponent 
            message="Unable to fetch blogs at moment. Please try again." 
            type="error" />}
      </div>
      <div className="lg:col-2 md:col-2 col-1"></div>
    </div>
  )
}

export default BlogView