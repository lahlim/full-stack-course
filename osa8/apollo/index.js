require('dotenv').config();
const { ApolloServer, gql, UserInputError } = require('apollo-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Author = require('./models/Author');
const User = require('./models/User');
const Book = require('./models/Book');

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY';
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB: ', err));

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    bookCount: Int
    born: Int
  }

  type Query {
    hello: String!
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    addAuthor(name: String!, born: Int): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return 'world';
    },
    allAuthors: () => Author.find(),
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: () => Book.find().populate('author'),
    me: (root, args, context) => context.currentUser
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new UserInputError('You need to be loggen in to change data');
      }
      const oldAuthor = await Author.findOne({ name: args.author });
      if (oldAuthor) {
        const book = new Book({ ...args, author: oldAuthor });
        try {
          return book.save();
        } catch (error) {
          throw new UserInputError('Tarkista syötetyt tiedot');
        }
      } else {
        const newAuthor = new Author({ name: args.author, born: null });
        let savedAuthor = await newAuthor.save();
        const book = new Book({ ...args, author: savedAuthor });
        try {
          return book.save();
        } catch (error) {
          throw new UserInputError('Tarkista syötetyt tiedot');
        }
      }
    },
    addAuthor: (root, args, context) => {
      Author.insertMany([{ name: args.name, born: args.born }]);
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new UserInputError('You need to be loggen in to change data');
      }
      let author = null;
      try {
        author = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { returnNewDocument: true }
        );
      } catch (error) {
        throw new UserInputError('Syötä ikä muutos numeroina');
      }
      return author;
    },
    createUser: (root, args) => {
      const user = new User({ ...args, password: 'password' });
      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });
    },
    login: async (root, args) => {
      const foundUser = await User.findOne({ username: args.username });

      if (!foundUser || args.password != 'password') {
        throw new UserInputError('Username or pasword is not correct.');
      }
      const token = {
        favoriteGenre: args.favoriteGenre,
        username: foundUser.username,
        id: foundUser.id
      };

      return { value: jwt.sign(token, JWT_SECRET) };
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const authorization = req ? req.headers.authorization : null;
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(authorization.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      console.log(currentUser);

      return { currentUser };
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
