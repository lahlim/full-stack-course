const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog.js');

const initialBlogs = [
  {
    _id: '51422a851b54a46d155627f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '51422a851b54a45d155627f7',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '51422a851b54a44d155627f7',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '51422a851b54a43d155627f7',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '51422a851b54a42d155627f7',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '51422a851b54a41d155627f7',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
];

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
