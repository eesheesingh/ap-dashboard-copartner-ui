import React, { useState, useEffect } from 'react';
import { close } from '../../assets';

const AddUpiPopup = ({ onClose, addUpiDetails, initialUpiID }) => {
  const [UpiDetails, setAddUpiDetails] = useState({
    UpiID: '',
  });
  const [acknowledged, setAcknowledged] = useState(false); // State to track acknowledgment
  const [error, setError] = useState('');
  const handleAcknowledgmentChange = () => {
    setAcknowledged(!acknowledged); // Toggle acknowledgment state
  };


  // Set initial UPI ID when the component mounts
  useEffect(() => {
    setAddUpiDetails({ UpiID: initialUpiID || '' });
  }, [initialUpiID]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAddUpiDetails({ ...UpiDetails, [id]: value });
  };

  const handleSubmit = () => {
    // Check acknowledgment
    if (!acknowledged) {
      setError('Please acknowledge that the bank/payment details provided are accurate.');
      return;
    }
  
    // Check if any field is empty
    if (!UpiDetails.UpiID) {
      setError('All fields are required to be filled');
      return;
    }
  
    // If acknowledgment is given and UPI ID is provided, submit the form
    addUpiDetails({ ...UpiDetails });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#2E374B] p-4 rounded-[20px] shadow-lg relative w-[400px]">
        <div className="absolute top-1 right-2">
          <button onClick={onClose}>
            <img src={close} alt="Close" className="w-10 h-10" />
          </button>
        </div>
        <h2 className="text-[40px] subheading-color font-semibold mb-4">Add Bank Details</h2>
        <div className='grid grid-cols-2 gap-4'>
          <div className="relative col-span-2">
            <input type="text" id="UpiID" required className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-[15px] border-1 border-[1px] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#ffffff46] focus:outline-none focus:ring-0 focus:border-[#ffffff41] peer" placeholder=" " value={UpiDetails.UpiID} onChange={handleChange} />
            <label htmlFor="UpiID" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-[#2E374B] px-2 peer-focus:bg-[#282F3E] peer-focus:px-2 peer-focus:text-[#fff] peer-focus:dark:text-[#fff]  peer-focus:rounded-md peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">UPI ID</label>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mt-3 px-1">{error}</p>}
        {/* Acknowledgment checklist */}
        <div className="flex items-start mt-4">
          <input
            type="checkbox"
            id="acknowledgment"
            checked={acknowledged}
            onChange={handleAcknowledgmentChange}
            className="mr-2 mt-2"
          />
          <label htmlFor="acknowledgment" className="text-gray-400 text-md text-left">
            I acknowledge that the bank/payment details provided are accurate and authorize Hailgro Tech Solutions Pvt. Ltd. to process transactions accordingly.
          </label>
        </div>
        <div className="flex justify-center mt-8">
          <button onClick={handleSubmit} className="w-full px-10 py-2 bg-[#fff] hover:bg-[#000] text-[#000] hover:text-[#FFF] transition duration-300 rounded-md hover:[#000] focus:outline-none focus:bg-[#000]">
            {initialUpiID ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddUpiPopup;
