// Import necessary libraries and assets
import React, { useState } from 'react';
import { filterBlack, filterBtn, leftArrow, rightArrow } from '../../assets';
import { leader_listing } from '../../constants/data';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Define the LeaderboardTable component
const LeaderboardTable = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;
  const totalData = 20;

  // Calculate total pages based on total data and data per page
  const totalPages = Math.ceil(totalData / dataPerPage);

  // Calculate start and end index for current page
  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = Math.min(startIndex + dataPerPage, totalData);

  // Function to handle page change
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to navigate to previous page
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Function to navigate to next page
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  // Function to replace starting 6 digits with "*"
  const maskMobileNumber = (number) => {
    return "******" + number.substring(6);
  };

  // Render the component
  return (
    <div className="relative">
      {/* Third Section */}
      <div className="flex justify-between mt-10">
        <h2 className="text-left md:text-[22px] text-[30px] xl:text-[40px] font-semibold w-full">Customer Listing</h2>
        <div className="flex items-center">
            <button
              className="bg-transparent border-[1px] flex justify-center items-center text-white px-5 py-3 rounded-lg transition duration-300 hover:bg-[#fff] hover:text-[#000]"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={toggleFilterModal}
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

      {showFilterModal && (
          <div className="absolute top-0 right-0 bg-white p-4 shadow-md rounded-lg">
            <div className="flex items-center">
              <div className="relative">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholderText="Select date start"
                />
              </div>
              <span className="mx-4 text-gray-500">to</span>
              <div className="relative">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholderText="Select date end"
                />
              </div>
            </div>
          </div>
        )}

      <div className="mt-4 relative">
      <div className="mt-4 relative overflow-x-auto rounded-[30px] border-[#ffffff3e] border">
          <table className='md:w-full w-[110%]'>
          <thead className='text-center bg-[#29303F] sticky top-0'>
            <tr className=''>
              <th className='text-center text-[15px]'>Date</th>
              <th className='text-center text-[15px]'>Mobile Number</th>
              <th className='text-center text-[15px]'>Name</th>
            </tr>
          </thead>
          <tbody>
  {/* Iterate through the leader_listing data and render table rows */}
  {leader_listing.slice(startIndex, endIndex).map((leader, index) => (
    <tr key={index}>
      <td className='text-center'>{leader.date}</td>
      {/* Render masked mobile number */}
      <td className='text-center'>{maskMobileNumber(leader.mobileNumber)}</td>
      
      <td className='text-center'>{leader.name}</td>
    </tr>
  ))}
</tbody>
        </table>
        
      </div>
      {/* Pagination controls */}
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
    </div>
  );
};

export default LeaderboardTable;
