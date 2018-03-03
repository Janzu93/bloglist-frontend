import React from 'react'

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

export default blogForm