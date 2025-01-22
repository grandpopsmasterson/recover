// Filename: App.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

describe("App Component", () => {
  test("renders login page on default route", () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Check if the Login component is rendered
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test("navigates to signup page when clicking on signup link", () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Trigger navigation by clicking the 'Sign Up' link
    fireEvent.click(screen.getByText(/sign up/i));

    // Check if the Signup page is rendered
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  test("navigates to dashboard page after successful login", async () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Simulate the login action, and after that, check if the Dashboard page appears
    fireEvent.click(screen.getByText(/login/i));

    // Assuming login would navigate to the Dashboard
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
});
