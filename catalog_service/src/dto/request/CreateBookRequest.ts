export interface CreateBookRequest {
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;

  description?: string;
  category?: string;
  language?: string;
  imageUrl?: string;
}