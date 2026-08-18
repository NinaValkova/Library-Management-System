import { useState } from "react";

import type { ForumComment } from "../../models/forum";

interface Props {
  comments: ForumComment[];
  currentUserId?: number;
  onDeleteComment: (
    commentId: string
  ) => Promise<void>;
}

const COMMENTS_PER_PAGE = 3;

export default function ForumComments({
  comments,
  currentUserId,
  onDeleteComment,
}: Props) {
  const [visibleComments, setVisibleComments] =
    useState(COMMENTS_PER_PAGE);

  const formatDate = (value: string) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleString();
  };

  const commentsToShow = comments.slice(
    0,
    visibleComments
  );

  const hasMoreComments =
    visibleComments < comments.length;

  const handleViewMore = () => {
    setVisibleComments(
      (previous) =>
        previous + COMMENTS_PER_PAGE
    );
  };

  if (comments.length === 0) {
    return (
      <p className="forum-no-comments">
        Все още няма коментари.
      </p>
    );
  }

  return (
    <>
      {commentsToShow.map((item) => (
        <div
          key={item.id}
          className="forum-comment"
        >
          <div className="forum-comment-avatar">
            {item.username
              .charAt(0)
              .toUpperCase()}
          </div>

          <div className="forum-comment-content">
            <div className="forum-comment-header">
              <div>
                <strong>
                  {item.username}
                </strong>

                <span>
                  {formatDate(
                    item.createdAt
                  )}
                </span>
              </div>

              {currentUserId ===
                item.userId && (
                <button
                  type="button"
                  className="forum-comment-delete"
                  onClick={() =>
                    onDeleteComment(
                      item.id
                    )
                  }
                  title="Изтрий коментара"
                >
                  <i className="bi bi-trash" />
                </button>
              )}
            </div>

            <p>{item.body}</p>
          </div>
        </div>
      ))}

      {hasMoreComments && (
        <button
          type="button"
          className="forum-view-more-comments"
          onClick={handleViewMore}
        >
          Покажи още коментари
        </button>
      )}
    </>
  );
}