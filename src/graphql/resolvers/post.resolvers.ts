import { User } from "../../models/user";
import { Post } from "../../models/post";
import { MyContext } from "../../interface/contextInterface";
import {
  CreatePostInterface,
  DeletePostInterface,
  UpdatePostInterface,
} from "../../interface";

export const postResolver = {
  Query: {
    AllPosts: async (parent: any, args: any) => {
      try {
        const allPosts = await Post.findAll();
        return allPosts;
      } catch (error) {
        throw new Error("Cannot fetch all the posts ");
      }
    },
    UserPost: async (parent: any, args: any, context: MyContext) => {
      try {
        if (!context.user) {
          throw new Error("Authorization header is missing");
        }
        const userPosts = await Post.findAll({
          where: { userId: context?.user?.id },
          include: [
            {
              model: User,
              // attributes:["id","","potId"],
              as: "users",
            },
          ],
        });
        return {
          data: userPosts
        }
        // console.log(userPosts);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    createPost: async (
      parent: any,
      args: { input: CreatePostInterface },
      context: MyContext
    ) => {
      try {
        if (!context.user) {
          throw new Error("Authorizarion header is missing");
        }
        const { description } = args.input;

        const newPost = await Post.create({
          description,
          userId: context.user.id,
        });
        return {
          data: newPost,
          message: "Added  a new post succesfully",
        };
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    updatePost: async (
      parent: any,
      args: { input: UpdatePostInterface },
      context: MyContext
    ) => {
      try {
        if (!context.user) {
          throw new Error("Authorization header is missing");
        }
        const { id, description } = args.input;

        const newData = {
          id,
          description,
        };
        const updatePost = await Post.update(newData, { where: { id } });
        if (!updatePost) {
          throw new Error(`failed to update post with ${id}`);
        }
        return {
          data: newData,
          message: `post of id ${id} has been updated succesfully`,
        };
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    deletePost: async (
      parent: any,
      args: { input: DeletePostInterface },
      context: MyContext
    ) => {
      try {
        if (!context?.user) {
          throw new Error("Authorization header is missing");
        }
        const { id } = args.input;
        const deletePost = await Post.findOne({
          where: { id, userId: context?.user.id! },
        });

        if (!deletePost) {
          throw new Error(`failed to delete post with id ${id}`);
        }
        await deletePost.destroy();
        return {
          data: deletePost,
          message: `Post of id ${id} has been deleted succesully`,
        };
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};
