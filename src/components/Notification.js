import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      <b>{message}</b>
    </div>
  )
}

export default Notification