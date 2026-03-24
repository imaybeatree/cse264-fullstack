import { Link } from "react-router-dom";
import UserForm from "./userForm";
import "@/css/auth.css"

export default function LoginPage() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-back">
          ← Back
        </Link>
        <h1>Login</h1>
        <p className="auth-subtitle">Login to your account.</p>

        <UserForm api="/api/auth/login" />

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}