import React from 'react'
import { Avatar } from 'primereact/avatar';

const CommentItem = ({comment}) => {
  return (
    <div className='commentMsg shadow-2'>
        <Avatar label="V" size="large" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} />
        &nbsp; {comment.comment}
    </div>
  )
}

export default CommentItem