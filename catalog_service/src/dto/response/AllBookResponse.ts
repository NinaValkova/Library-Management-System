export interface AllBookResponse {
  book_id: number;
  title: string;
  author: string;
  category: string | null;
  language: string | null;
  description: string | null;
}