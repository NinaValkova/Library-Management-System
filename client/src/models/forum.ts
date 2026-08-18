export interface ForumComment {
  id: string;
  postId: number;
  userId: number;
  username: string;
  body: string;
  createdAt: string;
}

export interface ForumLike {
  id: string;
  postId: number;
  userId: number;
  username: string;
  createdAt: string;
}

export interface ForumPost {
  id: string;
  userId: number;
  username: string;

  heading: string;
  body: string;

  createdAt: string;

  comments: ForumComment[];
  likes: ForumLike[];

  commentCount: number;
  likeCount: number;
}

export interface LikeResult {
  liked: boolean;
}