
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate("/home"), 1300);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1 style={{ margin: 0 }}>City Pulse</h1>
      <p style={{ color: "#666" }}>Local Events Explorer</p>
    </div>
  );
}
