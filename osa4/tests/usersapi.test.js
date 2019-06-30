const mongoose = require('mongoose');
const User = require('../models/user');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('with one user in database', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({
      username: 'TTe',
      name: 'Teppo Testaaja',
      password: 'qwer'
    });
    await user.save();
  });

  test('creation succeeds', async () => {
    const usersBefore = await User.countDocuments({});

    const newUser = {
      username: 'UUsi',
      name: 'Urpo Uusikäyttäjä',
      password: 'qwer'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAfter = await User.countDocuments({});
    expect(usersBefore + 1).toEqual(usersAfter);
  });

  test('creation fail', async () => {
    const newUser = {
      username: 'uusi useri',
      name: 'Urpon KAveri',
      password: 'qw'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(403);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
