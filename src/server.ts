import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { userTypeDefs } from "./graphql/typeDefs";
import { userResolvers } from "./graphql/resolvers/index";
import { sequelize } from "./config";

const App = async () => {
  await sequelize.authenticate();
  console.log("Connection has been established successfully");

  const server = new ApolloServer({
    typeDefs: userTypeDefs,
    resolvers:userResolvers
  });

  // const initApp = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`Server running at port : 4000 and url ${url}`);
};

App();
