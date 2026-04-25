import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { http } from "../../lib/http";
import { setToken } from "../../lib/token";
import "@/css/auth.css"

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      const res = await http().post("/api/auth/login", {
        email,
        password,
      });

      if (res.status === 401) {
        setError("Invalid email/password");
        return;
      }

      if (!res.ok) {
        setError("Could not log in. Please try again.");
        return;
      }

      const data = await res.json();
      setToken(data.token);

      const params = new URLSearchParams(window.location.search);
      const after = params.get("after") || "/home";
      navigate(`/redirect?after=${encodeURIComponent(after)}`);
    } catch (err) {
      console.error("Login error:", err);
      setError("Could not log in. Please try again.");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-back">
          ← Back
        </Link>
        <h1>Login</h1>
        <p className="auth-subtitle">Login to your account.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

        <p className="auth-footer">
          Forgot your password? <Link to="/forgot">Click here</Link>
        </p>
      </div>
    </div>
  );
}
