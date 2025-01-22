// src/components/Button.tsx
import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean; // Add disabled prop
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = 'button', className = '', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-8 py-3 bg-transparent border-2 border-lime-500 text-white font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-lime-500 hover:text-black 
        ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} // Conditionally add disabled styles
      disabled={disabled} // Apply disabled attribute
    >
      {label}
    </button>
  );
};

export default Button;



