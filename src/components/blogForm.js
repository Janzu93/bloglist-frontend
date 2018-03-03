import React from 'react'
import PropTypes from 'prop-types'

const blogForm = ({newBlogTitle, newBlogAuthor, newBlogUrl, handleChange, handleSubmit}) => {
  return (
  <div>
    <h3>create new</h3>
    <form onSubmit={handleSubmit}>
      title: <input type="text" name="newBlogTitle" value={newBlogTitle} onChange={handleChange} />
      author:<input type="text" name="newBlogAuthor" value={newBlogAuthor} onChange={handleChange} />
      url: <input type="text" name="newBlogUrl" value={newBlogUrl} onChange={handleChange} />
      <button type="submit">uusi blogi</button>
    </form>
  </div>
  )
}

blogForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  newBlogTitle: PropTypes.string.isRequired,
  newBlogAuthor: PropTypes.string.isRequired,
  newBlogUrl: PropTypes.string.isRequired
}

export default blogForm