import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { http } from "../../lib/http";
import { setToken } from "../../lib/token";
import "@/css/auth.css"

export default function ForgotPwPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate();


  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
        if (import.meta.env.PROD) {
          http().post("/api/mail/reset", email).catch(() => {});
        }
        setSubmitted(true);
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password");
    }
  }

  if (submitted){
    return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-back">
          ← Back
        </Link>
        <h1>Password reset link sent!</h1>
        <p className="auth-subtitle">If the email exists, it should receive the link shortly.</p>
      </div>
    </div>
    )
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-back">
          ← Back
        </Link>
        <h1>Forgot password?</h1>
        <p className="auth-subtitle">Enter the email linked to your account.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}