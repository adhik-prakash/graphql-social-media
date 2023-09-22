export const commentTypeDefs = `#graphql
    type Comment {
        id: Int
        description: String
    }

    type CommentWithReply{
        id: Int
        description: String
        replies: [Reply]    

    }
    type GetCommentWithPost{
        id: Int
        description: String
        post: Post
    }
    type GetCommentWithPosts{
       data: [GetCommentWithPost]
    }

    type PostCommentWithReply{
       id: Int
       description: String
       comments:[CommentWithReply]
      }
    type PostCommentAndReply{
       data: PostCommentWithReply
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
    input GetPostInput{
        postId: Int
    }

   input GetPostId{
     postId: Int
    }
    type Query {
        GetCommentsByPostId(input:GetPostInput):GetCommentWithPosts
        GetPostWithCommentAndReply(input: GetPostId): PostCommentAndReply

    }
    type Mutation {
        addComment(input:PostCommentInput):SingleCommentResponse
        updateComment(input:UpdateInput):SingleCommentResponse
        deleteComment(input:DeleteInput):SingleCommentResponse
    }
`;
