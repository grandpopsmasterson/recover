// src/components/Card.tsx

import React from 'react';

interface CardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, onClick }) => {
  return (
    <div
      className="bg-dark-navy-500 p-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-white text-2xl mb-4">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default Card;
