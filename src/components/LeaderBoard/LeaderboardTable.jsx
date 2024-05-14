import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { leader_listing } from '../../constants/data';
import { filterBlack, filterBtn, leftArrow, rightArrow } from '../../assets';

const LeaderboardTable = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isFilterClicked, setIsFilterClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleFilterButtonClick = () => {
    setIsFilterClicked(!isFilterClicked);
    setCurrentPage(1); // Reset current page when filter button is clicked
  };

  const handleFilterChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setCurrentPage(1); // Reset current page when filter criteria change
  };

  const handleClearDates = () => {
    setStartDate(null);
    setEndDate(null);
    setCurrentPage(1); // Reset current page when dates are cleared
  };

  const filteredData = leader_listing.filter((item) => {
    const itemDate = new Date(item.date.split('/').reverse().join('-'));
    if (startDate && endDate) {
      return itemDate >= startDate && itemDate <= endDate;
    } else if (startDate) {
      return itemDate >= startDate;
    } else if (endDate) {
      return itemDate <= endDate;
    }
    return true; // If neither start nor end date is specified, show all data
  });

  // Pagination
  const dataPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / dataPerPage);
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="table-responsive mt-5 relative">
      <div className='flex justify-between items-center'>
        <span className='md:text-[30px] text-[20px] font-semibold'>Customers Listing</span>
        <button
          className="bg-transparent border-[1px] text-white px-5 py-3 rounded-lg transition duration-300 hover:bg-[#fff] hover:text-[#000]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleFilterButtonClick}
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
      {isFilterClicked && (
        <div className="absolute right-0 mt-5 mr-4 z-10">
          <div className="bg-[#000] rounded-[30px] p-4 flex flex-col gap-3">          
            <DatePicker
              selected={startDate}
              onChange={(date) => handleFilterChange({ startDate: date, endDate })}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="From Date"
              className="bg-transparent text-white border-b border-white" // Apply custom styles here
              renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
                <div className="flex justify-center">
                  <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>&lt;</button>
                  <select value={date.getFullYear()} onChange={({ target: { value } }) => changeYear(parseInt(value))}>
                    {Array.from({ length: 80 }, (_, i) => new Date().getFullYear() - 79 + i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  <select value={date.getMonth()} onChange={({ target: { value } }) => changeMonth(parseInt(value))}>
                    {Array.from({ length: 12 }, (_, i) => i).map(month => (
                      <option key={month} value={month}>{new Date(0, month).toLocaleString(undefined, { month: 'long' })}</option>
                    ))}
                  </select>
                  <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>&gt;</button>
                </div>
              )}
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => handleFilterChange({ startDate, endDate: date })}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="To Date"
              className="bg-transparent text-white border-b border-white" // Apply custom styles here
              renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
                <div className="flex justify-center">
                  <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>&lt;</button>
                  <select value={date.getFullYear()} onChange={({ target: { value } }) => changeYear(parseInt(value))}>
                    {Array.from({ length: 80 }, (_, i) => new Date().getFullYear() - 79 + i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  <select value={date.getMonth()} onChange={({ target: { value } }) => changeMonth(parseInt(value))}>
                    {Array.from({ length: 12 }, (_, i) => i).map(month => (
                      <option key={month} value={month}>{new Date(0, month).toLocaleString(undefined, { month: 'long' })}</option>
                    ))}
                  </select>
                  <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>&gt;</button>
                </div>
              )}
            />
            <div className='flex items-center justify-center'>
              <button onClick={handleClearDates} className="bg-[#fff] text-[#000] px-4 py-1 rounded-md focus:outline-none">Clear Dates</button>
            </div>
          </div>
        </div>
      )}
      <div className="mt-4 overflow-x-auto rounded-[30px] border-[#ffffff3e] border">      
        <table className='md:w-full w-[105%]'>
          <thead>
            <tr className='uppercase'>
              <th>Date</th>
              <th>Mobile Number</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index} className='text-center'>
                <td>{item.date}</td>
                <td>{item.mobileNumber.replace(/^\d{6}/, '******')}</td>
                <td>{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-end mt-4">
          <div className="pagination flex items-center">
            <span className="mr-2 text-sm text-gray-500">{`Page ${currentPage} of ${totalPages}`}</span>
            <span className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button onClick={() => paginate(currentPage - 1)} className="page-link border border-[#ffffff4a] p-2 rounded-[50%]">
                <img src={leftArrow} alt="Left Arrow" className="w-4 h-4 " />
              </button>
            </span>
            <span className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button onClick={() => paginate(currentPage + 1)} className="page-link border border-[#ffffff4a] p-2 rounded-[50%]">
                <img src={rightArrow} alt="Right Arrow" className="w-4 h-4" />
              </button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardTable;
