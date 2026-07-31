export interface RatingResponse {
  id: number;
  userId: number;
  bookId: number;
  rating: number;
  createdAt: Date;
}