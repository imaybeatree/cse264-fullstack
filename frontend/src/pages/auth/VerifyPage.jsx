import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { http } from "../../lib/http";
import { removeToken } from "../../lib/token";
import "@/css/auth.css";

export default function VerifyPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [cooldown, setCooldown] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);

  // check if token is in the search param
  useEffect(() => {
    if (!token) return;

    async function verify() {
      try {
        const res = await http().get(`/api/auth/verify?token=${token}`);
        const data = await res.json();
        removeToken();
        setVerified(true);
        setMessage(data.message || "Account verified!");
      } catch (err) {
        console.error("Verify error:", err);
        setError("Invalid or expired verification link.");
      }
    }

    verify();
  }, [token]);
  
  // resend email logic and cooldown
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  async function handleResend() {
    setMessage("");
    setError("");

    try {
      const res = await http().post("/api/mail/send");
      const data = await res.json();

      if (res.status === 429) {
        setCooldown(data.cooldown || 60);
        setError("Please wait before resending.");
        return;
      }

      setMessage("Verification email sent!");
      setCooldown(data.cooldown || 60);
    } catch (err) {
      console.error("Resend error:", err);
      setError("Failed to resend. Please log in and try again.");
    }
  }
  
  // if token is valid and user is verified show this
  if (verified) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h1>Account Verified</h1>
          <p className="auth-subtitle">Your email has been verified. Please log in to continue.</p>
          <Link to="/login">
            <button className="btn btn-primary">Go to Login</button>
          </Link>
        </div>
      </div>
    );
  }
  // if token is invalid
  if (token && error) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h1>Verification Failed</h1>
          <div className="auth-error">{error}</div>
          <Link to="/">
            <button className="btn btn-primary">Back</button>
          </Link>
        </div>
      </div>
    );
  }
  // no token show resend email button
  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-back">
          ← Back
        </Link>
        <h1>Verify Your Email</h1>
        <p className="auth-subtitle">
          Check your inbox for a verification link. If you don't see it, check your spam folder.
        </p>

        {message && <div className="auth-success">{message}</div>}
        {error && <div className="auth-error">{error}</div>}

        <button
          className="btn btn-primary"
          onClick={handleResend}
          disabled={cooldown > 0}
        >
          {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Verification Email"}
        </button>
      </div>
    </div>
  );
}
