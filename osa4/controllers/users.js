const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');
const Blog = require('../models/blog');

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body;
    const blog = await Blog.findById(body.blogs);
    console.log(body.password.length);
    if (body.password.length <= 2) throw 'error in pw';

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      password: passwordHash,
      blogs: blog._id
    });
    const savedUser = await user.save();
    response.json(savedUser);
  } catch (e) {
    response.status(403).send(e);
  }
});

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({}).populate('blogs');
    response.json(users.map(user => user.toJSON()));
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = usersRouter;
