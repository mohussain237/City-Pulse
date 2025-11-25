import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Login() {
  const { login } = useAppContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const res = login({ email, password });
    if (!res.success) {
      setError(res.message);
      return;
    }
    navigate("/home");
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Login</h2>
      <div style={{ maxWidth: 345, marginTop: 8 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>

        <div style={{ marginTop: 8 , display:"flex", flexDirection: "column", }}>
          <button className="details-btn" onClick={handleLogin}>Login</button>
          <button className="details-btn"> <Link to="/signup" style={{ marginLeft: 8 }}>Sign up</Link> </button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
