const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog.js');
const User = require('../models/user');
const helper = require('./test_helper');
const initialBlogs = helper.initialBlogs;

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

describe('jsontest', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

describe('get', () => {
  test('is returned blog ammount right', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.length).toBe(initialBlogs.length);
  });
});

describe('id', () => {
  test('is id label id not _id', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });
});

describe('post', () => {
  test('adding to db is succesfull', async () => {
    const blog = {
      title: 'Test blog',
      author: 'Test writer',
      url: 'www.tests.com',
      likes: 5
    };
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201);

    expect(await Blog.countDocuments({})).toEqual(initialBlogs.length + 1);
  });
});

describe('posterror', () => {
  test('Does adding fail on missing content', async () => {
    const blog = {
      url: 'www.tests.com',
      likes: 10
    };
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
