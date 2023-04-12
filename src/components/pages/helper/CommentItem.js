import React from 'react'
import { Avatar } from 'primereact/avatar';
import { getFirstChar } from '../../../utils/helpers';
import { Link } from 'react-router-dom';

const CommentItem = ({comment}) => {
  return (
    <div className='commentMsg shadow-2 mt-2'>
        <Link to={`/users/${comment.username}`}>
          <Avatar label={getFirstChar(comment.username)} size="large" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} />
        </Link>
        &nbsp; {comment.comment}
    </div>
  )
}

export default CommentItem