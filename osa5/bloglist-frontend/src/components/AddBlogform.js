import React, { useState } from 'react';

const BlogForm = props => {
  // deconstruct table index 0 and 1 from index.js hooks/return
  const [title, titleReset] = useState('');
  const [author, authorReset] = useState('');
  const [url, urlReset] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    };
    props.addBlog(blogObject);
    titleReset();
    authorReset();
    urlReset();
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
