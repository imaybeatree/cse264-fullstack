import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router";
import { http } from "../../lib/http";
import "@/css/auth.css"

export default function ResetPwPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [reset, setReset] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // if not token go back home
  useEffect(() => {
    if(!token) {
        navigate("/");
    }
  }, [])


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
      const res = await http().post("/api/auth/reset", {
        token,
        password,
      });

      const data = await res.json();
      if (res.status == 200 || res.status == 201) {
        setReset(true)
      }
    } catch (err) {
      console.error("Reset error:", err);
      setError("Password reset failed.");
    }
  }

  if(reset) {
    return (
    <div className="auth-page">
        <div className="auth-card">
            <h1>Password reset!</h1>
            <p className="auth-subtitle">Your password has been reset. Please log in to continue.</p>
            <Link to="/login">
            <button className="btn btn-primary">Go to Login</button>
            </Link>
        </div>
    </div>
);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-back">
          ← Back
        </Link>
        <h1>Reset Password</h1>
        <p className="auth-subtitle">Enter a new password for you account.</p>

        <form onSubmit={handleSubmit}>
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
      </div>
    </div>
  );
}