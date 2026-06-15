export interface BookRatingSummary {
  averageRating: number;
  ratingsCount: number;
}

export interface UserRating {
  id: number;
  userId: number;
  bookId: number;
  rating: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateRatingRequest {
  rating: number;
}

export interface CreateRatingResponse {
  message: string;
  data: UserRating;
}