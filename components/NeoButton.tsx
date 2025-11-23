import React from 'react';

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  children: React.ReactNode;
}

const NeoButton: React.FC<NeoButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  let bgClass = 'bg-white';
  if (variant === 'primary') bgClass = 'bg-neo-yellow';
  if (variant === 'secondary') bgClass = 'bg-neo-pink';
  if (variant === 'accent') bgClass = 'bg-neo-green';

  return (
    <button
      className={`${bgClass} border-2 border-black font-bold py-2 px-6 shadow-neo transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none text-black ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default NeoButton;
