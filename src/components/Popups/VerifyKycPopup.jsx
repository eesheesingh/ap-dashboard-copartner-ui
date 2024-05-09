import React, { useState } from 'react';
import { close } from '../../assets';

const VerifyKycPopup = ({ onClose }) => {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const handleCheckboxChange1 = () => {
    setIsChecked1(!isChecked1);
  };

  const handleCheckboxChange2 = () => {
    setIsChecked2(!isChecked2);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#2E374B] md:p-8 p-2 rounded-[20px] shadow-lg relative md:w-[716px] w-[350px]">
        <div className="absolute top-2 right-2">
          <button onClick={onClose}>
            <img src={close} alt="Close" className="w-10 h-10" />
          </button>
        </div>
        <div className="pb-4 text-left">
          <h2 className="text-[24px] font-semibold">Pan Card Verification</h2>
          <p className="text-[#c9c9c9] mt-2">
            Full access to in any of our products Full access to in any of{' '}
          </p>
        </div>
        <div className="max-w-[643px] min-h-[303px] border border-[#ffffff3c] rounded-xl relative">
          {/* Empty space div for showing the captured image */}
          Camera
        </div>

        {/* Checklists */}
        <div className="flex flex-col space-y-2 mt-4">
          <label className="flex items-start text-left">
            <input
              type="checkbox"
              checked={isChecked1}
              onChange={handleCheckboxChange1}
              className="mr-2 mt-2"
            />
            I/ We hereby declare, represent and undertake -&gt; The information and the documents
            submitted by me are true, correct and accurate. I am/ we are the rightful owner and/or
            in genuine possession of the said documents/ information.
          </label>
          <label className="flex items-start text-left">
            <input
              type="checkbox"
              checked={isChecked2}
              onChange={handleCheckboxChange2}
              className="mr-2 mt-2"
            />
            I/ We hereby declare, represent and undertake -&gt; The information and the documents
            submitted by me are true, correct and accurate. I am/ we are the rightful owner and/or
            in genuine possession of the said documents/ information.
          </label>
        </div>

        <div className="flex justify-center items-center pt-3">
          <button
            className="bg-[#000] text-white hover:text-[#000] px-4 py-4 rounded-md hover:bg-[#fff] transition duration-300"
          >
            Capture Photo
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyKycPopup;
