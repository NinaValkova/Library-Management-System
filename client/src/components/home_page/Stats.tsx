import { useEffect, useState } from "react";
import "../../styles/home_page/Stats.css";
import catalogService from "../../services/catalogService";
import authService from "../../services/authService";
import borrowService from "../../services/borrowService";

interface StatsData {
  totalBooks: number;
  totalUsers: number;
  activeBorrows: number;
}

export default function Stats() {
  const [stats, setStats] = useState<StatsData>({
    totalBooks: 0,
    totalUsers: 0,
    activeBorrows: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        setError("");

        const [booksData, usersData, borrowsData] = await Promise.all([
          catalogService.getBooksCount(),
          authService.getUsersCount(),
          borrowService.getActiveBorrowsCount(),
        ]);

        setStats({
          totalBooks: booksData.totalBooks,
          totalUsers: usersData.totalUsers,
          activeBorrows: borrowsData.activeBorrows,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading stats");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return <section id="stats-section">Loading</section>;
  }

  if (error) {
    return <section id="stats-section">{error}</section>;
  }

  return (
    <section id="stats-section">
      <div className="container">
        <div className="row text-center g-4">
          <div className="col-md-4">
            <div className="stats-card">
              <div className="stats-card-body">
                <h3 className="stats-number">{stats.totalBooks}+</h3>
                <p className="stats-text">Общо книги</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="stats-card">
              <div className="stats-card-body">
                <h3 className="stats-number">{stats.totalUsers}+</h3>
                <p className="stats-text">Потребители</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="stats-card">
              <div className="stats-card-body">
                <h3 className="stats-number">{stats.activeBorrows}+</h3>
                <p className="stats-text">Активни заемания</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}