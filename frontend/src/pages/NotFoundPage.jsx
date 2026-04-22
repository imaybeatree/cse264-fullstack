import { useNavigate } from "react-router";
import { getToken } from "../lib/token"; // adjust path if needed

export default function NotFoundPage() {
  const navigate = useNavigate();

  function handleGoHome() {
    const token = getToken();

    if (token) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }

  return (
    <div className="onboarding-page">
      <div className="onboarding-card" style={{ textAlign: "center" }}>
        <h1 className="onboarding-title" style={{ fontSize: "3rem" }}>
          404
        </h1>
        <p className="onboarding-subtitle" style={{ marginBottom: "24px" }}>
          Page not found. Maybe try a different recipe?
        </p>

        <button className="primary-btn" onClick={handleGoHome}>
          Go Home
        </button>
      </div>
    </div>
  );
}