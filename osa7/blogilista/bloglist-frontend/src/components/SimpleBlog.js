import React from 'react';

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div>
      <div>{blog.title}</div> {blog.author}
    </div>
    <div>
      blog has {blog.likes} likes
      <button onClick={onClick}>Like</button>
    </div>
  </div>
);

export default SimpleBlog;
