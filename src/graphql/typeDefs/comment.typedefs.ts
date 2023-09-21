export const commentTypeDefs = `#graphql
    type Comment {
        id: Int
        description: String
        replies: [Reply]    
    }
    type PostComment{
        comment:[Comment]
        post:[Post]
    }
    type MultiCommentResponse {
        data:[Comment]
    }
    type SingleCommentResponse{
        data: Comment
        message: String
    }
    input PostId {
        id:Int!
    }
    input PostCommentInput {
        description:String!
        postId: Int!
    }
    input UpdateInput{
        commentId: Int!
        description: String
    }
    input DeleteInput{
        commentId: Int!
    }
    input GetCommentInput{
        postId: Int
    }
    type Query {
        getCommentsByPostId(input:GetCommentInput):MultiCommentResponse
    }
    type Mutation {
        addComment(input:PostCommentInput):SingleCommentResponse
        updateComment(input:UpdateInput):SingleCommentResponse
        deleteComment(input:DeleteInput):SingleCommentResponse
    }
`;
