import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { GlobalContext } from "./GlobalContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { updateUserData } = useContext(GlobalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Make the POST request to the Django backend
      const response = await fetch("http://192.168.0.181:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data.token);

      if (response.ok) {
        let a = data.type;
        a = a.toLowerCase();
        updateUserData(data);
        setError("");
        if (a === "doctor") {
          navigate("/doctor");
        } else if (a === "patient") {
          navigate("/patient");
        } else if (a === "admin") {
          navigate("/admin");
        }
      } else {
        setError(data.data);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome to Dhanush Hospital</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
