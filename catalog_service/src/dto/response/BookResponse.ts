export interface BookResponse {
  id: number;

  title: string;
  author: string;
  isbn: string;

  publishedYear: number;

  description?: string | null;
  category?: string | null;
  language?: string | null;

  imageUrl?: string | null;

  isBorrowed: boolean;
  borrowedByUserId?: number | null;

  score1: number;
  score2: number;
  score3: number;
  score4: number;
  score5: number;

  createdAt: Date;
}