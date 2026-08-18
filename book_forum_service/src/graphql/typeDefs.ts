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

  type Query {
    getPosts: [Post!]!
    getPost(postId: ID!): Post
  }

  type Mutation {
    createPost(
      heading: String!
      body: String!
    ): Post!

    deletePost(postId: ID!): String!

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
  }
`;