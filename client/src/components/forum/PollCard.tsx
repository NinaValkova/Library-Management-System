
import { useState } from "react";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";
import forumService from "../../services/forumService";

import type { Poll } from "../../models/poll";

interface Props {
  poll: Poll;
  onChanged: () => Promise<void>;
}

export default function PollCard({
  poll,
  onChanged,
}: Props) {
  const { auth, isAuthenticated } =
    useAuth();

  const [selectedOption, setSelectedOption] =
    useState<number | null>(null);

  const [loading, setLoading] =
    useState(false);

  const currentUserId =
    auth.user?.id;

  const myVote =
    poll.votes.find(
      (vote) =>
        vote.userId === currentUserId
    );

  const hasVoted = !!myVote;

  const getVotes = (
    optionId: number
  ) =>
    poll.votes.filter(
      (vote) =>
        vote.optionId === optionId
    ).length;

  const percentage = (
    optionId: number
  ) => {
    if (!poll.voteCount) return 0;

    return Math.round(
      (getVotes(optionId) /
        poll.voteCount) *
        100
    );
  };

  const handleVote = async () => {
    if (!auth.token) {
      toast.error(
        "Трябва да влезете в профила си."
      );
      return;
    }

    if (selectedOption === null) {
      toast.warning(
        "Изберете опция."
      );
      return;
    }

    try {
      setLoading(true);

      await forumService.votePoll(
        poll.id,
        selectedOption,
        auth.token
      );

      await onChanged();
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Vote failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (
    value: string
  ) => {
    const date = new Date(value);

    return Number.isNaN(date.getTime())
      ? value
      : date.toLocaleString();
  };

  return (
    <article className="forum-post poll-card">

      <div className="forum-post-header">

        <div className="forum-avatar">
          {poll.username
            .charAt(0)
            .toUpperCase()}
        </div>

        <div className="forum-user-info">
          <strong>
            {poll.username}
          </strong>

          <span>
            {formatDate(poll.createdAt)}
          </span>
        </div>

        <div className="poll-badge">
          <i className="bi bi-bar-chart-fill" />
          Анкета
        </div>

      </div>

      <div className="poll-body">

        <h2>
          {poll.question}
        </h2>

        {!hasVoted ? (
          <>
            <div className="poll-options">

              {poll.options.map(
                (option) => (
                  <label
                    key={option.id}
                    className={`poll-option ${
                      selectedOption === option.id
                        ? "selected"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={`poll-${poll.id}`}
                      checked={
                        selectedOption === option.id
                      }
                      onChange={() =>
                        setSelectedOption(
                          option.id
                        )
                      }
                    />

                    <span>
                      {option.text}
                    </span>
                  </label>
                )
              )}

            </div>

            {isAuthenticated && (
              <button
                className="btn btn-primary poll-vote-button"
                type="button"
                onClick={handleVote}
                disabled={
                  loading ||
                  selectedOption === null
                }
              >
                {loading
                  ? "Гласуване..."
                  : "Гласувай"}
              </button>
            )}
          </>
        ) : (
          <div className="poll-results">

            {poll.options.map(
              (option) => (
                <div
                  className="poll-result"
                  key={option.id}
                >

                  <div className="poll-result-header">
                    <span>
                      {option.text}
                    </span>

                    <strong>
                      {percentage(option.id)}%
                    </strong>
                  </div>

                  <div className="poll-progress">

                    <div
                      className={`poll-progress-fill ${
                        myVote?.optionId === option.id
                          ? "my-vote"
                          : ""
                      }`}
                      style={{
                        width: `${percentage(option.id)}%`,
                      }}
                    />

                  </div>

                  <small>
                    {getVotes(option.id)} гласа
                  </small>

                </div>
              )
            )}

          </div>
        )}

        <div className="poll-footer">

          <i className="bi bi-people" />

          {poll.voteCount} гласа

        </div>

      </div>

    </article>
  );
}