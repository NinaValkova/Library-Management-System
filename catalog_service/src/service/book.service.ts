import { NewBook } from "../db/schemas/book";
import { BookQueryParams } from "../types/book.query.params";
import {
  BookRepository,
  BookRepositoryType,
} from "../repository/book.repository";

export const CreateBook = async (
  data: NewBook,
  repo: BookRepositoryType = BookRepository,
) => {
  const existingBook = await repo.findBookByIsbn(data.isbn);

  if (existingBook) {
    throw new Error("Book already exists");
  }

  const book = await repo.createBook({
    title: data.title,
    author: data.author,
    isbn: data.isbn,
    publishedYear: data.publishedYear,
    description: data.description,
    category: data.category,
    language: data.language,
    imageUrl: data.imageUrl,
    isBorrowed: false,
    borrowedByUserId: null,
  });

  return book;
};

export const UpdateBook = async (
  data: Partial<NewBook> & { id: number },
  repo: BookRepositoryType = BookRepository,
) => {
  const existingBook = await repo.findBookById(data.id);

  if (!existingBook) {
    throw new Error("Book not found");
  }

  const updatedBook = await repo.updateBook(data);

  return updatedBook;
};

export const DeleteBook = async (
  id: number,
  repo: BookRepositoryType = BookRepository,
) => {
  const existingBook = await repo.findBookById(id);

  if (!existingBook) {
    throw new Error("Book not found");
  }

  if (existingBook.isBorrowed) {
    throw new Error("Cannot delete a borrowed book");
  }

  return repo.deleteBook(id);
};

export const GetBook = async (
  id: number,
  repo: BookRepositoryType = BookRepository,
) => {
  const book = await repo.findBookById(id);

  if (!book) {
    throw new Error("Book not found");
  }

  return book;
};

export const GetBooks = async (
  params: BookQueryParams,
  repo: BookRepositoryType = BookRepository,
) => {
  const books = await repo.findBooksWithFilters(params);
  const count = await repo.countBooksWithFilters(params);

  return {
    pageIndex: Number(params.pageIndex) || 1,
    pageSize: Number(params.pageSize) || 6,
    count,
    data: books,
  };
};

export const BorrowBook = async (
  bookId: number,
  userId: number,
  repo: BookRepositoryType = BookRepository,
) => {
  const book = await repo.findBookById(bookId);

  if (!book) {
    throw new Error("Book not found");
  }

  if (book.isBorrowed) {
    throw new Error("Book is already borrowed");
  }

  return repo.updateBook({
    id: bookId,
    isBorrowed: true,
    borrowedByUserId: userId,
  });
};

export const ReturnBook = async (
  bookId: number,
  userId: number,
  repo: BookRepositoryType = BookRepository,
) => {
  const book = await repo.findBookById(bookId);

  if (!book) {
    throw new Error("Book not found");
  }

  if (!book.isBorrowed) {
    throw new Error("Book is not borrowed");
  }

  if (book.borrowedByUserId !== userId) {
    throw new Error("You cannot return a book borrowed by another user");
  }

  return repo.updateBook({
    id: bookId,
    isBorrowed: false,
    borrowedByUserId: null,
  });

};

export const GetBooksCount = async (
  repo: BookRepositoryType = BookRepository
) => {
  const count = await repo.countAllBooks();
  return { totalBooks: count };
};

export const ApplyBookRating = async (
  bookId: number,
  rating: number,
  repo: BookRepositoryType = BookRepository,
) => {
  const book = await repo.findBookById(bookId);

  if (!book) {
    throw new Error("Book not found");
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new Error("Invalid rating");
  }

  return repo.incrementBookRating(bookId, rating);
};

export const GetAllBooks = async (
  repo: BookRepositoryType = BookRepository,
) => {
  const books = await repo.findAllBooks();
  return books.map((book) => ({
    book_id: book.id,
    title: book.title,
    author: book.author,
    category: book.category,
    language: book.language,
    description: book.description,
  }));
};

const buildBookRatingSummary = (book: {
  score1: number;
  score2: number;
  score3: number;
  score4: number;
  score5: number;
}) => {
  const ratingsCount =
    book.score1 + book.score2 + book.score3 + book.score4 + book.score5;

  const weightedSum =
    book.score1 * 1 +
    book.score2 * 2 +
    book.score3 * 3 +
    book.score4 * 4 +
    book.score5 * 5;

  const averageRating =
    ratingsCount === 0 ? 0 : Number((weightedSum / ratingsCount).toFixed(2));

  return {
    ratingsCount,
    averageRating,
  };
};
