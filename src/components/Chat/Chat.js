import React from 'react'
import './Chat.css'

const chat = (props) => {
  return (
    <div>
      {props.messages.map(msg =>
        <p>{msg}</p>
      )}
    </div>
  )
}

export default chat