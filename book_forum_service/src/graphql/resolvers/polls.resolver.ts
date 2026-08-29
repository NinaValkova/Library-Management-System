import {
  CreatePoll,
  DeletePoll,
  GetPoll,
  GetPolls,
  VotePoll,
} from "../../service/poll.service";

import {
  GraphQLContext,
} from "../context";

export const pollResolvers = {
  Query: {
    getPolls: async () => {
      return GetPolls();
    },

    getPoll: async (
      _: unknown,
      args: {
        pollId: string;
      }
    ) => {
      const pollId = Number(args.pollId);

      if (Number.isNaN(pollId)) {
        throw new Error(
          "Invalid poll id"
        );
      }

      return GetPoll(pollId);
    },
  },

  Mutation: {
    createPoll: async (
      _: unknown,
      args: {
        question: string;
        options: string[];
      },
      context: GraphQLContext
    ) => {
      if (!context.user) {
        throw new Error(
          "Authentication required"
        );
      }

      if (
        context.user.role
          .toLowerCase() !== "admin"
      ) {
        throw new Error(
          "Only administrators can create polls"
        );
      }

      return CreatePoll(
        context.user.id,
        context.user.username,
        args.question,
        args.options
      );
    },

    votePoll: async (
      _: unknown,
      args: {
        pollId: string;
        optionId: string;
      },
      context: GraphQLContext
    ) => {
      if (!context.user) {
        throw new Error(
          "Authentication required"
        );
      }

      const pollId =
        Number(args.pollId);

      const optionId =
        Number(args.optionId);

      if (
        Number.isNaN(pollId)
      ) {
        throw new Error(
          "Invalid poll id"
        );
      }

      if (
        Number.isNaN(optionId)
      ) {
        throw new Error(
          "Invalid option id"
        );
      }

      return VotePoll(
        pollId,
        optionId,
        context.user.id
      );
    },

    deletePoll: async (
      _: unknown,
      args: {
        pollId: string;
      },
      context: GraphQLContext
    ) => {
      if (!context.user) {
        throw new Error(
          "Authentication required"
        );
      }

      const pollId =
        Number(args.pollId);

      if (
        Number.isNaN(pollId)
      ) {
        throw new Error(
          "Invalid poll id"
        );
      }

      return DeletePoll(
        pollId,
        context.user.id
      );
    },
  },
};