import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/common/LoadingSpinner";
import borrowService from "../services/borrowService";
import type { BorrowRecord } from "../models/borrow";

export default function CurrentBorrowsPage() {
  const { auth } = useAuth();
  const [items, setItems] = useState<BorrowRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!auth.token) return;

      setLoading(true);
      setError("");

      try {
        const data = await borrowService.getCurrentBorrows(auth.token);
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load borrows");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [auth.token]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-box">{error}</div>;

  return (
    <section>
      <h1 className="page-title">Текущи заеми</h1>

      {!items.length ? (
        <div className="empty-box">Нямате текущо заети книги.</div>
      ) : (
        <div className="records-list">
          {items.map((item) => (
            <div key={item.id} className="record-card">
              <h3>{item.bookTitle}</h3>
              <p><strong>Заета на:</strong> {new Date(item.borrowedAt).toLocaleString()}</p>
              <p><strong>Краен срок на връщане:</strong> {new Date(item.dueAt).toLocaleString()}</p>
              <p><strong>Статус:</strong> {item.status}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}