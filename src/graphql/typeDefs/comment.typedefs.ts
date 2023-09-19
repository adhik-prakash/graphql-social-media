export const commentTypeDefs =`#graphql

type Comment {
    id:Int
    userId:Int
    description:String
    
}

type PostComment{
    comment: [Comment]
    post: [Post]
}

input PostCommentInput {
        description:String!
        id:Int!
    }

type Query {
getComments:[Comment]
}
type Mutation {
    createComment(input:PostCommentInput):Comment
    }
`