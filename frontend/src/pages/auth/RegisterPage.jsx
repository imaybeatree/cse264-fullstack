import { Link } from "react-router-dom";
import UserForm from "./userForm";
import "@/css/auth.css"
export default function RegisterPage() {

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-back">
          ← Back
        </Link>
        <h1>Register</h1>
        <p className="auth-subtitle">Create your account to get started.</p>

        <UserForm api="/api/auth/register"></UserForm>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}