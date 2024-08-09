import React, { useState } from 'react';
import { close } from '../../assets';

const AddBot = ({ onClose }) => {
  const [token, setToken] = useState('');

  const handleSubmit = () => {
    // Handle token submission logic here
    console.log('Token:', token);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2E374B] p-8 rounded-lg shadow-xl md:w-96 w-80">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-semibold text-white">Enter Your Token</h2>
          <img
            src={close}
            onClick={onClose}
            alt="close"
            className="w-6 h-6 cursor-pointer hover:opacity-75 transition-opacity duration-200"
          />
        </div>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full p-3 border border-gray-600 rounded-lg mb-6 bg-[#3B475F] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fff] transition"
          placeholder="Enter token here"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 w-full bg-[#fff] text-[#000] hover:text-[#fff] rounded-lg hover:bg-[#000] transition-all"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBot;
