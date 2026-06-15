import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "../../styles/Navbar.css";
import userImage from "../../assets/user.png";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          Library Management System
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Начало</NavLink>
          <NavLink to="/books">Каталог</NavLink>
        </nav>

        <div className="nav-actions">
          {isAuthenticated ? (
            <div className="user-menu">
              <button type="button" className="user-pill">
                <img src={userImage} alt="User" className="navbar-user-image" />
              </button>

              <div className="user-dropdown">
                <button
                  type="button"
                  onClick={() => handleNavigate("/profile")}
                >
                  Профил
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate("/my-borrows")}
                >
                  Текущи заеми
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate("/borrow-history")}
                >
                  История
                </button>
                <button
                  type="button"
                  className="logout-item"
                  onClick={handleLogout}
                >
                  Изход
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link className="btn btn-outline" id="btn-login" to="/login">
                Вход
              </Link>
              <Link className="btn btn-outline" id="btn-register" to="/register">
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
