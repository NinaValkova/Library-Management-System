import {
  CommentRepository,
} from "../../repository/comment.repository";

import {
  LikeRepository,
} from "../../repository/like.repository";

import {
  postResolvers,
} from "./posts.resolver";

import {
  commentResolvers,
} from "./comments.resolver";

import {
  likeResolvers,
} from "./likes.resolver";

export const resolvers = {
  Post: {
    comments: async (
      parent: {
        id: number;
      }
    ) => {
      return CommentRepository
        .findCommentsByPostId(parent.id);
    },

    likes: async (
      parent: {
        id: number;
      }
    ) => {
      return LikeRepository
        .findLikesByPostId(parent.id);
    },

    commentCount: async (
      parent: {
        id: number;
      }
    ) => {
      const comments =
        await CommentRepository
          .findCommentsByPostId(parent.id);

      return comments.length;
    },

    likeCount: async (
      parent: {
        id: number;
      }
    ) => {
      const likes =
        await LikeRepository
          .findLikesByPostId(parent.id);

      return likes.length;
    },
  },

  Query: {
    ...postResolvers.Query,
  },

  Mutation: {
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
    ...likeResolvers.Mutation,
  },
};