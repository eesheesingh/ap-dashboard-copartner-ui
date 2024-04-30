import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { filterBlack, filterBtn, rightArrow } from '../assets';

const SingleCustomer = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate(); 

  const handleHoverFocused = () =>{
    setIsFocused(true);
  }

  const handleHoverLeave = () =>{
    setIsFocused(false);
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    navigate(-1); // Go back to the last page
  };

  return (
    <div className="xl:p-4 md:h-[100vh] xl:h-[100vh] md:p-4 sm:ml-[8rem] text-white">
      <div className="p-4 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-3">
        <div className="relative">
          {/* Third Section */}
          <div className="flex justify-between mt-10 items-center">
            <div className='flex flex-row items-center justify-center ml-3'>
              <img
                src={rightArrow}
                alt=""
                className={`w-9 h-10 mr-2 border-[1px] border-[#ffffff35] rounded-lg p-3 ${isFocused ? 'scale-110' : ''} transition duration-300 cursor-pointer`}
                onMouseEnter={handleHoverFocused}
                onMouseLeave={handleHoverLeave}
                onClick={handleClick} // Add onClick handler to go back
              />
              <h2 className="text-left md:text-[22px] xl:text-[40px] font-semibold">Channel Listing</h2>
            </div>
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

          <div className="overflow-x-auto mt-4 scroll-container shadow-md sm:rounded-[30px] rounded-lg border border-[#ffffff3f]">
            <table>
              <thead className="text-center bg-[#29303F] sticky top-0">
                <tr>
                  <th className="text-center text-[15px]">DATE</th>
                  <th className="text-center text-[15px]">SUBSCRIPTION</th>
                  <th className="text-center text-[15px]">EXPERTISE</th>
                  <th className="text-center text-[15px]">AMOUNT</th>
                  <th className="text-center text-[15px]">EARN AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(10).keys()].map((index) => (
                  <tr key={index}>
                    <td className="text-center">26/01/2024</td>
                    <td className="text-center">Service</td>
                    <td className="text-center">Rohit Sharma</td>
                    <td className="text-center">₹4,800</td>
                    <td className="text-center">₹5,999</td>
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

export default SingleCustomer;
