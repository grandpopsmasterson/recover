// Filename: App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import DashTimeline from "./pages/dashboard/dashTimeline";
import CreateProject from "./pages/project/CreateProjectForm"; // Your create project page component
import Login from "./login/Login";
import Signup from "./login/Signup";
import FileUploadForm from "./pages/uploads/FileUploadForm";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/upload-video" element={<FileUploadForm />} />
        <Route path="/timeline" element={<DashTimeline />} />
      </Routes>
    </Router>
  );
};

export default App;

