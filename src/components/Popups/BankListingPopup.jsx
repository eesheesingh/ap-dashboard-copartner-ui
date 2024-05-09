import React, { useState } from 'react';
import { close, hdfcImg, iciciBank, paytmImg } from '../../assets';
import AddBankPopup from './AddBankPopup';
import AddUpiPopup from './AddUpiPopup';
import VerifyKycPopup from './VerifyKycPopup';

const BankListingPopup = ({ onClose }) => {
  const [verifyPopupOpen, setVerifyPopupOpen] = useState(false); // State to manage the KYC verification popup
  const [isAddBankPopupOpen, setIsAddBankPopupOpen] = useState(false);
  const [isAddUpiPopupOpen, setIsAddUpiPopupOpen] = useState(false);
  const [bankDetails, setBankDetails] = useState([]);
  const [upiDetails, setUpiDetails] = useState([]);

  const handleVerify = () => {
    // Implement PAN card verification logic here
    // Open the KYC verification popup
    setVerifyPopupOpen(true);
  }

  const toggleAddBankPopup = () => {
    setIsAddBankPopupOpen(!isAddBankPopupOpen);
  };

  const toggleAddUpiPopup = () => {
    setIsAddUpiPopupOpen(!isAddUpiPopupOpen);
  };

  const addBankDetails = (details) => {
    setBankDetails([...bankDetails, details]);
  };

  const addUpiDetails = (details) => {
    setUpiDetails([...upiDetails, details]);
  };

  const deleteUpiDetail = (index) => {
    const updatedUpiDetails = [...upiDetails];
    updatedUpiDetails.splice(index, 1);
    setUpiDetails(updatedUpiDetails);
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#2E374B] p-4 rounded-[20px] shadow-lg relative md:w-[1000px] xl:w-[1084px] w-[350px] xl:max-w-[800px]">
        <div className="absolute top-1 right-2">
          <button onClick={onClose}>
            <img src={close} alt="Close" className="w-10 h-10" />
          </button>
        </div>
        <h2 className="text-[40px] subheading-color font-semibold mb-4 text-left">Withdrawal</h2>
        {/* Bank Details */}
        <div className="">
          <div className="flex flex-row justify-between items-center">
            <span className="text-left md:text-[22px] xl:text-[40px] font-semibold">Select Bank</span>
            <button
              className="flex hover:bg-[#fff] items-center text-white hover:text-[#000] px-5 py-2 border-[1px] rounded-lg transition duration-300"
              onClick={toggleAddBankPopup}
            >
              + Add Bank
            </button>
          </div>
          {/* Render Bank Details Here */}
          <div className="flex flex-row gap-3 md:justify-start justify-center flex-wrap mt-2">
            {bankDetails.map((detail, index) => (
              <div key={index} className="sampleBank md:p-1 md:pr-0 pr-4 md:w-[310px] flex items-center justify-start flex-row bg-[#0000003d] border-[#ffffff1d] border-[1px] rounded-xl">
                <img src={hdfcImg} alt=""/>
                <div className="flex flex-col md:p-2 pr-2 text-left">
                  <span className="md:text-lg text-[12px]">{detail.bankName}</span>
                  <span className="text-[#c9c9c9] md:text-[15px] text-[10px]">{detail.accountNumber}</span>
                </div>
              </div>
            ))}
          </div>
          {/* UPI Details */}
          <div className="flex justify-between items-center mt-4 border-t-[1px] border-[#ffffff2a] pt-5">
          <h2 className="text-left md:text-[22px] xl:text-[40px] font-semibold">UPI Details</h2>
          <div className="flex items-center">
            <button
              className="flex hover:bg-[#fff] items-center text-white hover:text-[#000] px-5 py-2 border-[1px] rounded-lg transition duration-300"
              onClick={toggleAddUpiPopup}
            >
              + Add UPI
            </button>
          </div>
        </div>
        {/* Render UPI Details Here */}
        <div className="flex flex-row md:justify-start justify-center gap-3 flex-wrap mt-2">
          {upiDetails.map((detail, index) => (
            <div key={index} className="sampleBank p-1 md:w-[310px] flex items-center justify-start flex-row bg-[#0000003d] border-[#ffffff1d] border-[1px] rounded-xl">
              <img src={paytmImg} alt="" />
              <div className="flex flex-col p-2">
                <span className="md:text-lg text-[12px]">{detail.UpiID}</span>
                {/* Optionally, you can display more details */}
              </div>
              <button
                className="ml-auto hover:bg-[#ffffff21] transition duration-300 rounded-[50px] hover:scale-125 text-white px-1 py-1 mr-2"
                onClick={() => deleteUpiDetail(index)}
              >
              </button>
            </div>
          ))}
        
        {/* Withdrawal Popup */}
        {verifyPopupOpen && <VerifyKycPopup onClose={() => setVerifyPopupOpen(false)} />}
        {/* Add Bank Popup */}
        {isAddBankPopupOpen && <AddBankPopup onClose={toggleAddBankPopup} addBankDetails={addBankDetails} />}
        {/* Add UPI Popup */}
        {isAddUpiPopupOpen && <AddUpiPopup onClose={toggleAddUpiPopup} addUpiDetails={addUpiDetails} />}
        {/* Withdraw Button */}
       
      </div>
      <div className="flex justify-center items-center pt-3">
          <button
            className="bg-[#000] text-white hover:text-[#000] px-4 py-4 rounded-md hover:bg-[#fff] transition duration-300"
            onClick={handleVerify}
            >
            Withdraw
          </button>
        </div>
    </div>
    </div>
    </div>
  );
};

export default BankListingPopup;
