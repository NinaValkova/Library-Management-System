import { BOOK_FORUM_SERVICE_URL } from "../constants/url";

import type {
  ForumComment,
  ForumPost,
  LikeResult,
} from "../models/forum";

import type {
  Poll,
  PollVote,
} from "../models/poll";

interface GraphQLResponse<T> {
  data?: T;

  errors?: {
    message: string;
  }[];
}

async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
  token?: string | null
): Promise<T> {
  const response = await fetch(
    BOOK_FORUM_SERVICE_URL,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
      },

      body: JSON.stringify({
        query,
        variables,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Forum request failed"
    );
  }

  const result: GraphQLResponse<T> =
    await response.json();

  if (result.errors?.length) {
    throw new Error(
      result.errors[0]?.message ||
        "GraphQL error"
    );
  }

  if (!result.data) {
    throw new Error(
      "No data returned from forum service"
    );
  }

  return result.data;
}

const forumService = {
  // ========================================
  // POSTS
  // ========================================

  async getPosts(): Promise<ForumPost[]> {
    const data = await graphqlRequest<{
      getPosts: ForumPost[];
    }>(`
      query GetPosts {
        getPosts {
          id
          userId
          username
          heading
          body
          createdAt

          commentCount
          likeCount

          comments {
            id
            postId
            userId
            username
            body
            createdAt
          }

          likes {
            id
            postId
            userId
            username
            createdAt
          }
        }
      }
    `);

    return data.getPosts;
  },

  async getPost(
    postId: string
  ): Promise<ForumPost> {
    const data = await graphqlRequest<{
      getPost: ForumPost;
    }>(
      `
        query GetPost(
          $postId: ID!
        ) {
          getPost(
            postId: $postId
          ) {
            id
            userId
            username
            heading
            body
            createdAt

            commentCount
            likeCount

            comments {
              id
              postId
              userId
              username
              body
              createdAt
            }

            likes {
              id
              postId
              userId
              username
              createdAt
            }
          }
        }
      `,
      {
        postId,
      }
    );

    return data.getPost;
  },

  async createPost(
    heading: string,
    body: string,
    token: string
  ): Promise<ForumPost> {
    const data = await graphqlRequest<{
      createPost: ForumPost;
    }>(
      `
        mutation CreatePost(
          $heading: String!
          $body: String!
        ) {
          createPost(
            heading: $heading
            body: $body
          ) {
            id
            userId
            username
            heading
            body
            createdAt

            commentCount
            likeCount

            comments {
              id
              postId
              userId
              username
              body
              createdAt
            }

            likes {
              id
              postId
              userId
              username
              createdAt
            }
          }
        }
      `,
      {
        heading,
        body,
      },
      token
    );

    return data.createPost;
  },

  async deletePost(
    postId: string,
    token: string
  ): Promise<string> {
    const data = await graphqlRequest<{
      deletePost: string;
    }>(
      `
        mutation DeletePost(
          $postId: ID!
        ) {
          deletePost(
            postId: $postId
          )
        }
      `,
      {
        postId,
      },
      token
    );

    return data.deletePost;
  },

  // ========================================
  // COMMENTS
  // ========================================

  async createComment(
    postId: string,
    body: string,
    token: string
  ): Promise<ForumComment> {
    const data = await graphqlRequest<{
      createComment: ForumComment;
    }>(
      `
        mutation CreateComment(
          $postId: ID!
          $body: String!
        ) {
          createComment(
            postId: $postId
            body: $body
          ) {
            id
            postId
            userId
            username
            body
            createdAt
          }
        }
      `,
      {
        postId,
        body,
      },
      token
    );

    return data.createComment;
  },

  async deleteComment(
    commentId: string,
    token: string
  ): Promise<ForumComment> {
    const data = await graphqlRequest<{
      deleteComment: ForumComment;
    }>(
      `
        mutation DeleteComment(
          $commentId: ID!
        ) {
          deleteComment(
            commentId: $commentId
          ) {
            id
            postId
            userId
            username
            body
            createdAt
          }
        }
      `,
      {
        commentId,
      },
      token
    );

    return data.deleteComment;
  },

  // ========================================
  // LIKES
  // ========================================

  async likePost(
    postId: string,
    token: string
  ): Promise<LikeResult> {
    const data = await graphqlRequest<{
      likePost: LikeResult;
    }>(
      `
        mutation LikePost(
          $postId: ID!
        ) {
          likePost(
            postId: $postId
          ) {
            liked
          }
        }
      `,
      {
        postId,
      },
      token
    );

    return data.likePost;
  },

  // ========================================
  // POLLS
  // ========================================

  async getPolls(): Promise<Poll[]> {
    const data = await graphqlRequest<{
      getPolls: Poll[];
    }>(`
      query GetPolls {
        getPolls {
          id
          userId
          username
          question
          createdAt

          voteCount

          options {
            id
            pollId
            text
          }

          votes {
            id
            pollId
            optionId
            userId
            createdAt
          }
        }
      }
    `);

    return data.getPolls;
  },

  async getPoll(
    pollId: string
  ): Promise<Poll> {
    const data = await graphqlRequest<{
      getPoll: Poll;
    }>(
      `
        query GetPoll(
          $pollId: ID!
        ) {
          getPoll(
            pollId: $pollId
          ) {
            id
            userId
            username
            question
            createdAt

            voteCount

            options {
              id
              pollId
              text
            }

            votes {
              id
              pollId
              optionId
              userId
              createdAt
            }
          }
        }
      `,
      {
        pollId,
      }
    );

    return data.getPoll;
  },

  async createPoll(
    question: string,
    options: string[],
    token: string
  ): Promise<Poll> {
    const data = await graphqlRequest<{
      createPoll: Poll;
    }>(
      `
        mutation CreatePoll(
          $question: String!
          $options: [String!]!
        ) {
          createPoll(
            question: $question
            options: $options
          ) {
            id
            userId
            username
            question
            createdAt

            voteCount

            options {
              id
              pollId
              text
            }

            votes {
              id
              pollId
              optionId
              userId
              createdAt
            }
          }
        }
      `,
      {
        question,
        options,
      },
      token
    );

    return data.createPoll;
  },

  async votePoll(
    pollId: number,
    optionId: number,
    token: string
  ): Promise<PollVote> {
    const data = await graphqlRequest<{
      votePoll: PollVote;
    }>(
      `
        mutation VotePoll(
          $pollId: ID!
          $optionId: ID!
        ) {
          votePoll(
            pollId: $pollId
            optionId: $optionId
          ) {
            id
            pollId
            optionId
            userId
            createdAt
          }
        }
      `,
      {
        pollId,
        optionId,
      },
      token
    );

    return data.votePoll;
  },

  async deletePoll(
    pollId: number,
    token: string
  ): Promise<string> {
    const data = await graphqlRequest<{
      deletePoll: string;
    }>(
      `
        mutation DeletePoll(
          $pollId: ID!
        ) {
          deletePoll(
            pollId: $pollId
          )
        }
      `,
      {
        pollId,
      },
      token
    );

    return data.deletePoll;
  },
};

export default forumService;