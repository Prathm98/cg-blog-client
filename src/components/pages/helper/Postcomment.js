import { Button } from 'primereact/button'
import { InputTextarea } from 'primereact/inputtextarea'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addComment } from '../../../redux/features/blogSlice';
import { postComment } from '../../../services/blog.service';

/**
 * Comment add/post component
 * Props:
 * blog_id - blog id for which comment will be posted
 * toast - parent component toast reference
 * handleCommentPost - handler function to update parent's state
 */
const Postcomment = ({ blog_id, toast, handleCommentPost }) => {
    // Declaration and initialization of states and dispatch
    const dispatch = useDispatch();
  
    const [comment, setComment] = useState({
        value: '', error: '', valid: false
    });
    const [progress, setProgress] = useState(false)
    
    // It handles comment field validation and update state
    const handlecomment = value => {
        if(value === undefined || value === null || value.trim().length === 0){
          setComment({value: value, error: "Comment is required!", valid: false})
        }else if(value.trim().split(' ').length < 5){
          setComment({value: value, error: "Comment must contains at least 5 words!", valid: false})
        }else{
          setComment({value: value, error: "", valid: true})
        }
    }

    // handle comment form submit action 
    const handleSubmit = async () => {
      // Setting progress bar
      setProgress(true);

      // Validation required fields
      if(!comment.valid){
        // Invoking toast message
        toast.current.show({
          severity: 'warn',
          summary: 'Comment is required',
          life: 3000,
        })
        setProgress(false);
      }else{
        // Calling the post comment service
        const postRes = await postComment(blog_id, comment.value);
        if(postRes){
          toast.current.show({
            severity: 'success',
            summary: 'Comment posted successfully!',
            life: 3000,
          })
          setComment({value: '', error: "", valid: false})
          handleCommentPost(comment.value)

          // Dispatching store update
          dispatch(addComment(blog_id))
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
            <InputTextarea id="comment" 
              value={comment.value} 
              onChange={(e) => handlecomment(e.target.value)} 
              rows={2} cols={30}
              aria-describedby="blog-comment" />
            <small id="blog-comment" className="input-error">{comment.error}</small>
        </div>
        <Button label="Post" 
          icon={progress? 'pi pi-spin pi-spinner': 'pi pi-send'}
          onClick={handleSubmit}
          disabled={progress} />
    </div>
  )
}

export default Postcomment