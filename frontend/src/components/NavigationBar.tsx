// NavigationBar.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="navigation-bar">
      <div className="nav-logo" onClick={() => navigate("/")}>
        MyApp
      </div>
      <ul className="nav-links">
        <li onClick={() => navigate("/dashboard")}>Dashboard</li>
        <li onClick={() => navigate("/create-project")}>Create Project</li>
        <li onClick={() => navigate("/profile")}>Profile</li>
        <li onClick={() => navigate("/logout")}>Logout</li>
      </ul>
    </nav>
  );
};

export default NavigationBar;

