import { GraphQLServer } from 'graphql-yoga';
import '@babel/polyfill';
import mockDb from './mockDb';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import prisma from './prisma';

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation
  },
  context: {
    mockDb,
    prisma
  }
});

server.start({ port: process.env.PORT || 4000 }, () => {
  console.log('SwoleDB GraphQL API server listening for requests on port 4000...');
});