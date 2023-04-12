import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { getBlogById, likeDislikeBlog } from '../../services/blog.service';
import { formatDate } from '../../utils/helpers';
import BlogViewSkelton from './helper/BlogViewSkelton';
import CommentItem from './helper/CommentItem';

const BlogView = () => {
  const {blog_id} = useParams();
  const user = useSelector(state => state.user)
  const toast = useRef(null);
  const [blogData, setBlogData] = useState({data: null, loading: true, error: null, isLiked: false});

  useEffect(() => {
    if(user){
      getBlogById(blog_id).then(data => {
        let isLiked = data.likes.filter(like => like.username === user.username).length > 0;
        setBlogData({data: data, error: null, loading: false, isLiked})
      }).catch(error => {setBlogData({
          data: null, loading: false,
          error: "Unable to fetch blog content, please try after sometime."
        })
      })
    }
  }, [blog_id, user])

  const handleLikeAction = (id, isLiked) => {
    likeDislikeBlog(id, isLiked).then(data => {
      if(data){
        let updatedLikes = blogData.data.likes.filter(like => like.username !==  user.username);
        if(isLiked) updatedLikes = [...blogData.data.likes, {id: 0, username: user.username}]
        setBlogData({...blogData, isLiked, data: {...blogData.data, likes: updatedLikes}})
      }
    })
  }

  const handleCommentPost = (comment) => {
    setBlogData({...blogData, data: {...blogData.data, 
      comments: [...blogData.data.comments, { 
        username: user.username, comment, created: new Date().toISOString() }]}})
  }

  const footer = (id, likes) => (
    <div className="flex flex-wrap justify-content gap-2">
        { !blogData.isLiked?
            <i className="cursor-pointer pi pi-thumbs-up" style={{color: 'black'}}
            onClick={() => handleLikeAction(id, true)}></i>
            :<i className="cursor-pointer pi pi-thumbs-up-fill" style={{color: 'black'}}
            onClick={() => handleLikeAction(id, false)}></i>
        } {likes.length}
    </div>
  );
  
  return (
    <div className="grid">
      <Toast ref={toast} />
      <div className="lg:col-2 md:col-2 col-1"></div>
      <div className="lg:col-8 md:col-8 col-10">
        {blogData.loading? <BlogViewSkelton />: 
          blogData.data && blogData.data.blog? <>
            <Card className='mt-3' title={blogData.data.blog.title} 
              footer={footer(blogData.data.blog.id, blogData.data.likes)}
              subTitle={<sup>{formatDate(blogData.data.blog.created)} : Posted by &nbsp;
                <Link to={`/users/${blogData.data.blog.user.username}`}>{blogData.data.blog.user.username}</Link>
              </sup>} >
              <div>{blogData.data.blog.description}</div>  
            </Card>
            <div className="card">
              <Postcomment blog_id={blogData.data.blog.id} toast={toast} handleCommentPost={handleCommentPost} />
            </div>
            <div className="card">
              <h3>Comments ({blogData.data.comments.length})</h3>
              {blogData.data.comments.map((comment, i) => <CommentItem key={i} comment={comment} />)}
            </div>
          </>: <>Unable to fetch blog, try again in sometime.</>}
      </div>
      <div className="lg:col-2 md:col-2 col-1"></div>
    </div>
  )
}

export default BlogView