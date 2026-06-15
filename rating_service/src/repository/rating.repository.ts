import { and, eq, sql } from "drizzle-orm";
import { DB } from "../db/db.connection";
import { ratings, Rating, NewRating } from "../db/schemas";

export type RatingRepositoryType = {
  createRating: (data: NewRating) => Promise<Rating>;
  findByUserAndBook: (userId: number, bookId: number) => Promise<Rating | undefined>;
  findByBookId: (bookId: number) => Promise<Rating[]>;
  //getBookSummary: (bookId: number) => Promise<{ averageRating: number; ratingsCount: number }>;
  getAllRatings: () => Promise<Rating[]>;
};

const createRating = async (data: NewRating): Promise<Rating> => {
  const [row] = await DB.insert(ratings).values(data).returning();

  if (!row) {
    throw new Error("Failed to create rating");
  }

  return row;
};

const findByUserAndBook = async (
  userId: number,
  bookId: number
): Promise<Rating | undefined> => {
  return DB.query.ratings.findFirst({
    where: and(eq(ratings.userId, userId), eq(ratings.bookId, bookId)),
  });
};

const findByBookId = async (bookId: number): Promise<Rating[]> => {
  return DB.query.ratings.findMany({
    where: eq(ratings.bookId, bookId),
  });
};

// const getBookSummary = async (bookId: number) => {
//   const result = await DB
//     .select({
//       averageRating: sql<number>`COALESCE(AVG(${ratings.rating}), 0)`,
//       ratingsCount: sql<number>`COUNT(*)`,
//     })
//     .from(ratings)
//     .where(eq(ratings.bookId, bookId));

//   const average = Number(result[0]?.averageRating || 0);

//   return {
//     averageRating: Number(average.toFixed(2)),
//     ratingsCount: Number(result[0]?.ratingsCount || 0),
//   };
// };

const getAllRatings = async (): Promise<Rating[]> => {
  return DB.query.ratings.findMany();
};

export const RatingRepository: RatingRepositoryType = {
  createRating,
  findByUserAndBook,
  findByBookId,
  //getBookSummary,
  getAllRatings,
};