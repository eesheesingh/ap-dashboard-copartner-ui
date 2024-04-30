import React, { useState } from 'react';
import { customBtn, filterBlack, filterBtn, graph3, graph4, leftArrow } from '../assets';
import { Link } from 'react-router-dom';

const Wallet = () => {
  const [activeButtonFirstSection, setActiveButtonFirstSection] = useState('weekly');
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="xl:p-4 md:p-4 sm:ml-[8rem] text-white">
      <div className="p-4 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className="text-white text-center">
          {/* First Section */}
          <div className="flex justify-between mt-2">
            <h2 className="text-left md:text-[22px] xl:text-[40px] font-semibold">Earning Analysis</h2>
            <div className="flex items-center space-x-4 md:mr-1 xl:mr-[60px]">
              <button
                className={`button ${activeButtonFirstSection === 'weekly' ? 'bg-[#fff] text-[#000]' : 'bg-transparent'} border-[1px] hover:bg-[#fff] hover:text-[#000] transition duration-300 py-2 px-6 rounded`}
                onClick={() => setActiveButtonFirstSection('weekly')}
              >
                Weekly
              </button>
              <button
                className={`button ${activeButtonFirstSection === 'monthly' ? 'bg-[#fff] text-[#000]' : 'bg-transparent'} border-[1px] hover:bg-[#fff] hover:text-[#000] transition duration-300 py-2 px-6 rounded`}
                onClick={() => setActiveButtonFirstSection('monthly')}
              >
                Monthly
              </button>
              <button
                className={`button ${activeButtonFirstSection === 'custom' ? 'bg-[#fff] text-[#000]' : 'bg-transparent'} border-[1px] hover:bg-[#fff] hover:text-[#000] transition duration-300 py-2 px-6 rounded flex items-center`}
                onClick={() => setActiveButtonFirstSection('custom')}
              >
                Custom
                <img src={customBtn} alt="" className="inline-block w-5 ml-1" />
              </button>
            </div>
          </div>
          <div className="flex mt-8 gap-3 justify-center">
            
            <div className="w-full xl:w-[59%] md:w-2/3 justify-center items-center container-bg rounded-[30px]">
                <div className='flex flex-row xl:p-7 md:p-4 justify-between'>
              <h3 className="text-center font-semibold md:text-[30px] xl:text-[50px]">Total Earning</h3>
              <div className="flex flex-row items-center justify-between mt-2 gap-5 ">
                <span className='text-[20px]'>
                Withdrawl Balance: 200
                </span>
                <div className='p-2 items-center'>
                <button className="bg-[#fff] hover:bg-[#000] text-[#000] hover:text-[#fff] transition duration-300 py-2 px-6 rounded">
                Withdrawn
              </button>
              </div>
              </div>
              </div>
              <div>
                <div className='flex flex-row justify-center gap-3 p-3'>
                    <div className='border-[1px] border-[#ffffff4c] rounded-[30px] p-4'>
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
                        <span className='text-gradient xl:text-[100px] md:text-[95px] font-bold text-left'>
                                ₹100
                            </span>
                            <p className='text-[#c9c9c9] text-left text-[18px]'>With Cobalt, managing your business. <span className='text-[#fff]'>Say no to spreadsheets.</span></p>
                        </div>
                    </div>

                    <div className='border-[1px] border-[#ffffff4c] w-[500px] rounded-[30px] p-4'>
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
                        <span className='text-gradient xl:text-[100px] md:text-[95px] font-bold text-left'>
                                ₹100
                            </span>
                            <p className='text-[#c9c9c9] text-left text-[18px]'>With Cobalt, managing your business. <span className='text-[#fff]'>Say no to spreadsheets.</span></p>
                        </div>
                    </div>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center md:w-[40%]">
              <img src={activeButtonFirstSection === "monthly" ? graph3 : graph4} alt="Graph" className="w-full rounded-lg" />
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Third Section */}
          <div className="flex justify-between mt-10 items-center">
            
            <h2 className="text-left md:text-[22px] xl:text-[40px] font-semibold">Channel Listing</h2>
            
            <div className="flex items-center">
              {/* Filter button */}
              <button
                className="bg-transparent border-[1px] text-white px-5 py-3 rounded-lg transition duration-300 hover:bg-[#fff] hover:text-[#000]"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {isHovered ? (
                  <>
                    <img src={filterBlack} alt="" className="inline-block w-[12px] mr-[8px]" />
                    Filter
                  </>
                ) : (
                  <>
                    <img src={filterBtn} alt="" className="inline-block w-4 mr-1" />
                    Filter
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto mt-4 scroll-container shadow-md sm:rounded-[30px] rounded-lg border border-[#ffffff3f] max-h-[400px]">
            <table>
              <thead className="text-center bg-[#29303F] sticky top-0">
                <tr>
                  <th className="text-center text-[15px]">TRANSAACTION ID</th>
                  <th className="text-center text-[15px]">Date</th>
                  <th className="text-center text-[15px]">Bank</th>
                  <th className="text-center text-[15px]">Account Number</th>
                  <th className="text-center text-[15px]">Amount</th>
                  <th className="text-center text-[15px]">Invoice CALL</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(10).keys()].map((index) => (
                  
                    <tr>
                      <td className="text-center">Eeshee</td>
                      <td className="text-center">9876545321</td>
                      <td className="text-center">3</td>
                      <td className="text-center">2</td>
                      <td className="text-center">4</td>
                      <td className="text-center">2</td>
                      <td className="text-center">
                      
                      </td>
                    </tr>
                  
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Wallet;
