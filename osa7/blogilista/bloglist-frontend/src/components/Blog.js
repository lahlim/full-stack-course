import React, { useState } from 'react';

const Blog = ({ blog, addLike, removeBlog, user }) => {
  const [showAllInfo, setShowAllInfo] = useState(false);

  const buttonStyle = {
    display: 'none'
  };

  try {
    if (blog.user.username === user.username) buttonStyle.display = 'show';
  } catch (e) {
    console.log(e);
  }

  const handleLike = e => {
    addLike(blog);
  };

  const handleRemove = e => {
    removeBlog(blog);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const handleShowAll = e => {
    setShowAllInfo(!showAllInfo);
  };
  if (showAllInfo === false) {
    return (
      <div style={blogStyle} onClick={handleShowAll}>
        {blog.title} {blog.author}
      </div>
    );
  }

  return (
    <div style={blogStyle} onClick={handleShowAll}>
      <div>{blog.title}</div>
      <br />
      {blog.author}
      <br /> {blog.url}
      <br /> Likes: {blog.likes} <button onClick={handleLike}>Like</button>
      <br /> Added by: {blog.user.name}
      <button style={buttonStyle} onClick={handleRemove}>
        Remove
      </button>
    </div>
  );
};

export default Blog;
