import React from "react";

const Button = ({ children, onClick, disabled = false }) => {
  return (
    <button
      role="button"
      onClick={onClick}
      disabled={disabled}
      className={`min-w-[120px] border border-gray-800 px-3
        py-2 rounded-full h-[40px] flex items-center
        justify-center text-gray-800 font-medium text-sm transition-colors duration-300
        ${disabled 
          ? 'opacity-50 cursor-not-allowed bg-gray-200' 
          : 'hover:bg-gray-400 hover:cursor-pointer active:bg-gray-200'
        }`}
    >
      {children}
    </button>
  );
};

export default Button;
