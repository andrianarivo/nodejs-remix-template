import { config } from '@/config';
import { resolvers } from '@/features/resolvers';
import typeDefs from '@/features/typeDefs';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import express from 'express';
import http from 'http';

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server)
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: config.PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${config.PORT}/graphql`);
}

startApolloServer().catch((err) => console.error(err));
