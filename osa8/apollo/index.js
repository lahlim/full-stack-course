require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');
const uuid = require('uuid/v1');
const mongoose = require('mongoose');
const Author = require('./models/Author');
const Book = require('./models/Book');

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
    allBooks: () => Book.find().populate('author')
  },
  Mutation: {
    addBook: async (root, args) => {
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
    addAuthor: (root, args) => {
      Author.insertMany([{ name: args.name, born: args.born }]);
    },
    editAuthor: async (root, args) => {
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
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
