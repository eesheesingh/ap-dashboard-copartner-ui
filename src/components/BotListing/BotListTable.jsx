import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const BotListTable = ({ tableData }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectAll = () => {
    if (selectedRows.length === tableData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(tableData.map((_, index) => index));
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
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 md:text-[18px] font-medium uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={selectedRows.length === tableData.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-6 py-3 md:text-[18px] font-medium uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 md:text-[18px] font-medium uppercase tracking-wider">Mobile Number</th>
              <th className="px-6 py-3 md:text-[18px] font-medium uppercase tracking-wider">Verified</th>
              <th className="px-6 py-3 md:text-[18px] font-medium uppercase tracking-wider">Joined</th>
            </tr>
          </thead>
          <tbody className="bg-transparent divide-y divide-gray-700">
            {tableData.map((user, index) => (
              <tr
                key={index}
                className={`${
                  isSelected(index) ? "font-bold hover:bg-gray-700" : ""
                }  transition-all duration-300`}
              >
                <td className="px-6 py-4 whitespace-nowrap md:text-[18px] text-center relative transition-all duration-300">
                  <input
                    type="checkbox"
                    checked={isSelected(index)}
                    onChange={() => handleSelectRow(index)}
                  />
                  {isSelected(index) && <FaCheckCircle className="absolute top-1/2 left-4 transform -translate-y-1/2 text-blue-500" />}
                </td>
                <td className="px-6 py-4 whitespace-nowrap md:text-[18px] text-center transition-all duration-300">{user.date}</td>
                <td className="px-6 py-4 whitespace-nowrap md:text-[18px] text-center transition-all duration-300">{user.mobile}</td>
                <td className="px-6 py-4 whitespace-nowrap md:text-[18px] text-center transition-all duration-300">{user.verified}</td>
                <td className="px-6 py-4 whitespace-nowrap md:text-[18px] text-center transition-all duration-300">{user.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BotListTable;
