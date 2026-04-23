import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { http } from "../../lib/http";
import Navbar from "../home/Navbar";
import "@/css/onboarding.css";

export default function AccountPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
        http().post("/api/mail/reset", { email }).catch(() => {});
        alert("done")
    } catch (err) {
      console.error("Login error:", err);
    }
  }

  useEffect(() => {
    http()
      .get("/api/user/me")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setEmail(data.email);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        setEmail("unknown");
      });
  }, []);

    return (
    <>
        <Navbar />

        <div className="onboarding-page">
        <div className="onboarding-card">
            <h1 className="onboarding-title">Account</h1>

            <div className="onboarding-section">
            <h2>Email</h2>
            <p>{email || "Loading..."}</p>
            </div>

            <div className="onboarding-section">
            <h2>Password</h2>
            <p>••••••••</p>

            <button
                className="secondary-btn"
                onClick={handleSubmit}
            >
                Reset Password
            </button>
            </div>

            <div className="onboarding-section">
            <h2>Preferences</h2>
            <p>Update your food preferences and dietary settings.</p>

            <button
                className="primary-btn"
                onClick={() => navigate("/onboarding")}
            >
                Edit Preferences
            </button>
            </div>
        </div>
        </div>
    </>
    );
}