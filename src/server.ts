import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { sequelize } from "./config";

import { userTypeDefs, postTypeDefs, commentTypeDefs } from "./graphql/typeDefs/index";

import { userResolvers, postResolver, CommentResolver } from "./graphql/resolvers/index";

import {  MyContext } from "./helpers/MyContext";
import { replyTypeDefs } from "./graphql/typeDefs/reply.typedefs";
import { ReplyResolver } from "./graphql/resolvers/reply.resolvers";


const App = async () => {
  await sequelize.authenticate();
  console.log("Connection has been established successfully");

  const server = new ApolloServer({
    typeDefs: [userTypeDefs,postTypeDefs,commentTypeDefs,replyTypeDefs],
    resolvers:[userResolvers,postResolver,CommentResolver,ReplyResolver]
  });

  // const initApp = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },

    context: MyContext
  });
  console.log(`Server running at port : 4000 and url ${url}`);
};

App();
