import { MyContext } from "../../interface";
import { PostLikeInterface } from "../../interface/likeInterface";
import { Post } from "../../models";
import { Like } from "../../models";

export const likeResolver = {
  Query: {
    getLike: async (parent: any, args: any, context: MyContext) => {
      try {
        if (!context.user) {
          throw new Error("Authorization header is missing");
        }
        const { postId } = args.input;
        const PostData = await Post.findByPk(postId, {
          include: [
            {
              model: Like,
              as: "likes",
            },
          ],
        });
        const post = PostData?.dataValues;
        if(!post){
        throw new Error(`Post with post id ${postId} is not found `)
        }
        console.log(post.likes);
        return {    
          data: {
            post: post,
            likes: post?.likes,
            likecount: post?.likes?.length
          },
        };
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },

  Mutation: {
    postToggleLike: async (
      parent: any,
      args: { input: PostLikeInterface },
      context: MyContext
    ) => {
      try {
        if (!context.user) {
          throw new Error("Authorization header missing");
        }
        const { postId, reaction } = args.input;
        const newData = {
          postId,
        };
        // console.log(newData);
        const existPost = await Post.findByPk(postId);
        if (!existPost) {
          throw new Error(`No post available for id ${postId}`);
        }
        const likeExists = await Like.findOne({
          where: { postId: postId, userId: context?.user.id },
        });
        if (likeExists) {
          await likeExists.destroy();
          await existPost.decrement("like_count", { by: 1 });

          return {
            message: "you have unliked to this post",
          };
        }
        const likePost = await Like.create({
          postId,
          userId: context?.user?.id,
          reactionEnum: reaction,
        });
        await existPost.increment("like_count", { by: 1 });
        return {
          data: likePost,
          message: "you have liked this post",
        };
        // console.log(likePost);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};
