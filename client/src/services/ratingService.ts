import { RATING_SERVICE_URL } from "../constants/url";
import type {
  BookRatingSummary,
  CreateRatingRequest,
  CreateRatingResponse,
  UserRating,
} from "../models/rating";
import { apiRequest } from "../api/apiRequest";

const ratingService = {
  async getBookSummary(bookId: number): Promise<BookRatingSummary> {
    return apiRequest<BookRatingSummary>(
      `${RATING_SERVICE_URL}/ratings/${bookId}/summary`
    );
  },

  async getMyRating(bookId: number, token: string): Promise<UserRating | null> {
    return apiRequest<UserRating | null>(
      `${RATING_SERVICE_URL}/ratings/${bookId}/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  async rateBook(
    bookId: number,
    payload: CreateRatingRequest,
    token: string
  ): Promise<CreateRatingResponse> {
    return apiRequest<CreateRatingResponse>(
      `${RATING_SERVICE_URL}/ratings/${bookId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );
  },
};

export default ratingService;