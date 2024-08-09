import React from 'react';

const IconBox = ({ title, count, icon, isActive, onClick }) => {
  return (
    <div 
      className={`flex items-center p-4 border rounded-[20px] shadow-lg md:w-[300px] transition transform hover:scale-105 ${
        isActive ? 'bg-[#fff] text-[#000] border-blue-800 shadow-2xl' : 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 border-[#ffffff2a]'
      }`} 
      onClick={onClick}
    >
      <div className="flex-grow">
        <h3 className="text-lg font-semibold font-poppins">{title}</h3>
        <p className="text-[20px]">{count}</p>
      </div>
      <div className="bg-gray-700 p-2 rounded-full">
        {icon}
      </div>
    </div>
  );
};

export default IconBox;
