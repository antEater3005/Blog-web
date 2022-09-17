import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
export default function BlogList({ blogs }) {
  return (
    <div className='blog-list'>
      {blogs.map((blog) => (
        <div className='blogs' key={blog._id}>
          <a href={`blogs/${blog._id}`}>
            <h2>{blog.title}</h2>
            <p>Author: {blog.author}</p>
            <p id='time'>
              {formatDistanceToNow(new Date(blog.createdAt), {
                addSuffix: true,
              })}
            </p>
          </a>
        </div>
      ))}
    </div>
  );
}
