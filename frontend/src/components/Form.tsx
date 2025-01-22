import React from 'react';

interface FormProps {
  onSubmit: React.FormEventHandler;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-md mx-auto">
      {children}
    </form>
  );
};

export default Form;

