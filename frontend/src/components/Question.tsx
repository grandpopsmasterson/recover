// src/components/Question.tsx
import React from 'react';

interface QuestionProps {
  label?: string; // Optional label
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string | null; // Update to accept `string | null`
}

const Question: React.FC<QuestionProps> = ({ label, name, value, onChange, placeholder, error }) => {
  return (
    <div className="w-full mb-8">
      {/* Render label only if provided */}
      {label && <label className="block text-white text-lg mb-2">{label}</label>}

      {/* Input field with conditional styling based on error */}
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-6 py-4 bg-transparent border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 
          ${error ? 'border-red-500 placeholder-red-500' : 'border-lime-500'}`} // Error style
        placeholder={placeholder}
        required
      />

      {/* Display error message if it exists */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default Question;







