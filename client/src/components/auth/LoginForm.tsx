import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login, refreshUser } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(formData);
      await refreshUser();
      navigate("/books");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <form onSubmit={onSubmit}>
        <h1 className="auth-title">Вход</h1>

        {error && <div className="error-box">{error}</div>}

        <div className="form-group">
          <label>Потребителско име</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Парола</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            required
          />
        </div>

        <button
          className="btn btn-primary full-width"
          type="submit"
          disabled={loading}
        >
          {loading ? "Влизане..." : "Вход"}
        </button>
      </form>
    </div>
  );
}