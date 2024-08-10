import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';

const BotListTable = ({ tableData }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  const handleSelectAll = () => {
    const pageData = tableData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    if (selectedRows.length === pageData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(pageData.map((_, index) => (currentPage - 1) * itemsPerPage + index));
    }
  };

  const handleSelectRow = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const isSelected = (index) => selectedRows.includes(index);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setSelectedRows([]);
    }
  };

  // Slice data to get the current page data
  const currentPageData = tableData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-1 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      <div className='flex justify-between items-center my-3'>
        <h2 className="text-left md:text-[27px] text-[30px] xl:text-[40px] font-semibold">
          User Listing
        </h2>
        <button className='text-lg font-medium rounded-lg py-2 px-2 bg-transparent text-white border-[1px] hover:bg-white transition-all'>
          Message
        </button>
      </div>
      <div className="overflow-x-auto rounded-[20px] border border-gray-700 max-h-96 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-700 relative">
          <thead className="bg-gray-700 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 md:text-[18px] font-medium uppercase tracking-wider">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600 rounded-full"
                    checked={selectedRows.length === currentPageData.length}
                    onChange={handleSelectAll}
                  />
                </div>
              </th>
              <th className="px-6 py-3 md:text-[18px] font-medium uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 md:text-[18px] font-medium uppercase tracking-wider">Mobile Number</th>
              <th className="px-6 py-3 md:text-[18px] font-medium uppercase tracking-wider">Verified</th>
              <th className="px-6 py-3 md:text-[18px] font-medium uppercase tracking-wider">URL</th>
            </tr>
          </thead>
          <tbody className="bg-transparent divide-y divide-gray-700">
            {currentPageData.length > 0 ? (
              currentPageData.map((user, index) => (
                <tr
                  key={index}
                  className={`${
                    isSelected((currentPage - 1) * itemsPerPage + index) ? "font-bold hover:bg-gray-700" : ""
                  }  transition-all duration-300`}
                >
                  <td className="px-6 py-4 whitespace-nowrap md:text-[18px] text-center relative transition-all duration-300">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 rounded-full"
                      checked={isSelected((currentPage - 1) * itemsPerPage + index)}
                      onChange={() => handleSelectRow((currentPage - 1) * itemsPerPage + index)}
                    />
                    {isSelected((currentPage - 1) * itemsPerPage + index) && <FaCheckCircle className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#fff]" />}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap md:text-[18px] text-center transition-all duration-300">{new Date(user.usercreationdatetime).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap md:text-[18px] text-center transition-all duration-300">{user.mobileNumber || " - "}</td>
                  <td className="px-6 py-4 whitespace-nowrap md:text-[18px] text-center transition-all duration-300">{user.otp_verified ? "Yes" : "No"}</td>
                  <td className="px-6 py-4 whitespace-nowrap md:text-[18px] text-center transition-all duration-300">{user.landing_page_url || " - "}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 whitespace-nowrap md:text-[18px] text-center transition-all duration-300">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <div className='flex'>
          <button
            className="px-3 py-1 mr-2 bg-gray-700 text-white rounded-md flex items-center"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <MdOutlineNavigateBefore />
          </button>
          <button
            className="px-3 py-1 bg-gray-700 text-white rounded-md flex items-center"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <MdOutlineNavigateNext />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BotListTable;
