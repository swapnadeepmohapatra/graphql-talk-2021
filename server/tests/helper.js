const { ApolloServer } = require("apollo-server");
const { createTestClient } = require("apollo-server-testing");
const typeDefs = require("../schema");
const resolvers = require("../resolvers");

const createTestServer = (ctx) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  return createTestClient(server);
};

module.exports = createTestServer;
