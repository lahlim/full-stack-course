import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const User = props => {
  const user = props.blogUsers.find(user => user.id === props.id);
  if (user === undefined) return null;

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(blog => {
          return (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    blogUsers: state.blogUsers
  };
};

export default connect(mapStateToProps)(User);
