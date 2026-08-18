import { asc, eq } from "drizzle-orm";

import { DB } from "../db/db.connection";
import {
  comments,
  Comment,
  NewComment,
} from "../db/schemas/comments";

export type CommentRepositoryType = {
  createComment: (data: NewComment) => Promise<Comment>;

  findCommentsByPostId: (
    postId: number
  ) => Promise<Comment[]>;

  findCommentById: (
    id: number
  ) => Promise<Comment | undefined>;

  deleteComment: (
    id: number
  ) => Promise<Comment>;
};

const createComment = async (
  data: NewComment
): Promise<Comment> => {
  const [comment] = await DB
    .insert(comments)
    .values(data)
    .returning();

  if (!comment) {
    throw new Error("Failed to create comment");
  }

  return comment;
};

const findCommentsByPostId = async (
  postId: number
): Promise<Comment[]> => {
  return DB
    .select()
    .from(comments)
    .where(eq(comments.postId, postId))
    .orderBy(asc(comments.createdAt));
};

const findCommentById = async (
  id: number
): Promise<Comment | undefined> => {
  const [comment] = await DB
    .select()
    .from(comments)
    .where(eq(comments.id, id))
    .limit(1);

  return comment;
};

const deleteComment = async (
  id: number
): Promise<Comment> => {
  const [comment] = await DB
    .delete(comments)
    .where(eq(comments.id, id))
    .returning();

  if (!comment) {
    throw new Error("Comment not found");
  }

  return comment;
};

export const CommentRepository: CommentRepositoryType = {
  createComment,
  findCommentsByPostId,
  findCommentById,
  deleteComment,
};