import {
  PollRepository,
  PollRepositoryType,
} from "../repository/poll.repository";

export const GetPolls = async (
  repo: PollRepositoryType = PollRepository
) => {
  return repo.findAllPolls();
};

export const GetPoll = async (
  pollId: number,
  repo: PollRepositoryType = PollRepository
) => {
  const poll =
    await repo.findPollById(pollId);

  if (!poll) {
    throw new Error("Poll not found");
  }

  return poll;
};

export const CreatePoll = async (
  userId: number,
  username: string,
  question: string,
  options: string[],
  repo: PollRepositoryType = PollRepository
) => {
  const questionValue = question.trim();

  const optionValues = options
    .map((option) => option.trim())
    .filter(Boolean);

  if (!questionValue) {
    throw new Error(
      "Poll question must not be empty"
    );
  }

  if (optionValues.length < 2) {
    throw new Error(
      "A poll must have at least 2 options"
    );
  }

  return repo.createPoll(
    {
      userId,
      username,
      question: questionValue,
    },
    optionValues
  );
};

export const VotePoll = async (
  pollId: number,
  optionId: number,
  userId: number,
  repo: PollRepositoryType = PollRepository
) => {
  const poll =
    await repo.findPollById(pollId);

  if (!poll) {
    throw new Error("Poll not found");
  }

  const optionBelongsToPoll =
    poll.options.some(
      (option) =>
        option.id === optionId
    );

  if (!optionBelongsToPoll) {
    throw new Error(
      "Invalid poll option"
    );
  }

  const existingVote =
    await repo.findVoteByUser(
      pollId,
      userId
    );

  if (existingVote) {
    throw new Error(
      "You have already voted in this poll"
    );
  }

  return repo.createVote({
    pollId,
    optionId,
    userId,
  });
};

export const DeletePoll = async (
  pollId: number,
  userId: number,
  repo: PollRepositoryType = PollRepository
) => {
  const poll =
    await repo.findPollById(pollId);

  if (!poll) {
    throw new Error("Poll not found");
  }

  if (poll.userId !== userId) {
    throw new Error(
      "Action not allowed"
    );
  }

  await repo.deletePoll(pollId);

  return "Poll deleted successfully";
};