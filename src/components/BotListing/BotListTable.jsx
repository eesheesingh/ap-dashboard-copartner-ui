import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';
import SendMessage from './SendMessage';

const BotListTable = ({ tableData, token, affiliatePartnerId }) => {
  const [selectedRows, setSelectedRows] = useState([]); // Store selected user IDs
  const [currentPage, setCurrentPage] = useState(1);
  const [isSendMessagePopupOpen, setIsSendMessagePopupOpen] = useState(false);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  const handleSelectAll = () => {
    if (selectedRows.length === tableData.length) {
      setSelectedRows([]); // Deselect all if all are currently selected
    } else {
      setSelectedRows(tableData.map((user) => user.UserID)); // Select all users across all pages
    }
  };

  const handleSelectRow = (userId) => {
    if (selectedRows.includes(userId)) {
      setSelectedRows(selectedRows.filter((id) => id !== userId));
    } else {
      setSelectedRows([...selectedRows, userId]);
    }
  };

  const isSelected = (userId) => selectedRows.includes(userId);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleOpenSendMessagePopup = () => {
    setIsSendMessagePopupOpen(true);
  };

  const handleCloseSendMessagePopup = () => {
    setIsSendMessagePopupOpen(false);
  };

  const handleSendMessage = (message) => {
    console.log('Message to send:', message);
    console.log('Selected users:', selectedRows);
    // Send the message via the API
    fetch('https://apbot.copartner.in/api/sendmessagetousers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        affiliate_partner_id: affiliatePartnerId,
        message: message,
        selected_users: selectedRows,
        token: token,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Message sent successfully:', data);
        setIsSendMessagePopupOpen(false);
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  };

  // Slice data to get the current page data
  const currentPageData = tableData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-1 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      <div className='flex flex-row justify-between items-center my-3'>
        <h2 className="text-left md:text-[27px] text-[30px] xl:text-[40px] font-semibold">
          User Listing
        </h2>
        <div className="md:flex md:w-auto md:justify-end items-center xl:items-center justify-start mt-4 md:mt-0">
          <button
            onClick={handleOpenSendMessagePopup}
            className="bg-transparent border-[1px] border-white hover:bg-white hover:text-black transition duration-300 py-2 px-6 rounded-lg"
          >
            Message
          </button>
        </div>
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
                    checked={selectedRows.length === tableData.length}
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
                  key={user.UserID}
                  className={`${
                    isSelected(user.UserID) ? "font-bold hover:bg-gray-700" : ""
                  }  transition-all duration-300`}
                >
                  <td className="px-6 py-4 whitespace-nowrap md:text-[18px] text-center relative transition-all duration-300">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 rounded-full"
                      checked={isSelected(user.UserID)}
                      onChange={() => handleSelectRow(user.UserID)}
                    />
                    {isSelected(user.UserID) }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap md:text-[18px] text-center transition-all duration-300">
                    {new Date(user.usercreationdatetime).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap md:text-[18px] text-center transition-all duration-300">
                    {user.mobileNumber || " - "}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap md:text-[18px] text-center transition-all duration-300">
                    {user.otp_verified ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap md:text-[18px] text-center transition-all duration-300">
                    {user.landing_page_url || " - "}
                  </td>
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

      {isSendMessagePopupOpen && (
        <SendMessage
          onClose={handleCloseSendMessagePopup}
          onSend={handleSendMessage}
          token={token}
          affiliatePartnerId={affiliatePartnerId}
          selectedUsers={selectedRows}
        />
      )}
    </div>
  );
};

export default BotListTable;
