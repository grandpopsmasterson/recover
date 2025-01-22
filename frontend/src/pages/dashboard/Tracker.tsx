import React, { useState } from "react";
import styles from "../../styles/tracker.module.css";

interface TrackerProps {
    totalSteps: number; // Total number of nodes
    currentStep: number; // The current active node
    onPrevious: () => void; // Function to handle moving to the previous step
    onNext: () => void; // Function to handle moving to the next step
  }
  
  const Tracker: React.FC<TrackerProps> = ({ totalSteps, currentStep, onPrevious, onNext }) => {
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  
    return (
      <div className={styles.trackerContainer}>
        <button
          onClick={onPrevious}
          disabled={currentStep === 1}
          className={styles.arrowButton}
        >
          &lt;
        </button>
  
        <div className={styles.stepsContainer}>
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div
                className={`${styles.stepNode} ${
                  step < currentStep
                    ? styles.completedNode
                    : step === currentStep
                    ? styles.currentNode
                    : styles.inactiveNode
                }`}
              >
                {step < currentStep ? "✔" : ""}
              </div>
              {index < steps.length - 1 && <div className={styles.connector} />}
            </React.Fragment>
          ))}
        </div>
  
        <button
          onClick={onNext}
          disabled={currentStep === totalSteps}
          className={styles.arrowButton}
        >
          &gt;
        </button>
      </div>
    );
  };
  
  export default Tracker;
