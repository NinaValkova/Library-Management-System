import CreatePost from "./CreatePost";

interface Props {
  open: boolean;

  onClose: () => void;

  onCreate: (
    heading: string,
    body: string
  ) => Promise<void>;
}

export default function CreatePostModal({
  open,
  onClose,
  onCreate,
}: Props) {
  if (!open) {
    return null;
  }

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleCreate = async (
    heading: string,
    body: string
  ) => {
    await onCreate(
      heading,
      body
    );

    // Close only after successful creation
    onClose();
  };

  return (
    <div
      className="forum-modal-overlay"
      onClick={handleOverlayClick}
    >
      <div
        className="forum-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-post-modal-title"
      >
        <div className="forum-modal-header">
          <h2 id="create-post-modal-title">
            Публикация
          </h2>

          <button
            type="button"
            className="forum-modal-close"
            onClick={onClose}
            title="Затвори"
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div className="forum-modal-body">
          <CreatePost
            onCreate={handleCreate}
          />
        </div>
      </div>
    </div>
  );
}