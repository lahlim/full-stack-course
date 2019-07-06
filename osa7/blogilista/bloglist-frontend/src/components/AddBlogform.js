import React from 'react';
import { useField } from '../hooks';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const BlogForm = props => {
  const [title, resetTitle] = useField('text');
  const [author, resetAuthor] = useField('text');
  const [url, resetUrl] = useField('text');

  const handleSubmit = e => {
    e.preventDefault();

    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    };

    resetTitle();
    resetAuthor();
    resetUrl();
    props.addBlog(blogObject);
  };

  return (
    <>
      <h2>Add blog</h2>
      <Form onSubmit={handleSubmit} className='mb-2'>
        <Form.Group controlId='formtitle'>
          <Form.Label>Title</Form.Label>
          <Form.Control {...title} type='text' placeholder='Enter title' />
        </Form.Group>
        <Form.Group controlId='formauthor'>
          <Form.Label>Author</Form.Label>
          <Form.Control {...author} type='text' placeholder='Enter author' />
        </Form.Group>
        <Form.Group controlId='formurl'>
          <Form.Label>Url</Form.Label>
          <Form.Control {...url} type='text' placeholder='Enter url' />
        </Form.Group>

        <Button type='submit'>AddBlog</Button>
      </Form>
    </>
  );
};

export default BlogForm;
