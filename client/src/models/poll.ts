export interface PollOption {
  id: number;
  pollId: number;
  text: string;
}

export interface PollVote {
  id: number;
  pollId: number;
  optionId: number;
  userId: number;
  createdAt: string;
}

export interface Poll {
  id: number;
  userId: number;
  username: string;
  question: string;
  createdAt: string;

  options: PollOption[];
  votes: PollVote[];

  voteCount: number;
}