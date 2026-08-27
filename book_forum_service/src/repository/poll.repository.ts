import { and, desc, eq, sql } from "drizzle-orm";

import { DB } from "../db/db.connection";

import {
  polls,
  pollOptions,
  pollVotes,
  NewPoll,
  NewPollOption,
  NewPollVote,
} from "../db/schemas";

export const PollRepository = {
  async createPoll(
    poll: NewPoll,
    options: string[]
  ) {
    return DB.transaction(async (tx) => {
      const [createdPoll] = await tx
        .insert(polls)
        .values(poll)
        .returning();

      if (!createdPoll) {
        throw new Error("Failed to create poll");
      }

      const optionRows: NewPollOption[] =
        options.map((text) => ({
          pollId: createdPoll.id,
          text,
        }));

      const createdOptions = await tx
        .insert(pollOptions)
        .values(optionRows)
        .returning();

      return {
        ...createdPoll,
        options: createdOptions,
      };
    });
  },

  async findAllPolls() {
    const pollRows = await DB
      .select()
      .from(polls)
      .orderBy(desc(polls.createdAt));

    return Promise.all(
      pollRows.map(async (poll) => {
        const options = await DB
          .select()
          .from(pollOptions)
          .where(eq(pollOptions.pollId, poll.id));

        const votes = await DB
          .select()
          .from(pollVotes)
          .where(eq(pollVotes.pollId, poll.id));

        return {
          ...poll,
          options,
          votes,
          voteCount: votes.length,
        };
      })
    );
  },

  async findPollById(pollId: number) {
    const [poll] = await DB
      .select()
      .from(polls)
      .where(eq(polls.id, pollId))
      .limit(1);

    if (!poll) {
      return null;
    }

    const options = await DB
      .select()
      .from(pollOptions)
      .where(eq(pollOptions.pollId, pollId));

    const votes = await DB
      .select()
      .from(pollVotes)
      .where(eq(pollVotes.pollId, pollId));

    return {
      ...poll,
      options,
      votes,
      voteCount: votes.length,
    };
  },

  async findVoteByUser(
    pollId: number,
    userId: number
  ) {
    const [vote] = await DB
      .select()
      .from(pollVotes)
      .where(
        and(
          eq(pollVotes.pollId, pollId),
          eq(pollVotes.userId, userId)
        )
      )
      .limit(1);

    return vote ?? null;
  },

  async createVote(
    vote: NewPollVote
  ) {
    const [createdVote] = await DB
      .insert(pollVotes)
      .values(vote)
      .returning();

    return createdVote;
  },

  async deletePoll(pollId: number) {
    await DB
      .delete(polls)
      .where(eq(polls.id, pollId));
  },
};

export type PollRepositoryType =
  typeof PollRepository;