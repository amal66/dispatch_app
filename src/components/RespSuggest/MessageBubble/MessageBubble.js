import React from 'react'
import './MessageBubble.css'

const messageBubble = (props) => {
  return (
    <div className="MessageBubble" onClick={props.clicked}>
      <p>{props.msg}</p>
    </div>
  )
}

export default messageBubble
