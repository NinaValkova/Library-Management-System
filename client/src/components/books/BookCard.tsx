import { Link } from "react-router-dom";
import type { Book } from "../../models/book";

interface Props {
  book: Book;
}

export default function BookCard({ book }: Props) {
  return (
    <article className="book-card">
      <div className="book-card-body">
        <h3>{book.title}</h3>
        <p><strong>Автор:</strong> {book.author}</p>
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Година:</strong> {book.publishedYear}</p>
        <p><strong>Категория:</strong> {book.category || "—"}</p>
        <p><strong>Език:</strong> {book.language || "—"}</p>

        {book.score != null && (
          <p><strong>Оценка:</strong> {Number(book.score).toFixed(2)} / 5</p>
        )}

        {book.ratingsCount != null && (
          <p><strong>Оценки:</strong> {book.ratingsCount}</p>
        )}

        <div>
          <span className={book.isBorrowed ? "status-borrowed" : "status-free"}>
            {book.isBorrowed ? "Заета" : "Налична"}
          </span>
        </div>
      </div>

      <div className="book-card-actions">
        <Link className="btn btn-primary" to={`/books/${book.id}`}>
          Виж детайли
        </Link>
      </div>
    </article>
  );
}