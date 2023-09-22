 export const postTypeDefs = `#graphql
scalar Date

type Post {
    id:Int
    userId:Int
    description:String
    likeCount:Int
    #comments:[Comment]
    }

type UserWithPost{
    id:Int
    userId:Int
    description:String
    likeCount:Int
    users: User  
    }

type UserWithPosts{
   data: [UserWithPost]

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
    AllPosts:[Post]
    UserPost:UserWithPosts  
    }
type Mutation {
     createPost(input:CreatePostInput):PostResponse
     updatePost(input:UpdatePostInput):PostResponse  
     deletePost(input:DeletePostInput):PostResponse
     }
`