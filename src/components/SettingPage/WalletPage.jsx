import React, { useEffect, useState } from 'react';
import { customBtn } from '../../assets';
import WalletTable from './WalletTable';
import WalletChart from './WalletChart';
import WalletChartMob from './WalletChartMob';
import BankListingPopup from '../Popups/BankListingPopup';

const WalletPage = () => {
  const [activeButtonFirstSection, setActiveButtonFirstSection] = useState('weekly');
  const [isBankListingPopupOpen, setIsBankListingPopupOpen] = useState(false);
  const [withdrawalBalance, setWithdrawalBalance] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);

  const fetchWalletBalance = async () => {
    try {
      const storedStackIdData = localStorage.getItem("stackIdData");
      if (storedStackIdData) {
        const data = JSON.parse(storedStackIdData);
        const stackId = data.id; // Assuming the stackId is stored in data.id
        const response = await fetch(`https://copartners.in:5135/api/Wallet/GetWalletWithdrawalBalance/${stackId}?userType=AP`);
        const result = await response.json();
        if (result.isSuccess) {
          setWalletBalance(result.data.walletBalance);
          setWithdrawalBalance(result.data.withdrawalBalance);
        } else {
          console.error('Error fetching wallet balance:', result.displayMessage);
        }
      }
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
    }
  };

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  const toggleBankListingPopup = () => {
    setIsBankListingPopupOpen(!isBankListingPopupOpen);
  };

  const formatBalance = (balance) => {
    return balance % 1 === 0 ? balance.toFixed(0) : balance.toFixed(2);
  };

  return (
    <div className="xl:pt-3 md:p-4 sm:ml-[10rem] text-white">
      <div className="md:p-4 p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 md:mt-14 mt-[8rem]">
        <div className="text-white text-center">
          <div className="flex md:flex-row flex-col justify-between mt-2">
            <h2 className="md:text-left text-left md:text-[22px] text-[30px] xl:text-[40px] font-semibold w-full">Earning Analysis</h2>
            <div className="space-x-4 md:mr-1 xl:mr-[20px] flex w-full md:justify-end justify-start">
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
            <div className="w-full xl:[59%] md:w-2/3 container-bg rounded-[30px]">
              <div className='flex md:flex-row flex-col xl:p-7 md:p-4 justify-between items-center'>
                <h3 className="text-left font-semibold md:text-[30px] text-[28px] xl:text-[50px]">Total Earning</h3>
              </div>
              <div>
                <div className='flex md:flex-row flex-col justify-start gap-3 p-3'>
                  <div className='walletBox border-[1px] xl:w-1/2 md:w-1/2 border-[#ffffff4c] rounded-[30px] p-4'>
                    <div className='flex flex-row justify-between border-b-[1px] border-[#ffffff4c] pb-2'>
                      <span className='md:text-[20px] text-[16px]'>
                        Total Earned
                      </span>
                    </div>
                    <div className='flex flex-col items-start px-2'>
                      <span className='text-gradient xl:text-[100px] md:text-[50px] text-[50px] font-bold text-left'>
                        {walletBalance !== null ? `₹${formatBalance(walletBalance)}` : 'Loading...'}
                      </span>
                      <p className='text-[#c9c9c9] text-left md:text-[18px] text-[15px]'>Congratulations on your Earnings</p>
                    </div>
                  </div>
                  <div className='walletBox border-[1px] border-[#ffffff4c] xl:w-1/2 md:w-1/2 rounded-[30px] p-4'>
                    <div className='flex flex-row justify-between border-b-[1px] border-[#ffffff4c] pb-2'>
                      <div className="flex w-full items-center justify-between gap-5 ">
                        <span className='md:text-[20px] text-[16px]'>
                          Balance:
                        </span>
                        <button className="bg-[#fff] hover:bg-[#000] text-[#000] hover:text-[#fff] transition duration-300 py-1 px-3 rounded" onClick={() => setIsBankListingPopupOpen(true)}>
                          Withdrawal
                        </button>
                      </div>
                    </div>
                    <div className='flex flex-col items-start px-2'>
                      <span className='text-gradient xl:text-[100px] md:text-[50px] text-[50px] font-bold text-left'>
                        {withdrawalBalance !== null ? `₹${formatBalance(withdrawalBalance)}` : 'Loading...'}
                      </span>
                      <p className='text-[#c9c9c9] text-left md:text-[18px] text-[15px]'>Current Balance available in your Wallet</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full justify-center md:w-[40%] cursor-pointer md:flex hidden">
              <WalletChart activeButton={activeButtonFirstSection} />
            </div>
            {isBankListingPopupOpen && <BankListingPopup onClose={toggleBankListingPopup} />}
          </div>
        </div>
        <div className='mt-5'>
          <WalletTable />
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
