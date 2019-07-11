const { ApolloServer, gql } = require('apollo-server');

let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e'
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e'
  }
];

/*
 * It would be more sensible to assosiate book and the author by saving
 * the author id instead of the name to the book.
 * For simplicity we however save the author name.
 */

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution']
  }
];

const typeDefs = gql`
  type Book {
    title: String!
    author: String!
    genre: String
    published: String
    genres: [String]
  }

  type Author {
    name: String!
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
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return 'world';
    },
    bookCount: () => {
      return books.length;
    },
    authorCount: () => {
      return authors.length;
    },
    allBooks: (root, args) => {
      if (args.author) return books.filter(book => book.author === args.author);
      if (args.genre)
        return books.filter(book => {
          return book.genres.find(genre => genre === args.genre);
        });
      return books;
    },
    allAuthors: () => {
      const withCount = authors.map(a => {
        let count = 0;
        for (let b of books) {
          if (b.author === a.name) count++;
        }
        a.bookCount = count;
        return a;
      });

      return withCount;
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const knownAuthor = authors.find(author => author.name === args.author);
      if (knownAuthor) {
        const book = { ...args };
        book.author = knownAuthor.name;

        books.concat(book);

        return book;
      }
      const newAuthor = {
        name: args.author,
        born: null
      };
      const book = { ...args };
      authors.concat(newAuthor);
      books.concat(book);
      return book;
    },
    editAuthor: (root, args) => {
      authors.map(author => {
        if (author.name === args.name) author.born = args.setBornTo;
        return author;
      });
      const author = authors.find(a => a.name === args.name);
      if (author) return author;
      return null;
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
