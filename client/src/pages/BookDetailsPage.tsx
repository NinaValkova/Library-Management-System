import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BorrowActions from "../components/books/BorrowActions";
import BookRatingSummary from "../components/books/BookRatingSummary";
import BookRatingForm from "../components/books/BookRatingForm";
import LoadingSpinner from "../components/common/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import type { Book } from "../models/book";
import type { BookRatingSummary as BookRatingSummaryModel, UserRating } from "../models/rating";
import catalogService from "../services/catalogService";
import ratingService from "../services/ratingService";
import "../styles/Book.css";

export default function BookDetailsPage() {
  const { id } = useParams();
  const { auth, isAuthenticated } = useAuth();

  const [book, setBook] = useState<Book | null>(null);
  const [ratingSummary, setRatingSummary] = useState<BookRatingSummaryModel | null>(null);
  const [myRating, setMyRating] = useState<UserRating | null>(null);

  const [loading, setLoading] = useState(true);
  const [ratingsLoading, setRatingsLoading] = useState(true);
  const [error, setError] = useState("");

  const bookId = Number(id);

  const loadBook = async () => {
    if (!id) return;
    const data = await catalogService.getBookById(bookId);
    setBook(data);
  };

  const loadRatings = async () => {
    if (!id) return;

    setRatingsLoading(true);

    try {
      const summary = await ratingService.getBookSummary(bookId);
      setRatingSummary(summary);

      if (isAuthenticated && auth.token) {
        const mine = await ratingService.getMyRating(bookId, auth.token);
        setMyRating(mine);
      } else {
        setMyRating(null);
      }
    } finally {
      setRatingsLoading(false);
    }
  };

  const loadAll = async () => {
    if (!id) return;

    setLoading(true);
    setError("");

    try {
      await Promise.all([loadBook(), loadRatings()]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load book");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, [id, auth.token, isAuthenticated]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-box">{error}</div>;
  if (!book) return <div className="empty-box">Книгата не е намерена.</div>;

  return (
    <section className="details-card">
      <div className="book-details-layout">
        <div className="book-details-image-wrap">
          <img
            src={book.imageUrl || "/images/book-placeholder.jpg"}
            alt={book.title}
            className="book-details-image"
          />
        </div>

        <div className="book-details-info">
          <h1>{book.title}</h1>

          <BookRatingSummary summary={ratingSummary} loading={ratingsLoading} />

          <BookRatingForm
            bookId={book.id}
            myRating={myRating}
            onRated={loadRatings}
          />


          <p><strong>Автор:</strong> {book.author}</p>
          <p><strong>Година:</strong> {book.publishedYear}</p>
          <p><strong>Категория:</strong> {book.category || "—"}</p>
          <p><strong>Език:</strong> {book.language || "—"}</p>
          <p><strong>Описание:</strong> {book.description || "Няма описание."}</p>

          
          <p className={book.isBorrowed ? "status-borrowed" : "status-free"}>
            {book.isBorrowed ? "Заета" : "Налична"}
          </p>

          <BorrowActions
            bookId={book.id}
            isBorrowed={book.isBorrowed}
            borrowedByUserId={book.borrowedByUserId}
            onSuccess={loadBook}
          />
        </div>
      </div>
    </section>
  );
}