import React from 'react'

/**
 * Message component
 * Props:
 * message - message content
 * type - message type
 */
const MessageComponent = ({message, type}) => {
  const getClassByType = (type) =>{
    // eslint-disable-next-line
    if(type == 'error') return "times-circle"
    // eslint-disable-next-line
    if(type == 'not-found') return "exclamation-circle"
  }
  return (
    <div className="message-content">
      <i className={`pi pi-${getClassByType(type)}`}></i><br />
      {message}
    </div>
  )
}

export default MessageComponent