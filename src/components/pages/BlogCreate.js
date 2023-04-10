import { Card } from 'primereact/card'
import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';   
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { postBlog } from '../../services/blog.service';

const BlogCreate = () => {
  const [title, setTitle] = useState({
    value: '', error: '', valid: false
  });

  const [content, setContent] = useState({
    value: '', error: '', valid: false
  });

  const [progress, setProgress] = useState(false)

  const toast = useRef(null);

  const handleTitle = value => {
    if(value === undefined || value === null || value.trim().length === 0){
      setTitle({value: value, error: "Title is required!", valid: false})
    }else{
      setTitle({value: value, error: "", valid: true})
    }
  }

  const handleContent = value => {
    if(value === undefined || value === null || value.trim().length === 0){
      setContent({value: value, error: "Content is required!", valid: false})
    }else if(value.trim().split(' ').length < 5){
      setContent({value: value, error: "Content must contains at least 5 words!", valid: false})
    }else{
      setContent({value: value, error: "", valid: true})
    }
  }

  const handleSubmit = async () => {
    setProgress(true);
    if(!title.valid || !content.valid){
      toast.current.show({
        severity: 'warn',
        summary: 'All fields are required!',
        life: 3000,
      })
      setProgress(false);
    }else{
      const postRes = await postBlog(title.value, content.value);
      if(postRes){
        toast.current.show({
          severity: 'success',
          summary: 'Blog posted successfully!',
          life: 3000,
        })
        setContent({value: '', error: "", valid: false})
        setTitle({value: '', error: "", valid: false})
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
    <div className="grid">
      <Toast ref={toast} />
      <div className="col-3"></div>
      <div className="col-6 flex justify-content-center mt-4">
      <Card title="Post blog" style={{width: '100%'}}>
        <div className="flex flex-column gap-2">
            <label htmlFor="title">Title</label>
            <InputText id="title" aria-describedby="title-help" value={title.value}
              onChange={e => handleTitle(e.target.value)} />
            <small id="title-help" className="input-error">{title.error}</small>
        </div>
        <div className="flex flex-column gap-2">
            <label htmlFor="content">Content</label>
            <InputTextarea id="content" value={content.value} 
              onChange={(e) => handleContent(e.target.value)} rows={5} cols={30}
              aria-describedby="blog-content" />
            <small id="blog-content" className="input-error">{content.error}</small>
        </div>
        <Button label="Submit" icon={progress? 'pi pi-spin pi-spinner': 'pi pi-send'}
          onClick={handleSubmit} disabled={progress} />
      </Card>
      </div>
      <div className="col-3"></div>
    </div>
  )
}

export default BlogCreate