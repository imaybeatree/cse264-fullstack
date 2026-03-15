import { Link } from "react-router-dom";

export default function SuccessPage() {
  return (
    <div className="auth-page">
      <div className="auth-card success-card">
        <h1>Login Successful</h1>
        <p className="auth-subtitle">
          This is a temporary success page placeholder.
        </p>

        <div className="success-actions">
          <Link to="/login" className="secondary-link">
            Back to Login
          </Link>
          <Link to="/register" className="secondary-link">
            Go to Register
          </Link>
        </div>
      </div>
    </div>
  );
}