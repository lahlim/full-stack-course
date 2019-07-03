import React from 'react';
import { useField } from '../hooks';

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
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}
      >
        <label>
          Title
          <input {...title} />
        </label>
        <label>
          Author
          <input {...author} />
        </label>
        <label>
          url
          <input {...url} />
        </label>
        <button type='submit'>AddBlog</button>
      </form>
    </>
  );
};

export default BlogForm;
