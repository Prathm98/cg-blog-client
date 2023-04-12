import React from 'react'
import { Avatar } from 'primereact/avatar';
import { formatDate, getFirstChar } from '../../../utils/helpers';
import { Link } from 'react-router-dom';

const CommentItem = ({comment}) => {
  return (
    <div className='commentMsg shadow-2 mt-2'>
      <div>
        <Link to={`/user/${comment.username}`}>
          <Avatar label={getFirstChar(comment.username)} size="large" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} />
        </Link>
      </div>
      <div className='commentContent'>
        &nbsp; <small>Posted on {formatDate(comment.created)}</small><br />
        &nbsp; <i>{comment.comment}</i>
      </div>
    </div>
  )
}

export default CommentItem