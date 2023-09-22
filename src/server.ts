import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { sequelize } from "./config";

import {
  userTypeDefs,
  postTypeDefs,
  commentTypeDefs,
  likeTypeDefs,
  replyTypeDefs
} from "./graphql/typeDefs/index";

import {
  userResolvers,
  postResolver,
  CommentResolver,
  likeResolver,
  ReplyResolver
} from "./graphql/resolvers/index";

import { MyContext } from "./helpers/MyContext";
const App = async () => {
  await sequelize.authenticate();
  console.log("Connection has been established successfully");

  const server = new ApolloServer({
    typeDefs: [
      userTypeDefs,
      postTypeDefs,
      commentTypeDefs,
      replyTypeDefs,
      likeTypeDefs,
    ],
    resolvers: [
      userResolvers,
      postResolver,
      CommentResolver,
      ReplyResolver,
      likeResolver,
    ],
  });

  // const initApp = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },

    context: MyContext,
  });
  console.log(`Server running at port : 4000 and url ${url}`);
};

App();
