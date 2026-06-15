import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import ratingService from "../../services/ratingService";
import type { UserRating } from "../../models/rating";
import RatingPicker from "./RatingPicker";
import "../../styles/book/RatingPicker.css"

interface Props {
  bookId: number;
  myRating: UserRating | null;
  onRated?: () => void;
}

export default function BookRatingForm({ bookId, myRating, onRated }: Props) {
  const { auth, isAuthenticated } = useAuth();
  const [rating, setRating] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!auth.token) return;

    if (rating === 0) {
      setMessage("Моля, изберете оценка.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await ratingService.rateBook(bookId, { rating }, auth.token);
      setMessage("Оценката е записана успешно.");
      onRated?.();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Failed to save rating");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <p className="muted-text">
        Влезте в профила си, за да оцените книгата.
      </p>
    );
  }

  if (myRating) {
    return (
      <div className="info-box-rating">
        Вече сте оценили тази книга с <strong>{myRating.rating}/5</strong>.
      </div>
    );
  }

  return (
    <div className="rating-form">
      <label>
        <strong>Вашата оценка</strong>
      </label>

      <div className="rating-form-row">
        <RatingPicker
          rating={rating}
          onChange={setRating}
          disabled={loading}
        />

        <button
          className="btn rating-submit-btn"
          id = "rate"
          type="button"
          onClick={handleSubmit}
          disabled={loading || rating === 0}
        >
          {loading ? "Изпращане..." : "Оцени"}
        </button>
      </div>

      {message && <div className="info-box">{message}</div>}
    </div>
  );
}