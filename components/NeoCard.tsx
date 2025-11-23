import React from 'react';

interface NeoCardProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

const NeoCard: React.FC<NeoCardProps> = ({ children, className = '', color = 'bg-white' }) => {
  return (
    <div className={`${color} border-4 border-black p-6 shadow-neo-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-neo-xl ${className}`}>
      {children}
    </div>
  );
};

export default NeoCard;