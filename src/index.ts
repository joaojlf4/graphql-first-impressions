import { ApolloServer, gql } from 'apollo-server';

// Every request is POST
// Every request hits the same endpoint (/graphql)

// Query -> Obter informações (GET)
// Mutation -> Manipular dados (POST/PUT/PATCH/DELETE)
// Scalar types -> String, Int, Boolean, Float, ID

const users = [
  { _id: Math.random().toString(), name: "João", email: "johndoe@gmail.com", active: true },
  { _id: Math.random().toString(), name: "Jonas", email: "jonas@gmail.com", active: true },
  { _id: Math.random().toString(), name: "Marcos", email: "marcao@gmail.com", active: true },
];

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    active: Boolean!
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User! 
  }

  type Query {
    hello: String
    users: [User!]!
    getUserByEmail(email: String!): User!
  }

  type Mutation {
    createUser(name: String! email: String): User!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello World',
    users: () => users,
    getUserByEmail: (_, args) => {
      return users.find(user => user.email === args.email);
    }
  },
  Mutation: {
    createUser: (_, args) => {
      const newUser = {
        _id: Math.random().toString(), 
        name: args.name, 
        email: args.email, 
        active: true 
      };
      users.push(newUser);
      return newUser;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

(async () => {
  const { url } = await server.listen();
  console.log(`> Server started at: ${url}`)
})();