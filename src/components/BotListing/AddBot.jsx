import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { close } from '../../assets';

const AddBot = ({ onClose }) => {
  const [token, setToken] = useState('');
  const [botName, setBotName] = useState(''); // State to store the bot name

  const handleSubmit = () => {
    // Retrieve affiliate_partner_id from localStorage
    const stackIdData = localStorage.getItem('stackIdData');
    const affiliateId = stackIdData ? JSON.parse(stackIdData).id : null;

    if (!affiliateId) {
      console.error('Affiliate ID not found in localStorage');
      return;
    }

    // Prepare the payload for the API request
    const payload = {
      affiliate_partner_id: affiliateId,
      bot_name: botName,
      status: 'active',
      token: token,
    };

    // Make the API request to create the bot
    fetch('https://apbot.copartner.in/api/postbottoken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create bot');
        }
        return response.json();
      })
      .then((data) => {
        toast.success(`Bot "${botName}" has been created successfully!`);
        onClose(); // Close the popup after submission
      })
      .catch((error) => {
        console.error('Error creating bot:', error);
        toast.error('Failed to create bot. Please try again.');
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2E374B] p-8 rounded-lg shadow-xl md:w-96 w-80">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-semibold text-white">Add Your Bot</h2>
          <img
            src={close}
            onClick={onClose}
            alt="close"
            className="w-6 h-6 cursor-pointer hover:opacity-75 transition-opacity duration-200"
          />
        </div>
        <input
          type="text"
          value={botName}
          onChange={(e) => setBotName(e.target.value)}
          className="w-full p-3 border border-gray-600 rounded-lg mb-4 bg-[#3B475F] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fff] transition"
          placeholder="Name Your Bot"
        />
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
      <ToastContainer />
    </div>
  );
};

export default AddBot;
