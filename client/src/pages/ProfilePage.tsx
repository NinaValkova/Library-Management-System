import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/common/LoadingSpinner";
import userImage from "../assets/user.png";
import "../styles/ProfilePage.css";

export default function ProfilePage() {
  const { auth, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      await refreshUser();
      setLoading(false);
    };

    run();
  }, []);

  if (loading) return <LoadingSpinner />;

  if (!auth.user) {
    return <div className="empty-box">Няма потребителска информация.</div>;
  }

  const fullName = `${auth.user.firstName} ${auth.user.secondName}`;
  const roleLabel = auth.user.role === "user" ? "Потребител" : "Администратор";

  return (
    <section className="profile-page">
      <div className="profile-content">
        <div className="profile-topbar">
          <div className="profile-avatar">
            <img src={userImage} alt="User" className="profile-avatar-image" />
          </div>

          <div className="profile-main-info">
            <p className="profile-name">{fullName}</p>
            <p className="profile-username">@{auth.user.username}</p>
            <p className="profile-email">{auth.user.email}</p>
            <p className="profile-role">{roleLabel}</p>
          </div>
        </div>

        <div className="profile-details-grid">
          <div className="profile-details-card">
            <div className="profile-details-row">
              <div className="profile-details-item">
                <span className="profile-label">Име</span>
                <span className="profile-value">{auth.user.firstName}</span>
              </div>

              <div className="profile-details-item">
                <span className="profile-label">Фамилия</span>
                <span className="profile-value">{auth.user.secondName}</span>
              </div>
            </div>

            <div className="profile-details-row">
              <div className="profile-details-item">
                <span className="profile-label">Потребителско име</span>
                <span className="profile-value">{auth.user.username}</span>
              </div>

              <div className="profile-details-item">
                <span className="profile-label">Роля</span>
                <span className="profile-value">{roleLabel}</span>
              </div>
            </div>
          </div>

          <div className="profile-summary-card">
            <div className="profile-summary-block">
              <p className="profile-summary-title">Имейл</p>
              <p className="profile-summary-value small">{auth.user.email}</p>
            </div>

            <div className="profile-divider" />

            <div className="profile-summary-block">
              <p className="profile-summary-title">Дата на раждане</p>
              <p className="profile-summary-value">
                {auth.user.birthNumber || "—"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}