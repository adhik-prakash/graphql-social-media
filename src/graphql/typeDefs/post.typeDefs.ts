import { INTEGER } from '@sequelize/core/_non-semver-use-at-your-own-risk_/dialects/abstract/data-types.js';
 export const postTypeDefs = `#graphql
scalar Date

type Post {
id:ID,
userId:Int,
description:String,
likeCount:Int,
isLiked:Boolean,
reaction:ReactionEnum
comments:[comment]
}

type User{
    userName:String!
    email:String!

}
type comment {
  description:String!
  reaction:ReactionEnum,
  replies:[Reply]
}
type Reply {
description:String!
reaction:ReactionEnum
}

enum ReactionEnum{
LIKE
LOVE
}


type Query {
    getAllPosts:[Post]

}

type Mutation {
     createPost(input:CreatePostInput):Post
    
     }

     input CreatePostInput {
     userId:Int!,
     description:String!
     
     }
`