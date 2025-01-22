// Filename: Login.tsx
import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/LoginSignup.module.css"; // Import the CSS module
import apiClient from "../utils/apiClient";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      const response = await apiClient.post("/login", { username, password });
      navigate("/dashboard");
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setError("Invalid login credentials. Please try again.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className={styles.errorMessage}>{error}</div>}
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <button
            className={styles.linkButton}
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </p>
        <p>
          <button
            className={styles.linkButton}
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

