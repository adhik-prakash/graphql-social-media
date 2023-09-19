import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { userTypeDefs } from "./graphql/typeDefs";
import { userResolvers } from "./graphql/resolvers/index";
import { sequelize } from "./config";
import { postTypeDefs } from "./graphql/typeDefs/post.typeDefs";
import { postResolver } from "./graphql/resolvers/post.resolvers";
import {  MyContext } from "./helpers/MyContext";
import { commentTypeDefs } from "./graphql/typeDefs/comment.typedefs";

const App = async () => {
  await sequelize.authenticate();
  console.log("Connection has been established successfully");

  const server = new ApolloServer({
    typeDefs: [userTypeDefs,postTypeDefs,commentTypeDefs],
    resolvers:[userResolvers,postResolver]
  });

  // const initApp = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },

    context: MyContext
  });
  console.log(`Server running at port : 4000 and url ${url}`);
};

App();
