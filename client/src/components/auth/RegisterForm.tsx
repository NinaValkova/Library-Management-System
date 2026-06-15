import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    username: "",
    email: "",
    password: "",
    birthNumber: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(formData);
      navigate("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <form onSubmit={onSubmit}>
        <h1 className="auth-title">Регистрация</h1>

        {error && <div className="error-box">{error}</div>}

        <div className="form-grid">
          <div className="form-group">
            <label>Име</label>
            <input
              value={formData.firstName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, firstName: e.target.value }))
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Фамилия</label>
            <input
              value={formData.secondName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, secondName: e.target.value }))
              }
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Потребителско име</label>
          <input
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Имейл</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
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

        <div className="form-group">
          <label>Дата на раждане</label>
          <input
            type="date"
            value={formData.birthNumber}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, birthNumber: e.target.value }))
            }
          />
        </div>

        <button
          className="btn btn-primary full-width"
          type="submit"
          disabled={loading}
        >
          {loading ? "Създаване..." : "Регистрация"}
        </button>
      </form>
    </div>
  );
}