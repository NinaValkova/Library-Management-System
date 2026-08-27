
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

interface Props {
  open: boolean;
  onClose: () => void;

  onCreate: (
    question: string,
    options: string[]
  ) => Promise<void>;
}

export default function CreatePollModal({
  open,
  onClose,
  onCreate,
}: Props) {
  const { auth } = useAuth();

  const [question, setQuestion] =
    useState("");

  const [options, setOptions] =
    useState([
      "",
      "",
    ]);

  const [loading, setLoading] =
    useState(false);

  if (!open) return null;

  const updateOption = (
    index: number,
    value: string
  ) => {
    const updated = [...options];

    updated[index] = value;

    setOptions(updated);
  };

  const addOption = () => {
    setOptions([
      ...options,
      "",
    ]);
  };

  const removeOption = (
    index: number
  ) => {
    if (options.length <= 2) return;

    setOptions(
      options.filter(
        (_, i) => i !== index
      )
    );
  };

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    const questionValue =
      question.trim();

    const optionValues =
      options
        .map((option) =>
          option.trim()
        )
        .filter(Boolean);

    if (
      !questionValue ||
      optionValues.length < 2
    ) {
      return;
    }

    try {
      setLoading(true);

      await onCreate(
        questionValue,
        optionValues
      );

      setQuestion("");
      setOptions([
        "",
        "",
      ]);

      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forum-modal-overlay">
      <div className="forum-modal">

        <div className="forum-modal-header">
          <div>
            <h2>Създай анкета</h2>

            <p>
              Попитайте читателите за мнение.
            </p>
          </div>

          <button
            type="button"
            className="forum-modal-close"
            onClick={onClose}
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="forum-create-user">
            <div className="forum-avatar">
              {auth.user?.username
                ?.charAt(0)
                .toUpperCase()}
            </div>

            <span>
              {auth.user?.username}
            </span>
          </div>

          <label className="forum-label">
            Въпрос
          </label>

          <input
            className="forum-create-heading"
            type="text"
            value={question}
            onChange={(event) =>
              setQuestion(event.target.value)
            }
            placeholder="Например: Коя книга искате да добавим?"
            autoFocus
          />

          <label className="forum-label">
            Възможни отговори
          </label>

          <div className="poll-options-editor">

            {options.map(
              (option, index) => (
                <div
                  className="poll-option-row"
                  key={index}
                >
                  <input
                    type="text"
                    value={option}
                    onChange={(event) =>
                      updateOption(
                        index,
                        event.target.value
                      )
                    }
                    placeholder={`Опция ${index + 1}`}
                  />

                  {options.length > 2 && (
                    <button
                      type="button"
                      className="remove-option-button"
                      onClick={() =>
                        removeOption(index)
                      }
                    >
                      <i className="bi bi-trash" />
                    </button>
                  )}
                </div>
              )
            )}

          </div>

          <button
            type="button"
            className="add-option-button"
            onClick={addOption}
          >
            <i className="bi bi-plus-circle" />

            Добави опция
          </button>

          <div className="forum-modal-actions">

            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
              disabled={loading}
            >
              Отказ
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={
                loading ||
                !question.trim()
              }
            >
              {loading
                ? "Публикуване..."
                : "Публикувай анкета"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}