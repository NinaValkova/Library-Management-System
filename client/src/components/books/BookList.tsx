import { Link } from "react-router-dom";
import type { Book } from "../../models/book";

type Props = {
  books: Book[];
};

export default function BookList({ books }: Props) {
  return (
    <div className="books-grid">
      {books.map((book) => (
        <article key={book.id} className="book-card">
          <Link to={`/books/${book.id}`} className="book-card-link">
            <img
              src={book.imageUrl || "/images/book-placeholder.jpg"}
              alt={book.title}
              className="book-card-image"
            />

            <div className="book-card-body">
              <h3>{book.title}</h3>
              <p><strong>Автор:</strong> {book.author}</p>
              <p><strong>Година:</strong> {book.publishedYear}</p>

              {book.score != null && (
                <p>
                  <strong>Оценка:</strong> {Number(book.score).toFixed(2)} / 10
                </p>
              )}

              {book.ratingsCount != null && (
                <p>
                  <strong>Оценки:</strong> {book.ratingsCount}
                </p>
              )}

              <p className={book.isBorrowed ? "status-borrowed" : "status-free"}>
                {book.isBorrowed ? "Заета" : "Налична"}
              </p>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}