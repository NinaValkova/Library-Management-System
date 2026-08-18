import { desc, eq } from "drizzle-orm";

import { DB } from "../db/db.connection";
import {
  posts,
  Post,
  NewPost,
} from "../db/schemas/posts";

export type PostRepositoryType = {
  createPost: (data: NewPost) => Promise<Post>;
  findAllPosts: () => Promise<Post[]>;
  findPostById: (id: number) => Promise<Post | undefined>;
  deletePost: (id: number) => Promise<Post>;
};

const createPost = async (
  data: NewPost
): Promise<Post> => {
  const [post] = await DB
    .insert(posts)
    .values(data)
    .returning();

  if (!post) {
    throw new Error("Failed to create post");
  }

  return post;
};

const findAllPosts = async (): Promise<Post[]> => {
  return DB
    .select()
    .from(posts)
    .orderBy(desc(posts.createdAt));
};

const findPostById = async (
  id: number
): Promise<Post | undefined> => {
  const [post] = await DB
    .select()
    .from(posts)
    .where(eq(posts.id, id))
    .limit(1);

  return post;
};

const deletePost = async (
  id: number
): Promise<Post> => {
  const [post] = await DB
    .delete(posts)
    .where(eq(posts.id, id))
    .returning();

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
};

export const PostRepository: PostRepositoryType = {
  createPost,
  findAllPosts,
  findPostById,
  deletePost,
};