import React, { useState } from 'react';
import { connect } from 'react-redux';
import blogService from '../services/blogs';
import { removeBlog, addLike } from '../reducers/blogsReducer';

const SingleBlog = props => {
  const [comment, setComment] = useState('');
  const buttonStyle = {
    display: 'none'
  };
  const blog = props.blogs.find(blog => blog.id === props.id);
  if (blog === undefined) return null;
  try {
    if (blog.user.username === props.user.username)
      buttonStyle.display = 'show';
  } catch (e) {
    console.log(e);
  }

  const handleRemove = () => props.removeBlog(blog);
  const handleLike = () => props.addLike(blog);
  const handleAdd = () => {
    blogService.comment(blog.id, comment);
    setComment('');
  };
  const handleText = e => setComment(e.target.value);

  const genId = () => Math.random();
  return (
    <div>
      <h2>{blog.title}</h2>
      <ul>
        <li>{blog.author}</li>
        <li>
          {blog.likes} likes <button onClick={handleLike}>Like</button>
        </li>
        <li>
          added by {blog.user.name}
          <button style={buttonStyle} onClick={handleRemove}>
            Remove
          </button>
        </li>
      </ul>
      <h2>Comments</h2>
      <input type='text' onChange={handleText} placeholder='Add comment' />
      <button onClick={handleAdd}>add comment</button>
      <ul>
        {blog.comments.map(comment => (
          <li key={genId()}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

const mapDispatchToProps = {
  removeBlog,
  addLike
};

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleBlog);
