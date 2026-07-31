export interface UpdateBookRequest {
  title?: string;
  author?: string;
  isbn?: string;
  publishedYear?: number;

  description?: string;
  category?: string;
  language?: string;
  imageUrl?: string;

  isBorrowed?: boolean;
  borrowedByUserId?: number | null;

  score1?: number;
  score2?: number;
  score3?: number;
  score4?: number;
  score5?: number;
}