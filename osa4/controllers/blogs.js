const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs);
  });
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  console.log(blog);

  try {
    const result = await blog.save();
    response.status(201).json(result);
  } catch (e) {
    response.status(400).end();
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(200).end();
  } catch (e) {
    response.status(404).end();
  }
});

blogsRouter.put('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndUpdate(request.params.id);
    response.status(200).end();
  } catch (e) {
    response.status(404).end();
  }
});

module.exports = blogsRouter;
