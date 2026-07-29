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
}