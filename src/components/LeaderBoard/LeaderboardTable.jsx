import React, { useState } from 'react';
import { leftArrow, rightArrow } from '../../assets';

const LeaderboardTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;
  const totalData = 20;

  const totalPages = Math.ceil(totalData / dataPerPage);

  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = Math.min(startIndex + dataPerPage, totalData);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="relative">
      {/* Third Section */}
      <div className="flex justify-between mt-10">
        <h2 className="text-left md:text-[22px] xl:text-[40px] font-semibold">Customer Listing</h2>
      </div>

      <div className=" mt-4 scroll-container overflow-x-auto shadow-md rounded-[20px] border border-[#ffffff3f] custom-scrollbar">
        <table className=''>
          <thead className='text-center bg-[#29303F] sticky top-0'>
            <tr className=''>
              <th className='text-center text-[15px]'>Date</th>
              <th className='text-center text-[15px]'>Mobile Number</th>
              <th className='text-center text-[15px]'>Subscription</th>
              <th className='text-center text-[15px]'>Expertise </th>
              <th className='text-center text-[15px]'>Amount</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(totalData).keys()].slice(startIndex, endIndex).map((index) => (
              <tr key={index}>
                <td className='text-center'>26/01/2024</td>
                <td className='text-center'>9876545321</td>
                <td className='text-center'>Service</td>
                <td className='text-center'>Rohit Sharma</td>
                <td className='text-center'>₹5,999</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
      <div className="flex justify-end mt-4">
        <span className="mx-2 text-[#fff]">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToPreviousPage}
            className="mx-2 rounded-md text-gray-800"
            disabled={currentPage === 1}
          >
            <img src={rightArrow} alt="Previous" />
          </button>
         
          <button
            onClick={goToNextPage}
            className="mx-2 rounded-md  text-gray-800"
            disabled={currentPage === totalPages}
          >
            <img src={leftArrow} className='w-4' alt="Next" />
          </button>
        </div>
    </div>
  );
};

export default LeaderboardTable;
