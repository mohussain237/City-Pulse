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
    <div style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f5f5f5",
    }}>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>SignUp</h2>

          <button className="common-btn" >
            <Link to="/">Guest</Link>
          </button>
        </div>

        <div style={{ maxWidth: 375, marginTop: "10px" }}>
          <input  className="text-input" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          <input  className="text-input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input  className="text-input" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <div style={{ display: "flex" }}>
            <button onClick={handleSignup} className="account-btn ">Create account</button>
            <button className="common-btn"><Link to="/login">Login</Link> </button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>


    </div>
  );
}
