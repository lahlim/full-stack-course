// eslint-disable-next-line no-unused-vars
let userToken;

const setToken = token => {
  userToken = `bearer ${token}`;
};

const removeToken = () => {
  userToken = null;
};

const blogs = [
  {
    _id: '5a425aa71b54a676234d17f8',
    title: 'Test blog 1',
    author: 'Test user 1',
    url: 'https://www.example.org',
    likes: 1,
    userId: {
      name: 'Auto Test',
      id: '5cfa17dc6ca30c0f37854e5a'
    },
    __v: 0
  },
  {
    _id: '5a422aa71b54a676237d18f8',
    title: 'Test blog 2',
    author: 'Test user 2',
    url: 'https://www.example.org',
    likes: 3,
    userId: {
      name: 'Auto Test',
      id: '5cfa17dc6ca30c0f37854e5a'
    },
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://ww.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    userId: {
      name: 'Auto Test',
      id: '5cfa17dc6ca30c0f37854e5a'
    },
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'Tämän blogin like-määrä on sama kuin edellisen',
    author: 'Testeri',
    url: 'www.example.net',
    likes: 5,
    userId: {
      name: 'Auto Test',
      id: '5cfa17dc6ca30c0f37854e5a'
    },
    __v: 0
  }
];

const getAll = () => {
  return Promise.resolve(blogs);
};

export default { getAll, setToken, removeToken };
