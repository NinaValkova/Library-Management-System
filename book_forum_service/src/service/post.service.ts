import {
  PostRepository,
  PostRepositoryType,
} from "../repository/post.repository";

export const GetPosts = async (
  repo: PostRepositoryType = PostRepository
) => {
  return repo.findAllPosts();
};

export const GetPost = async (
  postId: number,
  repo: PostRepositoryType = PostRepository
) => {
  const post = await repo.findPostById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
};

export const CreatePost = async (
  userId: number,
  username: string,
  heading: string,
  body: string,
  repo: PostRepositoryType = PostRepository
) => {
  if (!heading.trim()) {
    throw new Error("Post heading must not be empty");
  }

  if (!body.trim()) {
    throw new Error("Post body must not be empty");
  }

  return repo.createPost({
    userId,
    username,
    heading: heading.trim(),
    body: body.trim(),
  });
};

export const DeletePost = async (
  postId: number,
  userId: number,
  repo: PostRepositoryType = PostRepository
) => {
  const post = await repo.findPostById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.userId !== userId) {
    throw new Error("Action not allowed");
  }

  await repo.deletePost(postId);

  return "Post deleted successfully";
};