import { Like } from './../../models/like';
export const likeTypeDefs = `#graphql

type Like{
    id:Int
    userId:Int
    postId:Int
}
 type Post{
    description:String
 }
 type User {
    userName:String
    email:String
 }
 type Like{
    postId: Int
    userId: Int
    reactionEnum:String
 }
 type LikeCount{
     post:Post
     likes:[Like] 
     likecount: Int
 }
 type LikeCountResponse{
    data: LikeCount
 }
enum ReactionEnum{
    LIKE
}
input PostLikeInput{
    postId:Int
    reaction:ReactionEnum
    }
input GetLikeCount{
    postId:Int

}
type LikeResponse{
    data:Like
    message:String
    }

type Query{
    getLike(input:GetLikeCount):LikeCountResponse
}
type Mutation{
    postToggleLike(input:PostLikeInput):LikeResponse   
}
`