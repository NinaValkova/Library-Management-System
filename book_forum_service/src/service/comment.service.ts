import {
  CommentRepository,
  CommentRepositoryType,
} from "../repository/comment.repository";

import {
  PostRepository,
  PostRepositoryType,
} from "../repository/post.repository";

export const GetCommentsByPost = async (
  postId: number,
  repo: CommentRepositoryType = CommentRepository
) => {
  return repo.findCommentsByPostId(postId);
};

export const CreateComment = async (
  postId: number,
  userId: number,
  username: string,
  body: string,
  commentRepo: CommentRepositoryType = CommentRepository,
  postRepo: PostRepositoryType = PostRepository
) => {
  if (!body.trim()) {
    throw new Error("Comment body must not be empty");
  }

  const post = await postRepo.findPostById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  return commentRepo.createComment({
    postId,
    userId,
    username,
    body: body.trim(),
  });
};

export const DeleteComment = async (
  commentId: number,
  userId: number,
  repo: CommentRepositoryType = CommentRepository
) => {
  const comment = await repo.findCommentById(commentId);

  if (!comment) {
    throw new Error("Comment not found");
  }

  if (comment.userId !== userId) {
    throw new Error("Action not allowed");
  }

  return repo.deleteComment(commentId);
};