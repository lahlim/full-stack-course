import React from 'react';
import { Link } from 'react-router-dom';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

const Blog = ({ blog }) => {
  return (
    <ListGroupItem>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </ListGroupItem>
  );
};

export default Blog;
