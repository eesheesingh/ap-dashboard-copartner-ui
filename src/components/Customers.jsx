import React, { useState } from 'react';
import { filterBlack, filterBtn, leftArrow, rightArrow } from '../assets';
import { Link } from 'react-router-dom';

const Customers = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="xl:p-4 md:h-[100vh] xl:h-[100vh] md:p-4 sm:ml-[8rem] text-white">
      <div className="p-4 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-3">
        <div className="relative">
          {/* Third Section */}
          <div className="flex justify-between mt-12 items-center">
            
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

          <div className="overflow-x-auto mt-4 scroll-container shadow-md sm:rounded-[30px] rounded-lg border border-[#ffffff3f]">
            <table>
              <thead className="text-center bg-[#29303F] sticky top-0">
                <tr>
                  <th className="text-center text-[15px]">NAME</th>
                  <th className="text-center text-[15px]">MOBILE NUMBER</th>
                  <th className="text-center text-[15px]">SERVICE</th>
                  <th className="text-center text-[15px]">COURSE</th>
                  <th className="text-center text-[15px]">WEBINAR</th>
                  <th className="text-center text-[15px]">PRIVATE CALL</th>
                  <th className="text-center text-[15px]">EARN AMOUNT</th>
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
                      <Link key={index} to="/customers/singleCustomer">
                        <button className="border-transparent bg-transparent">
                          ₹5,999
                          <img src={leftArrow} alt="" className="inline-block md:w-[7px] ml-10" />
                        </button>
                        </Link>
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

export default Customers;
