import {
  RatingRepository,
  RatingRepositoryType,
} from "../repository/rating.repository";
import { SendBookRatedMessage, SendSparkRatedMessage } from "./broker.service";
import { GetBookDetails } from "../utils/broker/api";

export const RateBook = async (
  userId: number,
  bookId: number,
  rating: number,
  repo: RatingRepositoryType = RatingRepository,
) => {
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new Error("Rating must be an integer between 1 and 5");
  }

  const existing = await repo.findByUserAndBook(userId, bookId);

  if (existing) {
    throw new Error("You have already rated this book");
  }

  const created = await repo.createRating({
    userId,
    bookId,
    rating,
  });

  await SendBookRatedMessage({
    bookId,
    rating,
  });

  await SendSparkRatedMessage({
    userId,
    bookId,
    rating,
  });

  return created;
};

export const GetMyRatingForBook = async (
  userId: number,
  bookId: number,
  repo: RatingRepositoryType = RatingRepository,
) => {
  return repo.findByUserAndBook(userId, bookId);
};

// export const GetBookRatingSummary = async (
//   bookId: number,
//   repo: RatingRepositoryType = RatingRepository
// ) => {
//   return repo.getBookSummary(bookId);
// };

export const GetBookRatingSummary = async (bookId: number) => {
  const book = await GetBookDetails(bookId);

  const ratingsCount =
    (book.score1 ?? 0) +
    (book.score2 ?? 0) +
    (book.score3 ?? 0) +
    (book.score4 ?? 0) +
    (book.score5 ?? 0);

  const weightedSum =
    (book.score1 ?? 0) * 1 +
    (book.score2 ?? 0) * 2 +
    (book.score3 ?? 0) * 3 +
    (book.score4 ?? 0) * 4 +
    (book.score5 ?? 0) * 5;

  const averageRating =
    ratingsCount === 0 ? 0 : Number((weightedSum / ratingsCount).toFixed(2));

  return {
    averageRating,
    ratingsCount,
  };
};

export const ExportRatingsDataset = async (
  repo: RatingRepositoryType = RatingRepository,
) => {
  const rows = await repo.getAllRatings();

  return rows.map((r) => ({
    user_id: r.userId,
    book_id: r.bookId,
    rating: r.rating,
  }));
};
