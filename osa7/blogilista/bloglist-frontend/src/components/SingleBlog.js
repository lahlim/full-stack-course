import React, { useState } from 'react';
import { connect } from 'react-redux';
import blogService from '../services/blogs';
import { removeBlog, addLike } from '../reducers/blogsReducer';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Button from 'react-bootstrap/Button';

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
      <ListGroup>
        <ListGroupItem>{blog.author}</ListGroupItem>
        <ListGroupItem>
          {blog.likes} likes <Button onClick={handleLike}>Like</Button>
        </ListGroupItem>
        <ListGroupItem>
          added by {blog.user.name}
          <Button style={buttonStyle} onClick={handleRemove}>
            Remove
          </Button>
        </ListGroupItem>
      </ListGroup>
      <h2>Comments</h2>
      <input type='text' onChange={handleText} placeholder='Add comment' />
      <Button onClick={handleAdd}>add comment</Button>
      <ListGroup>
        {blog.comments.map(comment => (
          <ListGroupItem key={genId()}>{comment}</ListGroupItem>
        ))}
      </ListGroup>
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
