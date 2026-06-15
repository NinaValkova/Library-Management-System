import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import BookInfo from "./components/BookInfo";
import LoadingSpinner from "../common/LoadingSpinner";
import type { Book } from "../../models/book";
import recommendationService from "../../services/recommendationService";
import catalogService from "../../services/catalogService";

export default function Recommendations() {
  const { auth, isAuthenticated } = useAuth();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRecommendations = async () => {
    if (!isAuthenticated || !auth.user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const ids = await recommendationService.getRecommendations(auth.user.id);

      if (!ids.length) {
        setBooks([]);
        return;
      }
      const booksData = await catalogService.getBooksByIds(ids);

      setBooks(booksData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load recommendations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecommendations();
  }, [auth.user, isAuthenticated]);

  if (!isAuthenticated) return null;

  return (
    <section className="container py-5">
      <h2 className="mb-4">Препоръчани книги</h2>

      {loading && <LoadingSpinner />}
      {error && <div className="error-box">{error}</div>}

      {!loading && !error && books.length === 0 && (
        <div className="empty-box">Няма налични препоръки.</div>
      )}

      {!loading && books.length > 0 && (
        <BookInfo books={books} />
      )}
    </section>
  );
}