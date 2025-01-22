// CreateProjectForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SlideTransition from '../../animations/SlideTransition';
import Button from '../../components/Button'; // Reusable Button
import Question from '../../components/Question'; // Reusable Question
import Form from '../../components/Form'; // Reusable Form Wrapper
import apiClient from '../../utils/apiClient';

interface FormData {
  [key: string]: string;
}

const CreateProjectForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    homeOwner: '',
    streetAddress: '',
    city: '',
    state: '',
    zipcode: '',
    carrier: '',
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const navigate = useNavigate();

  const questions = [
    { name: 'projectName', placeholder: 'Enter Project Name' },
    { name: 'homeOwner', placeholder: 'Enter Homeowner Name' },
    { name: 'streetAddress', placeholder: 'Enter Street Address' },
    { name: 'city', placeholder: 'Enter City' },
    { name: 'state', placeholder: 'Enter State' },
    { name: 'zipcode', placeholder: 'Enter Zip Code' },
    { name: 'carrier', placeholder: 'Enter Carrier' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    
    if (fieldError && formData[name] !== '') {
      setFieldError(null);
    }
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const currentQuestion = questions[currentQuestionIndex];

    if (!formData[currentQuestion.name]) {
      setFieldError('This field is required');
      return;
    }

    setFieldError(null);
    if (currentQuestionIndex < questions.length - 1) {
      setDirection('right');
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (currentQuestionIndex > 0) {
      setDirection('left');
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.values(formData).some((field) => field === '')) {
      setGlobalError('Please fill out all fields before submitting.');
      return;
    }

    try {
      const response = await apiClient.post('/create-project', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Project created successfully', response.data);
      navigate('/dashboard');
    } catch (error: any) {
      setGlobalError(error.response?.data?.message || 'Error creating project');
      console.error('Error creating project', error);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="page-container">
      <h2 className="text-2xl mb-6 text-center px-4">Create a New Project</h2>

      <Form onSubmit={handleSubmit}>
        <SlideTransition direction={direction} keyProp={String(currentQuestionIndex)}>
          <div className="mb-8">
            <Question
              name={currentQuestion.name}
              value={formData[currentQuestion.name]}
              onChange={handleInputChange}
              placeholder={currentQuestion.placeholder}
              error={fieldError && formData[currentQuestion.name] === '' ? fieldError : null}
            />
          </div>
        </SlideTransition>

        <div className="flex justify-between items-center mt-8 space-x-4">
          {currentQuestionIndex > 0 && (
            <Button
              label="Previous"
              onClick={handlePrevious}
              className="px-8 py-4 bg-blue-500 text-white rounded-lg"
            />
          )}
          {currentQuestionIndex < questions.length - 1 ? (
            <Button
              label="Next"
              onClick={handleNext}
              className="px-8 py-4 bg-blue-500 text-white rounded-lg"
              disabled={!formData[currentQuestion.name]}
            />
          ) : (
            <Button
              label="Create Project"
              type="submit"
              className="px-8 py-4 bg-green-500 text-white rounded-lg"
            />
          )}
        </div>
      </Form>

      {globalError && <div className="text-red-500 mt-4 text-center">{globalError}</div>}
    </div>
  );
};

export default CreateProjectForm;




