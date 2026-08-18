import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";
import forumService from "../../services/forumService";

import ForumComments from "./ForumComments";

import type { ForumPost as ForumPostModel } from "../../models/forum";

interface Props {
  post: ForumPostModel;
  onChanged: () => Promise<void>;
}

export default function ForumPost({
  post,
  onChanged,
}: Props) {
  const { auth, isAuthenticated } = useAuth();

  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);

  const currentUserId = auth.user?.id;

  const likedByMe =
    currentUserId != null &&
    post.likes.some(
      (like) => like.userId === currentUserId
    );

  const canDeletePost =
    currentUserId === post.userId;

  const formatDate = (value: string) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleString();
  };

  const handleLike = async () => {
    if (!auth.token) {
      toast.error(
        "Трябва да влезете в профила си."
      );

      return;
    }

    try {
      await forumService.likePost(
        post.id,
        auth.token
      );

      await onChanged();
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Like failed"
      );
    }
  };

  const handleComment = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const value = comment.trim();

    if (!auth.token || !value) {
      return;
    }

    try {
      setCommentLoading(true);

      await forumService.createComment(
        post.id,
        value,
        auth.token
      );

      setComment("");

      await onChanged();
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Comment failed"
      );
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDeletePost = async () => {
    if (!auth.token) {
      return;
    }

    try {
      await forumService.deletePost(
        post.id,
        auth.token
      );

      toast.success(
        "Публикацията е изтрита."
      );

      await onChanged();
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Delete failed"
      );
    }
  };

  const handleDeleteComment = async (
    commentId: string
  ) => {
    if (!auth.token) {
      return;
    }

    try {
      await forumService.deleteComment(
        commentId,
        auth.token
      );

      await onChanged();
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Delete comment failed"
      );
    }
  };

  return (
    <article className="forum-post">

      {/* POST HEADER */}
      <div className="forum-post-header">
        <div className="forum-avatar">
          {post.username
            .charAt(0)
            .toUpperCase()}
        </div>

        <div className="forum-user-info">
          <strong>{post.username}</strong>

          <span>
            {formatDate(post.createdAt)}
          </span>
        </div>

        {canDeletePost && (
          <button
            className="forum-delete-button"
            type="button"
            onClick={handleDeletePost}
            title="Изтрий публикацията"
          >
            <i className="bi bi-trash" />
          </button>
        )}
      </div>

      {/* POST BODY */}
      <div className="forum-post-body">

        {/* CLICKABLE HEADING */}
        <Link
          to={`/forum/posts/${post.id}`}
          className="forum-post-heading"
        >
          <h2>{post.heading}</h2>
        </Link>

        <p>{post.body}</p>
      </div>

      {/* POST ACTIONS */}
      <div className="forum-post-actions">

        {/* LIKE */}
        <button
          type="button"
          className={`forum-action-button ${
            likedByMe ? "active" : ""
          }`}
          onClick={handleLike}
          disabled={!isAuthenticated}
        >
          <i
            className={
              likedByMe
                ? "bi bi-hand-thumbs-up-fill"
                : "bi bi-hand-thumbs-up"
            }
          />

          <span>{post.likeCount}</span>
        </button>

        {/* COMMENTS */}
        <button
          type="button"
          className="forum-action-button"
          onClick={() =>
            setShowComments(
              (previous) => !previous
            )
          }
        >
          <i className="bi bi-chat-left-text" />

          <span>{post.commentCount}</span>
        </button>

        {/* OPEN FULL POST */}
        <Link
          to={`/forum/posts/${post.id}`}
          className="forum-action-button forum-open-post"
          title="Отвори публикацията"
        >
          <i className="bi bi-box-arrow-up-right" />

          <span>Преглед</span>
        </Link>
      </div>

      {/* COMMENTS */}
      {showComments && (
        <div className="forum-comments">

          <ForumComments
            comments={post.comments}
            currentUserId={currentUserId}
            onDeleteComment={handleDeleteComment}
          />

          {/* CREATE COMMENT */}
          {isAuthenticated && (
            <form
              className="forum-comment-form"
              onSubmit={handleComment}
            >
              <div className="forum-comment-avatar">
                {auth.user?.username
                  ?.charAt(0)
                  .toUpperCase()}
              </div>

              <input
                type="text"
                value={comment}
                onChange={(event) =>
                  setComment(
                    event.target.value
                  )
                }
                placeholder="Напишете коментар..."
              />

              <button
                type="submit"
                disabled={
                  commentLoading ||
                  !comment.trim()
                }
                title="Изпрати"
              >
                <i className="bi bi-send" />
              </button>
            </form>
          )}
        </div>
      )}
    </article>
  );
}