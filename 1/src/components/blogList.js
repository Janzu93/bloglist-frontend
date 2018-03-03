import React from 'react'
import Blog from './Blog'

const blogList = ({ blogs }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog._id} blog={blog} />
      )}
    </div>
  )
}

export default blogList