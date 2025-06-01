import React from "react";

const Button = ({ children }) => {
  return (
    <button className="min-w-[150px] border border-gray-800 px-4
    py-2 rounded-full hover:bg-gray-400 h-[50px] flex items-center hover:cursor-pointer
    justify-center text-gray-800 font-semibold transition-colors duration-300
    active:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
      {children}
    </button>
  );
};

export default Button;
