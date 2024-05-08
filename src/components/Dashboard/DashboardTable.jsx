import React, { useState } from 'react';
import { leftArrow, rightArrow } from '../../assets';
import { customers_listing } from '../../constants/data';

const DashboardTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;
  const totalData = customers_listing.length; // Use the length of customers_data array for total data count

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

  // Function to replace the first six digits of the mobile number with "*"
  const hideFirstSixDigits = (mobileNumber) => {
    return mobileNumber.replace(/^(\d{6})/, '******');
  };

  return (
    <div className="relative">
      {/* Heading */}
      <div className="flex justify-between mt-10">
        <h2 className="md:text-left text-center md:text-[22px] text-[30px] xl:text-[40px] font-semibold w-full">Customer Listing</h2>
      </div>

      {/* Table */}
      <div className="mt-4 relative">
      <div className="mt-4 relative overflow-x-auto rounded-[30px] border-[#ffffff3e] border">
          <table className='md:w-full w-[150%]'>
            <thead className='text-center bg-[#29303F] sticky top-0'>
              <tr className=''>
                <th className='text-center text-[15px]'>Date</th>
                <th className='text-center text-[15px]'>Mobile Number</th>
                <th className='text-center text-[15px]'>Subscription</th>
                <th className='text-center text-[15px]'>Expertise</th>
                <th className='text-center text-[15px]'>Amount</th>
              </tr>
            </thead>
            <tbody>
              {customers_listing.slice(startIndex, endIndex).map((customer, index) => (
                <tr key={index}>
                  <td className='text-center'>{customer.date}</td>
                  <td className='text-center'>{hideFirstSixDigits(customer.mobileNumber)}</td>
                  <td className='text-center'>{customer.subscription}</td>
                  <td className='text-center'>{customer.expertise}</td>
                  <td className='text-center'>{customer.earnAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <span className="mx-2 text-[#fff]">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToPreviousPage}
          className="mx-2 rounded-md text-gray-800"
          disabled={currentPage === 1}
        >
          <img src={leftArrow} alt="Previous" className="w-4 transform rotate-180" />
        </button>
        <button
          onClick={goToNextPage}
          className="mx-2 rounded-md text-gray-800"
          disabled={currentPage === totalPages}
        >
          <img src={leftArrow} alt="Next" className="w-4" />
        </button>
      </div>
    </div>
  );
};

export default DashboardTable;
