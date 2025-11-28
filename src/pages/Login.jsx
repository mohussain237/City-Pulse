import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Login() {
  const { login, logout, user } = useAppContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    console.log("====================================");
    console.log("🔐 Attempting Login");
    console.log("📧 Email:", email);
    console.log("====================================");

    const res = login({ email, password });

    if (!res.success) {
      console.log("❌ Login Failed:", res.message);
      setError(res.message);
      return;
    }

    console.log("✅ Login Success → Redirecting to Home");
    navigate("/home");
  };

  const handleGuestLogin = () => {
    console.log("====================================");
    console.log("👤 Switching to Guest Mode");
    console.log("====================================");

    logout();
    navigate("/home");
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
      }}
    >
      {/* Login Card */}
      <div
        style={{
          width: 350,
          padding: 20,
          borderRadius: 10,
          background: "white",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Login</h2>

          <button className="common-btn" onClick={handleGuestLogin}>
            <Link to="/">Guest</Link>
          </button>
        </div>

        <div style={{ marginTop: 10 }}>
          <input
          className="text-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

          />

          <input
           className="text-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="details-btn"
            onClick={handleLogin}
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
          >
            Login
          </button>

          <Link
            to="/signup"
            className="account-btn "
          >
            Sign up
          </Link>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}
