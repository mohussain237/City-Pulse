import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Signup() {
  const { signup } = useAppContext();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    const res = signup({ name, email, password });
    if (!res.success) {
      setError(res.message);
      return;
    }
    navigate("/home");
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Sign Up</h2>
      <div style={{ maxWidth: 420 }}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <div style={{ marginTop: 8 }}>
          <button onClick={handleSignup}>Create account</button>
          <Link to="/login" style={{ marginLeft: 8 }}>Login</Link>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
