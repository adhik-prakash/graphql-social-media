import { CommentInterface } from "../../interface/commentInterface";
import { MyContext } from "../../interface/contextInterface";
import { Reply } from "../../models";
import { Comment } from "../../models/comment";
import { Post } from "../../models/post";

export const CommentResolver = {
  Query: {
    GetCommentsByPostId: async (
      parent: any,
      args: { input: CommentInterface },
      context: MyContext
    ) => {
      const { postId } = args.input;
      try {
        if (!context.user) {
          throw new Error("Authorization header is missing");
        }
        const comment = await Comment.findAll({
          where: { postId },
          include: [
            {
              model: Post,
              // attributes: ["id","description","like,Count"],
              as: "post",
            },
          ],
        });

        if (comment.length <= 0) {
          throw new Error("no comment found for post");
        }
        // console.log(comment);
        return {
          data: comment,
        };
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    GetPostWithCommentAndReply: async (
      parent: any,
      args: { input: CommentInterface },
      context: MyContext
    ) => {
      const { postId } = args.input;
      try {
        if (!context.user) {
          throw new Error("Authorization header is missing");
        }
        const post = await Post.findByPk(postId, {
          include: [
            {
              model: Comment,
              // attributes: ["id","description","like,Count"],
              as: "comments",
              include: [
                {
                  model: Reply,
                  as: "replies",
                },
              ],
            },
          ],
        });
        if (!post) {
          throw new Error(`no post found for postId ${postId}`);
        }
        // console.log(post);
        return {
          data: post,
        };
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    addComment: async (parent: any, args: any, context: MyContext) => {
      try {
        if (!context.user) {
          throw new Error("Authorization header missing");
        }
        const { description, postId } = args.input;
        const checkPostId = await Post.findByPk(postId);
        if (!checkPostId) {
          throw new Error(`Post with id ${postId} is not found`);
        }
        const newComment = await Comment.create({
          description,
          userId: context.user.id,
          postId,
        });
        return {
          data: newComment,
          message: "New comment added",
        };
      } catch (error: any) {
        console.log("Error in addComment", error);
        throw new Error(error.message);
      }
    },

    updateComment: async (parent: any, args: any, context: MyContext) => {
      try {
        if (!context.user) {
          throw new Error("Authorization header is missing");
        }
        const { description, commentId } = args.input;
        const newData = {
          commentId,
          description,
        };
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
          throw new Error(` comment of  id ${commentId} not found`);
        }
        if (comment?.dataValues.userId !== context?.user?.id) {
          throw new Error(`User is not authorized to delete the comment`);
        }
        await comment.update(newData, { where: { id: commentId } });
        return {
          data: comment,
          message: `Comment of id ${commentId} had been updated`,
        };
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    deleteComment: async (parent: any, args: any, context: MyContext) => {
      try {
        if (!context.user) {
          throw new Error("Authorization header is missing");
        }
        const { commentId } = args.input;

        const deletecomment = await Comment.findByPk(commentId);

        if (!deletecomment) {
          throw new Error(`No comment with id ${commentId} found`);
        }
        if (deletecomment?.dataValues.userId !== context?.user?.id) {
          throw new Error(`User is not authorized to delete the comment`);
        }
        await deletecomment.destroy();
        return {
          data: deletecomment,
          message: `Comment of id ${commentId} has been deleted`,
        };
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};
