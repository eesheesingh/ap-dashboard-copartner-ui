import React, { useState } from 'react';
import { filterBlack, filterBtn, invoiceBtn, leftArrow, rightArrow } from '../../assets';
import { transaction_data, wallet_data } from '../../constants/data';
import RejectPopup from '../Popups/RejectPopup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export const WalletTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('transactions');
  const [isHovered, setIsHovered] = useState(false);
  const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
const [showFilterModal, setShowFilterModal] = useState(false);

  const [rejectPopupOpen, setRejectPopupOpen] = useState(false);

  const handleVerify = () => {
    // Implement PAN card verification logic here
    // Open the KYC verification popup
    setRejectPopupOpen(true);
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const itemsPerPage = 10; // Number of items to display per page
  const totalTransactions = activeTab === 'transactions' ? transaction_data.length : wallet_data.length; // Total number of transactions
  const totalPages = Math.ceil(totalTransactions / itemsPerPage);

  // Slice data for current page
  const paginatedData = activeTab === 'transactions'
    ? transaction_data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : wallet_data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Pagination handlers
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset page number when switching tabs
  };

  return (
    <div className="relative">
      {/* Tab Section */}
      <div className="flex justify-between mt-6 items-center">
        <h2 className="text-left md:text-[22px] text-[22px] xl:text-[40px] font-semibold">Transaction History</h2>
        <div className="flex items-center">
          {/* Filter button */}
          {/* Filter button */}
<button
  className="bg-transparent border-[1px] text-white px-5 py-3 rounded-lg transition duration-300 hover:bg-[#fff] hover:text-[#000]"
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

{/* Date range picker */}
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
        </div>
      </div>

      <div className="flex md:justify-start justify-center space-x-4 mt-4">
        <button
          className={` px-4 py-2 rounded-lg focus:outline-none ${
            activeTab === 'transactions' ? 'bg-white text-black' : 'bg-[transparent] border-solid border-[1px] text-white'
          }`}
          onClick={() => handleTabChange('transactions')}
        >
          Transactions
        </button>
        <button
          className={` px-4 py-2 rounded-lg focus:outline-none ${
            activeTab === 'withdrawals' ? 'bg-white text-black' : 'bg-[transparent] border-solid border-[1px] text-white'
          }`}
          onClick={() => handleTabChange('withdrawals')}
        >
          Withdrawals
        </button>
      </div>

      {/* Transaction Data */}
      {activeTab === 'transactions' && (
        <>
           <div className="mt-4 relative overflow-x-auto rounded-[30px] border-[#ffffff3e] border">
            <table className="md:w-full w-[250%] table-fixed">
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
                {paginatedData.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="text-center">{transaction.transactionId}</td>
                    <td className="text-center">{transaction.date}</td>
                    <td className="text-center">{transaction.bank}</td>
                    <td className="text-center">{transaction.accountNumber}</td>
                    <td className="text-center">{transaction.amount}</td>
                    <td className="text-center flex justify-center">
                      <img src={invoiceBtn} alt="" className="w-5" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalTransactions > itemsPerPage && (
            <div className="flex justify-end p-4 items-center">
              <div className="text-white mr-3">
                Page {currentPage} of {totalPages}
              </div>
              <button
                className="bg-transparent text-white px-1 py-3 hover:bg-[#fff4] rounded-[50px] transition duration-300 mb-1 p-2 transform hover:scale-110"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <img src={rightArrow} alt="Prev" className="inline-block w-[12px]" />
              </button>
              <button
                className="bg-transparent text-white px-1 py-3 hover:bg-[#fff4] rounded-[50px] transition duration-300 mb-1 p-2 transform hover:scale-110"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <img src={leftArrow} alt="Next" className="inline-block w-[12px]" />
              </button>
            </div>
          )}
        </>
      )}

      {/* Withdrawal Data */}
      {activeTab === 'withdrawals' && (
        <div className="mt-4">
          <div className="mt-4 relative overflow-x-auto rounded-[30px] border-[#ffffff3e] border">
            <table className="md:w-full w-[250%] table-fixed">
                <thead className="text-center bg-[#29303F] sticky top-0">
                <tr>
                  <th className="text-center text-[15px]">WALLET ID</th>
                  <th className="text-center text-[15px]">Date</th>
                  <th className="text-center text-[15px]">Bank</th>
                  <th className="text-center text-[15px]">Account Number</th>
                  <th className="text-center text-[15px]">Amount</th>
                  <th className="text-center text-[15px]">Status</th> {/* Combined Status & Actions column */}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="text-center">{transaction.transactionId}</td>
                    <td className="text-center">{transaction.date}</td>
                    <td className="text-center">{transaction.bank}</td>
                    <td className="text-center">{transaction.accountNumber}</td>
                    <td className="text-center">{transaction.amount}</td>
                    <td className="text-center text-[#f5b53f] font-semibold">
                      {transaction.status === '' ? ( // Show Reject button only when status is empty
                        <button
                          className="text-[#fff] bg-red-500 px-3 py-1 rounded-lg focus:outline-none"
                          onClick={handleVerify}
                        >
                          Reject
                        </button>
                      ) : (
                        transaction.status // Show status if not empty
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalTransactions > itemsPerPage && (
            <div className="flex justify-end p-4 items-center">
              <div className="text-white mr-3">
                Page {currentPage} of {totalPages}
              </div>
              <button
                className="bg-transparent text-white px-1 py-3 hover:bg-[#fff4] rounded-[50px] transition duration-300 mb-1 p-2 transform hover:scale-110"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <img src={rightArrow} alt="Prev" className="inline-block w-[12px]" />
              </button>
              <button
                className="bg-transparent text-white px-1 py-3 hover:bg-[#fff4] rounded-[50px] transition duration-300 mb-1 p-2 transform hover:scale-110"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <img src={leftArrow} alt="Next" className="inline-block w-[12px]" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Reject Popup */}
      {rejectPopupOpen && (
        <RejectPopup onClose={() => setRejectPopupOpen(false)} />
      )}
    </div>
  );
};

export default WalletTable;
