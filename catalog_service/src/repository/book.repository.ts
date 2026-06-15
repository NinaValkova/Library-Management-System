import { and, asc, count, desc, eq, ilike } from "drizzle-orm";
import { DB } from "../db/db.connection";
import { books, Book, NewBook } from "../db/schemas/book";
import { BookQueryParams } from "../types/book.query.params";

export type BookRepositoryType = {
  createBook: (data: NewBook) => Promise<Book>;
  updateBook: (data: Partial<NewBook> & { id: number }) => Promise<Book>;
  deleteBook: (id: number) => Promise<Book>;
  findBooks: (limit: number, offset: number) => Promise<Book[]>;
  findBookById: (id: number) => Promise<Book | undefined>;
  findBookByIsbn: (isbn: string) => Promise<Book | undefined>;
  findBooksWithFilters: (params: BookQueryParams) => Promise<Book[]>;
  countBooksWithFilters: (params: BookQueryParams) => Promise<number>;
  countAllBooks: () => Promise<number>;
  findAllBooks: () => Promise<Book[]>;
  incrementBookRating: (bookId: number, rating: number) => Promise<Book>;
};

const createBook = async (data: NewBook): Promise<Book> => {
  const [book] = await DB.insert(books).values(data).returning();

  if (!book) {
    throw new Error("Failed to create book");
  }

  return book;
};

const updateBook = async (
  data: Partial<NewBook> & { id: number },
): Promise<Book> => {
  const [book] = await DB.update(books)
    .set(data)
    .where(eq(books.id, data.id))
    .returning();

  if (!book) {
    throw new Error("Book not found");
  }

  return book;
};

const deleteBook = async (id: number): Promise<Book> => {
  const [book] = await DB.delete(books).where(eq(books.id, id)).returning();

  if (!book) {
    throw new Error("Book not found");
  }

  return book;
};

const findBooks = async (limit: number, offset: number): Promise<Book[]> => {
  return DB.query.books.findMany({
    limit,
    offset,
  });
};

const findBookById = async (id: number): Promise<Book | undefined> => {
  return DB.query.books.findFirst({
    where: eq(books.id, id),
  });
};

const findBookByIsbn = async (isbn: string): Promise<Book | undefined> => {
  return DB.query.books.findFirst({
    where: eq(books.isbn, isbn),
  });
};

const buildFilters = (params: BookQueryParams) => {
  const filters = [];

  if (params.search) {
    filters.push(ilike(books.title, `%${params.search}%`));
  }

  if (params.category) {
    filters.push(eq(books.category, params.category));
  }

  if (params.language) {
    filters.push(eq(books.language, params.language));
  }

  if (params.isBorrowed === "true") {
    filters.push(eq(books.isBorrowed, true));
  }

  if (params.isBorrowed === "false") {
    filters.push(eq(books.isBorrowed, false));
  }

  return filters;
};

const findBooksWithFilters = async (
  params: BookQueryParams,
): Promise<Book[]> => {
  const pageIndex = Number(params.pageIndex) || 1;
  const pageSize = Number(params.pageSize) || 6;
  const offset = pageSize * (pageIndex - 1);

  const filters = buildFilters(params);

  let orderByClause;

  switch (params.sort) {
    case "titleDesc":
      orderByClause = desc(books.title);
      break;
    case "yearAsc":
      orderByClause = asc(books.publishedYear);
      break;
    case "yearDesc":
      orderByClause = desc(books.publishedYear);
      break;
    default:
      orderByClause = asc(books.title);
      break;
  }

  return DB.select()
    .from(books)
    .where(filters.length > 0 ? and(...filters) : undefined)
    .orderBy(orderByClause)
    .limit(pageSize)
    .offset(offset);
};

const countBooksWithFilters = async (
  params: BookQueryParams,
): Promise<number> => {
  const filters = buildFilters(params);

  const result = await DB.select({ value: count() })
    .from(books)
    .where(filters.length > 0 ? and(...filters) : undefined);

  return result[0]?.value ?? 0;
};

const countAllBooks = async (): Promise<number> => {
  const result = await DB.select({ value: count() }).from(books);
  return result[0]?.value ?? 0;
};

const findAllBooks = async (): Promise<Book[]> => {
  return DB.query.books.findMany();
};

const incrementBookRating = async (
  bookId: number,
  rating: number,
): Promise<Book> => {
  const book = await DB.query.books.findFirst({
    where: eq(books.id, bookId),
  });

  if (!book) {
    throw new Error("Book not found");
  }

  const nextScore5 = book.score5 + (rating === 5 ? 1 : 0);
  const nextScore4 = book.score4 + (rating === 4 ? 1 : 0);
  const nextScore3 = book.score3 + (rating === 3 ? 1 : 0);
  const nextScore2 = book.score2 + (rating === 2 ? 1 : 0);
  const nextScore1 = book.score1 + (rating === 1 ? 1 : 0);

  const [updatedBook] = await DB.update(books)
    .set({
      score5: nextScore5,
      score4: nextScore4,
      score3: nextScore3,
      score2: nextScore2,
      score1: nextScore1,
    })
    .where(eq(books.id, bookId))
    .returning();

  if (!updatedBook) {
    throw new Error("Book not found");
  }

  return updatedBook;
};

export const BookRepository: BookRepositoryType = {
  createBook,
  updateBook,
  deleteBook,
  findBooks,
  findBookById,
  findBookByIsbn,
  findBooksWithFilters,
  countBooksWithFilters,
  countAllBooks,
  findAllBooks,
  incrementBookRating,
};
