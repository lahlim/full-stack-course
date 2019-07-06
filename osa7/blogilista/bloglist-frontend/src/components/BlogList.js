import React from 'react';
import Blog from './Blog';
import { connect } from 'react-redux';
import { addLike, removeBlog, initializeBlogs } from '../reducers/blogsReducer';
import ListGroup from 'react-bootstrap/ListGroup';

const BlogList = props => {
  console.log('STATE IN BLOGLIST: ', props);
  const removeBlog = blog => props.removeBlog(blog.id);
  const addLike = blog => props.addLike(blog);
  return (
    <>
      <h2 className='mt-3'>Blogs</h2>
      <ListGroup>
        {props.blogs.map(blog => (
          <Blog
            removeBlog={removeBlog}
            addLike={addLike}
            key={blog.id}
            blog={blog}
            user={props.user}
          />
        ))}
      </ListGroup>
    </>
  );
};

const mapDispatchToProps = {
  addLike,
  removeBlog,
  initializeBlogs
};

const mapStateToProps = state => {
  console.log('STATE: ', state);

  return {
    blogs: state.blogs,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList);
