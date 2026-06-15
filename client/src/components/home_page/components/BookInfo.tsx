import { Link } from "react-router-dom";
import type { Book } from "../../../models/book";

// TypeScript knows what BookInfo receives and can protect from passing the wrong data.
type Props = {
  books: Book[];
};

export default function BookInfo({ books }: Props) {
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
              <p>
                <strong>Автор:</strong> {book.author}
              </p>
              <p>
                <strong>Година:</strong> {book.publishedYear}
              </p>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
