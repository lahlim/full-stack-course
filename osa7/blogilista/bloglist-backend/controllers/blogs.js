const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user');
  response.json(blogs.map(u => u.toJSON()));
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      return response
        .status(401)
        .json({ error: 'token is missing or it is invalid' });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      author: body.author,
      likes: body.likes,
      title: body.title,
      url: body.url,
      user: user._id
    });

    console.log('BLOGI: ', blog);

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog.toJSON());
  } catch (e) {
    console.log(e);

    response.status(400).json(e);
  }
});

blogsRouter.post('/:id/comments', async (request, response) => {
  console.log('HALOOOO');

  const body = request.body;
  console.log('COMMENT: ', body.comment);
  console.log(request.params.id);

  try {
    const blog = await Blog.findByIdAndUpdate(
      request.params.id,
      {
        $push: { comments: body.comment }
      },
      { new: true }
    );
    response.status(201).json(blog);
  } catch (err) {
    console.log(err);
    response.status(500).end();
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  const decodedTonen = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedTonen.id) {
    return response
      .status(401)
      .json({ error: 'token is missing or it is invalid' });
  }

  try {
    const deletedBlog = await Blog.findById(request.params.id);
    console.log(deletedBlog);
    if (deletedBlog.user.toString() === decodedTonen.id.toString()) {
      await Blog.deleteOne(deletedBlog);
      response.status(204).end();
    } else {
      response.status(401).json({ error: 'token is invalid or it is missing' });
    }
  } catch (error) {
    response.status(404).end();
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;
  try {
    await Blog.findByIdAndUpdate(request.params.id, body);
    response.status(204).end();
  } catch (error) {
    console.log(error);
    response.status(404).end();
  }
});

module.exports = blogsRouter;
