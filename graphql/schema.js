import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
  type Message {
    id: ID
    message: String!
    result: String
  }

  type Query {
    stock:  String
  }

  type Mutation {
    createNewMessage(input: String): Message
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };