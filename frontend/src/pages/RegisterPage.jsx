import { Link, useNavigate } from "react-router-dom";
import CreateUserForm from "../forms/createuserForm";

export default function RegisterPage() {
  const navigate = useNavigate();



    navigate("/success");
  

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Register</h1>
        <p className="auth-subtitle">Create your account to get started.</p>

        <CreateUserForm></CreateUserForm>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}