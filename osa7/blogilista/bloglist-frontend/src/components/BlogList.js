import React from 'react';
import Blog from './Blog';
import { connect } from 'react-redux';
import { addLike, removeBlog, initializeBlogs } from '../reducers/blogsReducer';

const BlogList = props => {
  console.log('STATE IN BLOGLIST: ', props);
  const removeBlog = blog => props.removeBlog(blog.id);
  const addLike = blog => props.addLike(blog);
  return (
    <>
      <h2>blogs</h2>
      {props.blogs.map(blog => (
        <Blog
          removeBlog={removeBlog}
          addLike={addLike}
          key={blog.id}
          blog={blog}
          user={props.user}
        />
      ))}
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
