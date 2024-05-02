import React, { useState } from 'react'
import { hdfcImg, paytmImg } from '../../assets'

const BankSetting = () => {

  return (
    
    <div className='p-4 border-[1px] border-[#fff3] rounded-xl'>
      <div className='flex justify-between items-center'>
        <h2 className="text-left md:text-[22px] xl:text-[40px] font-semibold">Bank Details</h2>
        <div className="flex items-center">
          <button
            className="flex hover:bg-[#fff] items-center text-white hover:text-[#000] px-5 py-2 border-[1px] rounded-lg transition duration-300"
          > + Add Bank</button>
        </div>
        </div>

        <div className='flex flex-row items-center gap-4 flex-wrap mt-5 border-b-[1px] border-[#ffffff2a] pb-5'>
            <div className='p-1 w-[310px] flex items-center justify-start flex-row bg-[#0000003d] border-[#ffffff1d] border-[1px] rounded-xl'>
                <img src={hdfcImg} alt="" />
                <div className='flex flex-col p-2'>
                    <span className='text-lg'>HDFC Bank</span>
                    <span className='text-[#c9c9c9]'>8169499331</span>
                </div>
            </div>

            <div className='p-1 w-[310px] flex items-center justify-start flex-row bg-[#0000003d] border-[#ffffff1d] border-[1px] rounded-xl'>
                <img src={hdfcImg} alt="" />
                <div className='flex flex-col p-2'>
                    <span className='text-lg'>HDFC Bank</span>
                    <span className='text-[#c9c9c9]'>8169499331</span>
                </div>
            </div>

            <div className='p-1 w-[310px] flex items-center justify-start flex-row bg-[#0000003d] border-[#ffffff1d] border-[1px] rounded-xl'>
                <img src={hdfcImg} alt="" />
                <div className='flex flex-col p-2'>
                    <span className='text-lg'>HDFC Bank</span>
                    <span className='text-[#c9c9c9]'>8169499331</span>
                </div>
            </div>

            <div className='p-1 w-[310px] flex items-center justify-start flex-row bg-[#0000003d] border-[#ffffff1d] border-[1px] rounded-xl'>
                <img src={hdfcImg} alt="" className='rounded-lg'/>
                <div className='flex flex-col p-2'>
                    <span className='text-lg'>HDFC Bank</span>
                    <span className='text-[#c9c9c9]'>8169499331</span>
                </div>
            </div>
        </div>

        <div className='flex justify-between items-center mt-4'>
        <h2 className="text-left md:text-[22px] xl:text-[40px] font-semibold">Bank Details</h2>
        <div className="flex items-center">
          <button
            className="flex hover:bg-[#fff] items-center text-white hover:text-[#000] px-5 py-2 border-[1px] rounded-lg transition duration-300"
          > + Add Bank</button>
        </div>
        </div>

        <div className='flex flex-row items-center gap-4 flex-wrap mt-5'>

            <div className='p-1 w-[310px] flex items-center justify-start flex-row bg-[#0000003d] border-[#ffffff1d] border-[1px] rounded-xl gap-3'>
                <img src={paytmImg} alt="" className='w-10 bg-[#fff] rounded-md'/>
                    <span className='text-[#c9c9c9]'>8169499331@paytm</span>
            </div>


        </div>

      </div>
  )
}

export default BankSetting