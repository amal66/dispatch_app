import React, { ReactPropTypes } from 'react'
import './RespSuggest.css'

import MessageBubble from './MessageBubble/MessageBubble'

const respSuggest = (props) => {
  const clickHandler = (msg) => {
    
    alert(msg)
  }

  return (
    <div className="RespSuggest">
      {props.messages.map(msg => 
        <MessageBubble msg={msg} clicked={() => props.selection(msg)} />
      )}
    </div>
  )
}

export default respSuggest
