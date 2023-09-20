export const replyTypeDefs =`#graphql
type Reply {
  id: Int
  description: String
  commentId: Int
}
type MultiReplyResponse {
  data: [Reply]
}
type SingleReplyResponse {
  data: Reply
  message: String
}
input GetReplyInput {
  commentId: Int!
}
input ReplyInput {
  description: String!
  commentId: Int!
}
input UpdateReplyInput {
  replyId: Int!
  description: String
}
input DeleteReplyInput {
  replyId: Int!
}
type Query {
  getRepliesByCommentId(input: GetReplyInput): MultiReplyResponse
}
type Mutation {
  addReply(input: ReplyInput): SingleReplyResponse
  updateReply(input: UpdateReplyInput):SingleReplyResponse
  deleteReply(input: DeleteReplyInput):SingleReplyResponse
}


`