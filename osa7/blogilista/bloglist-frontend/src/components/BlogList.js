import React, { useEffect } from 'react';
import Blog from './Blog';
import { connect } from 'react-redux';
import { addLike, removeBlog } from '../reducers/blogsReducer';

const BlogList = ({ props }) => {
  useEffect(() => {
    props.initializeBlogs();
  }, []);
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
  removeBlog
};

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList);
