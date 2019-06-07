import React, { useState } from 'react';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const handleTitleChange = e => setTitle(e.target.value);
  const handleAuthorChange = e => setAuthor(e.target.value);
  const handleUrlChange = e => setUrl(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    console.log(title, '  ', author, '  ', url);
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
          <input onChange={handleTitleChange} type='text' />
        </label>
        <label>
          Author
          <input onChange={handleAuthorChange} type='text' />
        </label>
        <label>
          url
          <input onChange={handleUrlChange} type='text' />
        </label>
        <button type='submit'>AddBlog</button>
      </form>
    </>
  );
};

export default BlogForm;
