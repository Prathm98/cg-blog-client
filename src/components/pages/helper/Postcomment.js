import { Button } from 'primereact/button'
import { InputTextarea } from 'primereact/inputtextarea'
import React, { useState } from 'react'
import { postComment } from '../../../services/blog.service';

const Postcomment = ({ blog_id, toast, handleCommentPost }) => {

    const [comment, setComment] = useState({
        value: '', error: '', valid: false
    });
    
    const [progress, setProgress] = useState(false)
    
    const handlecomment = value => {
        if(value === undefined || value === null || value.trim().length === 0){
          setComment({value: value, error: "Comment is required!", valid: false})
        }else if(value.trim().split(' ').length < 5){
          setComment({value: value, error: "Comment must contains at least 5 words!", valid: false})
        }else{
          setComment({value: value, error: "", valid: true})
        }
    }
    
      const handleSubmit = async () => {
        setProgress(true);
        if(!comment.valid){
          toast.current.show({
            severity: 'warn',
            summary: 'Comment is required',
            life: 3000,
          })
          setProgress(false);
        }else{
          const postRes = await postComment(blog_id, comment.value);
          if(postRes){
            toast.current.show({
              severity: 'success',
              summary: 'Comment posted successfully!',
              life: 3000,
            })
            setComment({value: '', error: "", valid: false})
            handleCommentPost(comment.value)
          }else{
            toast.current.show({
              severity: 'error',
              summary: 'Something went wrong please try again!',
              life: 3000,
            })
          }
          setProgress(false);
        }
    }

  return (
    <div>
        <div className="flex flex-column gap-2 mt-3">
            <label htmlFor="comment">Post a Comment</label>
            <InputTextarea id="comment" value={comment.value} 
              onChange={(e) => handlecomment(e.target.value)} rows={2} cols={30}
              aria-describedby="blog-comment" />
            <small id="blog-comment" className="input-error">{comment.error}</small>
        </div>
        <Button label="Post" icon={progress? 'pi pi-spin pi-spinner': 'pi pi-send'}
          onClick={handleSubmit} disabled={progress} />
    </div>
  )
}

export default Postcomment