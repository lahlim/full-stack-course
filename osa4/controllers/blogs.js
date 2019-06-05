const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user');
  response.json(blogs.map(u => u.toJSON()));
});

blogsRouter.post('/', async (request, response) => {
  const user = await User.findById(request.body.user);
  console.log(user);

  const blog = new Blog({
    author: request.body.author,
    title: request.body.title,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id
  });

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
