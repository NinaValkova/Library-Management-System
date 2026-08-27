import { useState } from "react";

import useAuth from "../../hooks/useAuth";

interface Props {
  onCreate: (
    heading: string,
    body: string
  ) => Promise<void>;
}

export default function CreatePost({
  onCreate,
}: Props) {
  const { auth, isAuthenticated } = useAuth();

  const [heading, setHeading] = useState("");
  const [body, setBody] = useState("");

  // 1 = heading
  // 2 = description
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    const headingValue = heading.trim();

    if (!headingValue) {
      return;
    }

    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const headingValue = heading.trim();
    const bodyValue = body.trim();

    if (!headingValue || !bodyValue) {
      return;
    }

    try {
      setLoading(true);

      await onCreate(
        headingValue,
        bodyValue
      );

      // Reset the complete form after publishing
      setHeading("");
      setBody("");
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="forum-create-box">
        <p className="muted-text">
          Влезте в профила си, за да публикувате въпрос.
        </p>
      </div>
    );
  }

  return (
    <form
      className="forum-create-box"
      onSubmit={handleSubmit}
    >
      <div className="forum-create-user">
        <div className="forum-avatar">
          {auth.user?.username
            ?.charAt(0)
            .toUpperCase()}
        </div>

        <span>{auth.user?.username}</span>
      </div>


      {step === 1 && (
        <>
          <div className="forum-create-step">
            <h3>
              Заглавие
            </h3>
          </div>

          <input
            className="forum-create-heading"
            type="text"
            value={heading}
            onChange={(event) =>
              setHeading(event.target.value)
            }
            placeholder="Напишете заглавие..."
            autoFocus
          />

          <div className="forum-create-actions">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleNext}
              disabled={!heading.trim()}
            >
              Напред
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="forum-create-step">
            <h3>
              Описание
            </h3>
          </div>

          <textarea
            className="forum-create-input"
            value={body}
            onChange={(event) =>
              setBody(event.target.value)
            }
            placeholder="Добавете описание към публикацията..."
            rows={5}
            autoFocus
          />

          <div className="forum-create-actions">
            <button
              className="btn btn-outline"
              type="button"
              onClick={handleBack}
              disabled={loading}
            >
              Назад
            </button>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={
                loading ||
                !heading.trim() ||
                !body.trim()
              }
            >
              {loading ? (
                "Публикуване..."
              ) : (
                <>
                  Публикувай
                </>
              )}
            </button>
          </div>
        </>
      )}
    </form>
  );
}