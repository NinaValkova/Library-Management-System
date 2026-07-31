export interface Book {
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
  score1?: number | null;
  score2?: number | null;
  score3?: number | null;
  score4?: number | null;
  score5?: number | null;
}