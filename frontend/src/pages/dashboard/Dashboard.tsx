import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import Button from "../../components/Button"; // Reusable Button
import NavigationBar from "../../components/NavigationBar"; // Reusable Navigation Bar
import Tracker from "./Tracker";

interface Project {
  id: number;
  projectName: string;
  homeOwner: string;
  streetAddress: string;
  city: string;
  state: string;
  zipcode: string;
  carrier: string;
}

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [startProjectIndex, setStartProjectIndex] = useState<number>(0);
  const [endProjectIndex, setEndProjectIndex] = useState<number>(3);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiClient.get("/dashboard");
        setProjects(response.data);
      } catch (err: any) {
        if (err.response && err.response.status === 401) {
          setError("You need to log in first.");
          navigate("/");
        } else {
          setError("An error occurred while fetching your projects.");
        }
      }
    };
    fetchProjects();
  }, [navigate]);

  const handleNext = () => {
    if (endProjectIndex < projects.length) {
      setStartProjectIndex(startProjectIndex + 1);
      setEndProjectIndex(endProjectIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (startProjectIndex > 0) {
      setStartProjectIndex(startProjectIndex - 1);
      setEndProjectIndex(endProjectIndex - 1);
    }
  };

  const moveLeft = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const moveRight = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };


  return (
    <>
      <NavigationBar />
      <div className="page-container">
        <div className="top-section">
          <h1 className="dashboard-title">Dashboard</h1>
          <Button
            label="Create Project"
            onClick={() => navigate("/create-project")}
            className="create-project-btn"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="bottom-section">
          <div className="project-cards-container">
            {startProjectIndex > 0 && (
              <Button
                label="Previous"
                onClick={handlePrevious}
                className="px-8 py-4 bg-blue-500 text-white rounded-lg"
              />
            )}

            {projects.length === 0 ? (
              <p className="no-projects-message">You don't have any projects yet.</p>
            ) : (
              projects.slice(startProjectIndex, endProjectIndex + 1).map((project) => (
                <div key={project.id} className="card">
                  <h3 className="project-name">{project.projectName}</h3>
                  <p><strong>Homeowner:</strong> {project.homeOwner}</p>
                  <p><strong>Address:</strong> {project.streetAddress}, {project.city}, {project.state} {project.zipcode}</p>
                  <p><strong>Carrier:</strong> {project.carrier}</p>
                </div>
              ))
            )}

            {endProjectIndex < projects.length && (
              <Button
                label="Next"
                onClick={handleNext}
                className="px-8 py-4 bg-blue-500 text-white rounded-lg"
              />
            )}
          </div>
        </div>
        return (
            <div>
              <h1>Dashboard</h1>
              {/* Other dashboard content */}
              <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
                <Tracker
                  totalSteps={totalSteps}
                  currentStep={currentStep}
                  onPrevious={moveLeft}
                  onNext={moveRight}
                />
              </div>
            </div>
          );
        
      </div>
    </>
  );
};

export default Dashboard;












