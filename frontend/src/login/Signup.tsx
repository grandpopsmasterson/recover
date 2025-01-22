// Filename: Signup.tsx
import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/LoginSignup.module.css"; // Import the CSS module
import apiClient from "../utils/apiClient";

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null); // Error state as a string or null
  const navigate = useNavigate();

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error on each attempt

    if (!username || !password) {
      setError("Please fill in both fields.");
      return;
    }
    console.log("Submitting:", { username, password });
    try {
      await apiClient.post('/signup', { username, password });
      navigate("/");
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        setError("Error: Username is already taken.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
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
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account?{" "}
          <button className={styles.linkButton} onClick={() => navigate("/")}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
