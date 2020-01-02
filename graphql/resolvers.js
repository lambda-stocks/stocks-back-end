// resolver map
// Each function has the four arguments
// obj, args, context, info
export  const resolvers = {
  Query: {
    stock: () => {
      return "Googl";
    }
  },
  Mutation: {
    createNewMessage: (_, { input }) => {
      const id = require('crypto').randomBytes(10).toString('hex');
      return {id, message: input, result: 'massage created'};
    }
  }
};