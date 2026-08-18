import {
  CreateComment,
  DeleteComment,
} from "../../service/comment.service";

import {
  GraphQLContext,
} from "../context";

export const commentResolvers = {
  Mutation: {
    createComment: async (
      _: unknown,
      args: {
        postId: string;
        body: string;
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

      return CreateComment(
        postId,
        context.user.id,
        context.user.username,
        args.body
      );
    },

    deleteComment: async (
      _: unknown,
      args: {
        commentId: string;
      },
      context: GraphQLContext
    ) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }

      const commentId = Number(args.commentId);

      if (Number.isNaN(commentId)) {
        throw new Error("Invalid comment id");
      }

      return DeleteComment(
        commentId,
        context.user.id
      );
    },
  },
};