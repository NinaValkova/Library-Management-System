export const typeDefs = `#graphql

  type Post {
    id: ID!
    userId: Int!
    username: String!
    heading: String!
    body: String!
    createdAt: String!

    comments: [Comment!]!
    likes: [Like!]!

    commentCount: Int!
    likeCount: Int!
  }

  type Comment {
    id: ID!
    postId: Int!
    userId: Int!
    username: String!
    body: String!
    createdAt: String!
  }

  type Like {
    id: ID!
    postId: Int!
    userId: Int!
    username: String!
    createdAt: String!
  }

  type LikeResult {
    liked: Boolean!
  }

  type Poll {
    id: ID!
    userId: Int!
    username: String!
    question: String!
    createdAt: String!

    options: [PollOption!]!
    votes: [PollVote!]!

    voteCount: Int!
  }

  type PollOption {
    id: ID!
    pollId: Int!
    text: String!
  }

  type PollVote {
    id: ID!
    pollId: Int!
    optionId: Int!
    userId: Int!
    createdAt: String!
  }

  type Query {
    getPosts: [Post!]!
    getPost(postId: ID!): Post

    getPolls: [Poll!]!
    getPoll(pollId: ID!): Poll
  }

  type Mutation {
    createPost(
      heading: String!
      body: String!
    ): Post!

    deletePost(
      postId: ID!
    ): String!

    createComment(
      postId: ID!
      body: String!
    ): Comment!

    deleteComment(
      commentId: ID!
    ): Comment!

    likePost(
      postId: ID!
    ): LikeResult!

    createPoll(
      question: String!
      options: [String!]!
    ): Poll!

    votePoll(
      pollId: ID!
      optionId: ID!
    ): PollVote!

    deletePoll(
      pollId: ID!
    ): String!
  }
`;