import { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import borrowService from "../../services/borrowService";
import "../../styles/book/Borrow.css";

interface Props {
  bookId: number;
  isBorrowed: boolean;
  borrowedByUserId?: number | null;
  onSuccess?: () => void;
}

export default function BorrowActions({
  bookId,
  isBorrowed,
  borrowedByUserId,
  onSuccess,
}: Props) {
  const { auth, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  //const [message, setMessage] = useState("");

  const currentUserId = auth.user?.id;
  const canReturn = isBorrowed && borrowedByUserId === currentUserId;
  const canBorrow = !isBorrowed;

  const handleBorrow = async () => {
    if (!auth.token) return;
    setLoading(true);
    //setMessage("");

    try {
      await borrowService.borrowBook(bookId, auth.token);
      //setMessage("Книгата е заета успешно.");
      toast.success("Книгата е заета успешно.");
      onSuccess?.();
    } catch (err) {
      //setMessage(err instanceof Error ? err.message : "Borrow failed");
      toast.error(err instanceof Error ? err.message : "Borrow failed");
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async () => {
    if (!auth.token) return;
    setLoading(true);
    //setMessage("");

    try {
      await borrowService.returnBook(bookId, auth.token);
      //setMessage("Книгата е върната успешно.");
      toast.success("Книгата е върната успешно.");
      onSuccess?.();
    } catch (err) {
       toast.error(err instanceof Error ? err.message : "Return failed");
      //setMessage(err instanceof Error ? err.message : "Return failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <p className="muted-text">Влезте в профила си, за да заемете книга.</p>
    );
  }

  return (
    <div className="borrow-actions">
      {canBorrow && (
        <button
          className="btn borrow-btn-primary"
          onClick={handleBorrow}
          disabled={loading}
        >
          {loading ? "Обработка..." : "Заеми"}
        </button>
      )}

      {canReturn && (
        <button
          className="btn borrow-btn-outline"
          onClick={handleReturn}
          disabled={loading}
        >
          {loading ? "Обработка..." : "Върни"}
        </button>
      )}

      {isBorrowed && !canReturn && (
        <div className="muted-text">Книгата е заета от друг потребител.</div>
      )}

      {/* {message && <div className="info-box">{message}</div>} */}
    </div>
  );
}
