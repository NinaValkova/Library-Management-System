import { and, eq } from "drizzle-orm";

import { DB } from "../db/db.connection";
import {
  likes,
  Like,
  NewLike,
} from "../db/schemas/likes";

export type LikeRepositoryType = {
  createLike: (data: NewLike) => Promise<Like>;

  findLikesByPostId: (
    postId: number
  ) => Promise<Like[]>;

  findLikeByPostAndUser: (
    postId: number,
    userId: number
  ) => Promise<Like | undefined>;

  deleteLike: (
    id: number
  ) => Promise<Like>;
};

const createLike = async (
  data: NewLike
): Promise<Like> => {
  const [like] = await DB
    .insert(likes)
    .values(data)
    .returning();

  if (!like) {
    throw new Error("Failed to create like");
  }

  return like;
};

const findLikesByPostId = async (
  postId: number
): Promise<Like[]> => {
  return DB
    .select()
    .from(likes)
    .where(eq(likes.postId, postId));
};

const findLikeByPostAndUser = async (
  postId: number,
  userId: number
): Promise<Like | undefined> => {
  const [like] = await DB
    .select()
    .from(likes)
    .where(
      and(
        eq(likes.postId, postId),
        eq(likes.userId, userId)
      )
    )
    .limit(1);

  return like;
};

const deleteLike = async (
  id: number
): Promise<Like> => {
  const [like] = await DB
    .delete(likes)
    .where(eq(likes.id, id))
    .returning();

  if (!like) {
    throw new Error("Like not found");
  }

  return like;
};

export const LikeRepository: LikeRepositoryType = {
  createLike,
  findLikesByPostId,
  findLikeByPostAndUser,
  deleteLike,
};