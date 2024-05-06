import React, { useState, useEffect } from 'react';
import { close, hdfcImg, iciciBank, paytmImg } from '../../assets';

const BankListingPopup = ({ onClose }) => {

  const handleSubmit = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#2E374B] p-4 rounded-[20px] shadow-lg relative">
        <div className="absolute top-1 right-2">
          <button onClick={onClose}>
            <img src={close} alt="Close" className="w-10 h-10" />
          </button>
        </div>
        <h2 className="text-[40px] subheading-color font-semibold mb-4">Withdrawal</h2>
        <div className=''>
            <div className=''>
                <div className='flex flex-row justify-between items-center'>
                    <span className='text-left md:text-[22px] xl:text-[40px] font-semibold'>Select Bank</span>
                    <button
            className="flex hover:bg-[#fff] items-center text-white hover:text-[#000] px-5 py-2 border-[1px] rounded-lg transition duration-300">
            + Add UPI
          </button>
                </div>

                <div className='flex flex-row gap-3 flex-wrap py-2'>
                <div className='sampleBank p-1 w-[310px] flex items-center justify-start flex-row bg-[#0000003d] border-[#ffffff1d] border-[1px] rounded-xl'>
              <img src={hdfcImg} alt="" />
              <div className='flex flex-col p-2'>
                <span className='text-lg'>HDFC</span>
                <span className='text-[#c9c9c9]'>234567890</span>
              </div>
            </div>

            <div className='sampleBank p-1 w-[310px] flex items-center justify-start flex-row bg-[#0000003d] border-[#ffffff1d] border-[1px] rounded-xl px-2'>
              <img src={iciciBank} alt="" className='w-[20%]' />
              <div className='flex flex-col p-2'>
                <span className='text-lg'>ICICI Bank</span>
                <span className='text-[#c9c9c9]'>234567890</span>
              </div>
            </div>

            <div className='sampleBank p-1 w-[310px] flex items-center justify-start flex-row bg-[#0000003d] border-[#ffffff1d] border-[1px] rounded-xl px-2'>
              <img src={hdfcImg} alt="" className='w-[20%]' />
              <div className='flex flex-col p-2'>
                <span className='text-lg'>ICICI Bank</span>
                <span className='text-[#c9c9c9]'>234567890</span>
              </div>
            </div>
            </div>

            {/* UPI Details */}
      <div className='flex justify-between items-center mt-4 border-t-[1px] border-[#ffffff2a] pt-5'>
        <h2 className="text-left md:text-[22px] xl:text-[40px] font-semibold">UPI Details</h2>
        <div className="flex items-center">
          <button
            className="flex hover:bg-[#fff] items-center text-white hover:text-[#000] px-5 py-2 border-[1px] rounded-lg transition duration-300"
          >
            + Add UPI
          </button>
        </div>
      </div>

      <div className='flex flex-row gap-3 flex-wrap'>
          <div className='flex flex-row items-center gap-4 flex-wrap mt-5'>
            <div className='p-1 w-[310px] flex items-center justify-start flex-row bg-[#0000003d] border-[#ffffff1d] border-[1px] rounded-xl gap-3'>
              <img src={paytmImg} alt="" className='w-10 bg-[#fff] rounded-md' />
              <span className='text-[#c9c9c9]'>8169499331@paytm</span>
              <button
                className="ml-auto hover:bg-[#ffffff21] transition duration-300 rounded-[50px] hover:scale-125 text-white px-1 py-1 mr-2">
              </button>
            </div>

            <div className='p-1 w-[310px] flex items-center justify-start flex-row bg-[#0000003d] border-[#ffffff1d] border-[1px] rounded-xl gap-3'>
              <img src={paytmImg} alt="" className='w-10 bg-[#fff] rounded-md' />
              <span className='text-[#c9c9c9]'>8169499331@paytm</span>
              <button
                className="ml-auto hover:bg-[#ffffff21] transition duration-300 rounded-[50px] hover:scale-125 text-white px-1 py-1 mr-2">
              </button>
            </div>

            <div className='p-1 w-[310px] flex items-center justify-start flex-row bg-[#0000003d] border-[#ffffff1d] border-[1px] rounded-xl gap-3'>
              <img src={paytmImg} alt="" className='w-10 bg-[#fff] rounded-md' />
              <span className='text-[#c9c9c9]'>8169499331@paytm</span>
              <button
                className="ml-auto hover:bg-[#ffffff21] transition duration-300 rounded-[50px] hover:scale-125 text-white px-1 py-1 mr-2">
              </button>
            </div>
          </div>
            </div>

            <div className='flex justify-center items-center py-2'>
              <div className='flex flex-row gap-3 items-center'>
                <span className='flex-nowrap whitespace-nowrap text-lg'>Your Amount: </span>
                <input
              type="text"
              className="border border-[#ffffff52] bg-transparent rounded-[10px] px-3 py-2 mt-2 w-[100%]" // Adjusted width here
              placeholder="Balance - 30,000"
            />
              </div>
            </div>
            </div>
        </div>
        <div className="flex justify-center mt-8">
          <button onClick={handleSubmit} className="w-full px-10 py-2 bg-[#fff] hover:bg-[#000] text-[#000] hover:text-[#FFF] transition duration-300 rounded-md hover:[#000] focus:outline-none focus:bg-[#000]">
          </button>
        </div>
      </div>


    </div>
  );
}

export default BankListingPopup;
