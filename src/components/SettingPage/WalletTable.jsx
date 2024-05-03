import React, { useState } from 'react'
import { filterBlack, filterBtn, invoiceBtn } from '../../assets';

const WalletTable = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
  return (
    <div className="relative">
          {/* Third Section */}
          <div className="flex justify-between mt-10 items-center">
            
            <h2 className="text-left md:text-[22px] xl:text-[40px] font-semibold">Transaction History</h2>
            
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
                  <th className="text-center text-[15px]">TRANSACTION ID</th>
                  <th className="text-center text-[15px]">Date</th>
                  <th className="text-center text-[15px]">Bank</th>
                  <th className="text-center text-[15px]">Account Number</th>
                  <th className="text-center text-[15px]">Amount</th>
                  <th className="text-center text-[15px]">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(10).keys()].map((index) => (
                  
                    <tr>
                      <td className="text-center">#9876546321</td>
                      <td className="text-center">26/01/2024</td>
                      <td className="text-center">HDFC Bank</td>
                      <td className="text-center">Ankurkumar@Phonepay</td>
                      <td className="text-center">₹1,999 </td>
                      <td className="text-center flex justify-center">
                        <img src={invoiceBtn} alt="" className='w-5' />
                      </td>
                    </tr>
                  
                ))}
              </tbody>
            </table>
          </div>
        </div>
  )
}

export default WalletTable