import React, { useState } from 'react';
import { customBtn } from '../../assets';
import WalletTable from './WalletTable';
import WalletChart from './WalletChart';
import WalletChartMob from './WalletChartMob';
import BankListingPopup from '../Popups/BankListingPopup';

const WalletPage = () => {
    const [activeButtonFirstSection, setActiveButtonFirstSection] = useState('weekly');
    const [isBankListingPopupOpen, setIsBankListingPopupOpen] = useState(false);

    const toggleBankListingPopup = () => {
      setIsBankListingPopupOpen(!isBankListingPopupOpen);
    };

    return (
    <div className="xl:pt-3 md:p-4 sm:ml-[10rem] text-white">
    <div className="md:p-4 p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 md:mt-14 mt-[8rem]">
      <div className="text-white text-center">
      <div className="flex md:flex-row flex-col justify-between mt-2">
            <h2 className="md:text-left text-center md:text-[22px] text-[30px] xl:text-[40px] font-semibold w-full">Earning Analysis</h2>
            <div className="space-x-4 md:mr-1 xl:mr-[20px] flex w-full md:justify-end justify-center">
            {/* <button
                className={`button ${activeButtonFirstSection === 'today' ? 'bg-[#fff] text-[#000]' : 'bg-transparent'} border-[1px] hover:bg-[#fff] hover:text-[#000] transition duration-300 py-1 px-2 md:px-6 rounded`}
                onClick={() => setActiveButtonFirstSection('today')}
              >
                Today
              </button> */}
              <button
                className={`button ${activeButtonFirstSection === 'weekly' ? 'bg-[#fff] text-[#000]' : 'bg-transparent'} border-[1px] hover:bg-[#fff] hover:text-[#000] transition duration-300 py-1 px-2 md:px-6 rounded`}
                onClick={() => setActiveButtonFirstSection('weekly')}
              >
                Weekly
              </button>
              <button
                className={`button ${activeButtonFirstSection === 'monthly' ? 'bg-[#fff] text-[#000]' : 'bg-transparent'} border-[1px] hover:bg-[#fff] hover:text-[#000] transition duration-300 py-1 px-2 md:px-6 rounded`}
                onClick={() => setActiveButtonFirstSection('monthly')}
              >
                Monthly
              </button>
              <button
                className={`button ${activeButtonFirstSection === 'custom' ? 'bg-[#fff] text-[#000]' : 'bg-transparent'} border-[1px] hover:bg-[#fff] hover:text-[#000] transition duration-300 py-1 px-2 md:px-6 rounded flex items-center`}
                onClick={() => setActiveButtonFirstSection('custom')}
              >
                Custom
                <img src={customBtn} alt="" className="inline-block w-5 ml-1" />
              </button>
            </div>
            <div className="w-full flex justify-center md:w-[40%] cursor-pointer md:hidden mt-2" >
              <WalletChartMob activeButton={activeButtonFirstSection}/>
            </div>
              </div>

              <div className="flex md:flex-row flex-col mt-8 gap-3 md:justify-center">
            <div className="w-full xl:w-[59%] md:w-2/3 container-bg rounded-[30px]">
              <div className='flex md:flex-row flex-col xl:p-7 md:p-4 justify-between items-center'>
                <h3 className="text-center font-semibold md:text-[30px] text-[28px] xl:text-[50px]">Total Earning</h3>
                <div className="flex flex-row items-center justify-between gap-5 ">
                  <span className='md:text-[20px] text-[16px]'>
                    Withdrawal Balance: 200
                  </span>
                  <div className='p-2 items-center'>
                    <button className="bg-[#fff] hover:bg-[#000] text-[#000] hover:text-[#fff] transition duration-300 py-2 px-6 rounded" onClick={() => setIsBankListingPopupOpen(true)}>
                      Withdrawal
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className='flex md:flex-row flex-col justify-center gap-3 p-3'>
                  <div className='walletBox border-[1px] xl:w-1/2 md:w-1/2 border-[#ffffff4c] rounded-[30px] p-4'>
                    <div className='flex flex-row justify-between border-b-[1px] border-[#ffffff4c] pb-2'>
                      <div className='flex flex-col'>
                        <span className='text-[#c9c9c9] text-[20px]'>Level</span>
                        <span className='text-gradient text-[25px] font-bold text-left'>1</span>
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-[#c9c9c9] text-[20px]'>Commission</span>
                        <span className='text-gradient text-[25px] font-bold text-right'>70%</span>
                      </div>
                    </div>
                    <div className='flex flex-col items-start px-2'>
                      <span className='text-gradient xl:text-[100px] md:text-[95px] text-[50px] font-bold text-left'>
                        ₹100
                      </span>
                      <p className='text-[#c9c9c9] text-left md:text-[18px] text-[15px]'>With Cobalt, managing your business. <span className='text-[#fff]'>Say no to spreadsheets.</span></p>
                    </div>
                  </div>
                  <div className='walletBox border-[1px] border-[#ffffff4c] xl:w-1/2 md:w-1/2 rounded-[30px] p-4'>
                    <div className='flex flex-row justify-between border-b-[1px] border-[#ffffff4c] pb-2'>
                      <div className='flex flex-col'>
                        <span className='text-[#c9c9c9] text-[20px]'>Level</span>
                        <span className='text-gradient text-[25px] font-bold text-left'>2</span>
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-[#c9c9c9] text-[20px]'>Commission</span>
                        <span className='text-gradient text-[25px] font-bold text-right'>40%</span>
                      </div>
                    </div>
                    <div className='flex flex-col items-start px-2'>
                      <span className='text-gradient xl:text-[100px] md:text-[95px] text-[50px] font-bold text-left'>
                        ₹100
                      </span>
                      <p className='text-[#c9c9c9] text-left md:text-[18px] text-[15px]'>With Cobalt, managing your business. <span className='text-[#fff]'>Say no to spreadsheets.</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full justify-center md:w-[40%] cursor-pointer md:flex hidden" >
              <WalletChart activeButton={activeButtonFirstSection}/>
            </div>
            {isBankListingPopupOpen && <BankListingPopup onClose={toggleBankListingPopup}/>}
          </div>
            </div>
            <WalletTable />
          </div>
      </div>
  )
}

export default WalletPage;