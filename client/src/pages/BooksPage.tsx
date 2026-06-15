import { useEffect, useState } from "react";
import BookFilters from "../components/books/BookFilters";
import BookList from "../components/books/BookList";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Pagination from "../components/books/Pagination";
import type { BooksQueryParams, PaginatedBooks } from "../models/book";
import catalogService from "../services/catalogService";

export default function BooksPage() {
  const [params, setParams] = useState<BooksQueryParams>({
    pageIndex: 1,
    pageSize: 6,
    sort: "titleAsc",
  });

  const [result, setResult] = useState<PaginatedBooks | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBooks = async (query: BooksQueryParams) => {
    setLoading(true);
    setError("");

    try {
      const data = await catalogService.getBooks(query);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks(params);
  }, [params]);

  const totalPages = result ? Math.ceil(result.count / result.pageSize) : 0;
  const currentPage = params.pageIndex ?? 1;

  const goToPage = (page: number) => {
    setParams((prev) => ({
      ...prev,
      pageIndex: page,
    }));
  };

  return (
    <section>
      <BookFilters
        onApply={(newParams) =>
          setParams((prev) => ({
            ...prev,
            ...newParams,
            pageIndex: 1,
          }))
        }
      />

      {loading && <LoadingSpinner />}
      {error && <div className="error-box">{error}</div>}

      {result && (
        <>
          <div className="list-meta">
            Общо книги: <strong>{result.count}</strong>
          </div>

          <BookList books={result.data} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </>
      )}
    </section>
  );
}