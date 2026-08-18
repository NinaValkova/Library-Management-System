import "dotenv/config";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

import expressApp from "./express.app";
import { APP_PORT } from "./config";

import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import { createContext } from "./graphql/context";

const PORT = Number(APP_PORT) || 4005;

export const StartServer = async () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  expressApp.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: createContext,
    }),
  );

  expressApp.listen(PORT, () => {
    console.log(
      `Book Forum GraphQL: http://localhost:${PORT}/graphql`
    );
  });
};

StartServer().catch((error) => {
  console.error(error);
  process.exit(1);
});