import {
  CreatePost,
  DeletePost,
  GetPost,
  GetPosts,
} from "../../service/post.service";

import {
  GraphQLContext,
} from "../context";

export const postResolvers = {
  Query: {
    getPosts: async () => {
      return GetPosts();
    },

    getPost: async (
      _: unknown,
      args: {
        postId: string;
      }
    ) => {
      const postId = Number(args.postId);

      if (Number.isNaN(postId)) {
        throw new Error("Invalid post id");
      }

      return GetPost(postId);
    },
  },

  Mutation: {
    createPost: async (
      _: unknown,
      args: {
        heading: string;
        body: string;
      },
      context: GraphQLContext
    ) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }

      return CreatePost(
        context.user.id,
        context.user.username,
        args.heading,
        args.body
      );
    },

    deletePost: async (
      _: unknown,
      args: {
        postId: string;
      },
      context: GraphQLContext
    ) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }

      const postId = Number(args.postId);

      if (Number.isNaN(postId)) {
        throw new Error("Invalid post id");
      }

      return DeletePost(
        postId,
        context.user.id
      );
    },
  },
};