const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const expressPlayground =
  require('graphql-playground-middleware-express').default;
const { readFileSync } = require('fs');

const typeDefs = readFileSync('./typeDefs.graphql', 'UTF-8');
const resolvers = require('./resolvers');

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({ typeDefs, resolvers });
  const app = express();
  await server.start();
  server.applyMiddleware({ app });

  app.get('/', (req, res) => res.end('PhotoShare API에 오신 것을 환영합니다.'));

  app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

  app.listen({ port: 4000 }, () =>
    console.log(
      `GraphQL Server running @ http://localhost:4000${server.graphqlPath}`
    )
  );
}

startApolloServer(typeDefs, resolvers);
