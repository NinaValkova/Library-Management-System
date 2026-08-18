import {
  ToggleLike,
} from "../../service/like.service";

import {
  GraphQLContext,
} from "../context";

export const likeResolvers = {
  Mutation: {
    likePost: async (
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

      return ToggleLike(
        postId,
        context.user.id,
        context.user.username
      );
    },
  },
};