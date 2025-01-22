// Filename: ForgotPasswordPage.tsx
import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/LoginSignup.module.css";
import apiClient from "../utils/apiClient";

const ForgotPasswordPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePasswordReset = async (e: FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error
    setMessage(null); // Reset message

    if (!username) {
      setError("Please enter your username.");
      return;
    }

    try {
      await apiClient.post("/forgot-password", { username });
      setMessage("Password reset link sent. Please check your email.");
    } catch (err: any) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2>Forgot Password</h2>
        <form onSubmit={handlePasswordReset}>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {error && <div className={styles.errorMessage}>{error}</div>}
          {message && <div className={styles.successMessage}>{message}</div>}
          <button type="submit">Send Reset Link</button>
        </form>
        <p>
          Remembered your password?{" "}
          <button
            className={styles.linkButton}
            onClick={() => navigate("/")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

