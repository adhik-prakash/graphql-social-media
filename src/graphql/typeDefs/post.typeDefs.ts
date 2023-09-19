import { INTEGER } from '@sequelize/core/_non-semver-use-at-your-own-risk_/dialects/abstract/data-types.js';
 export const postTypeDefs = `#graphql
scalar Date

type Post {
    id:Int,
    userId:Int,
    description:String,
    likeCount:Int,
}
type PostResponse{
    data: Post
    message: String
}
type User{
    userName:String!
    email:String!

}
 input CreatePostInput {
    description:String!
     
     }
 input UpdatePostInput {
     description:String
     id:Int
     } 
 input DeletePostInput {
    id:Int
        
     }
type Query {
    getAllPosts:[Post]
    getUserPost(id:Int):[Post]
}
type Mutation {
     createPost(input:CreatePostInput):PostResponse
     updatePost(input:UpdatePostInput):PostResponse  
     deletePost(input:DeletePostInput):PostResponse
     }
`