import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { http } from "../../lib/http";
import { setToken } from "../../lib/token";
import "@/css/auth.css"

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await http().post("/api/auth/register", {
        email,
        password,
      });

      const data = await res.json();
      setToken(data.token);
      if (res.status == 200 || res.status == 201) {
        // send verification email in production (don't block redirect on failure)
        if (import.meta.env.PROD) {
          http().post("/api/mail/send").catch(() => {});
        }

        const params = new URLSearchParams(window.location.search);
        const after = params.get("after") || "/home";
        navigate(`/redirect?after=${encodeURIComponent(after)}`);
      }
    } catch (err) {
      console.error("Register error:", err);
      setError("Registration failed. Email may already be taken.");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-back">
          ← Back
        </Link>
        <h1>Register</h1>
        <p className="auth-subtitle">Create your account to get started.</p>

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

          <input
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}