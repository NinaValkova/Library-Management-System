import {
  LikeRepository,
  LikeRepositoryType,
} from "../repository/like.repository";

import {
  PostRepository,
  PostRepositoryType,
} from "../repository/post.repository";

export const GetLikesByPost = async (
  postId: number,
  repo: LikeRepositoryType = LikeRepository
) => {
  return repo.findLikesByPostId(postId);
};

export const ToggleLike = async (
  postId: number,
  userId: number,
  username: string,
  likeRepo: LikeRepositoryType = LikeRepository,
  postRepo: PostRepositoryType = PostRepository
) => {
  const post = await postRepo.findPostById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  const existingLike =
    await likeRepo.findLikeByPostAndUser(
      postId,
      userId
    );

  if (existingLike) {
    await likeRepo.deleteLike(existingLike.id);

    return {
      liked: false,
    };
  }

  await likeRepo.createLike({
    postId,
    userId,
    username,
  });

  return {
    liked: true,
  };
};