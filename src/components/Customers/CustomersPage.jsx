import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { filterBlack, filterBtn, leftArrow, rightArrow, searchIcon } from '../../assets';
import { useNavigate } from 'react-router-dom';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [sortBy, setSortBy] = useState('none');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const storedStackIdData = localStorage.getItem("stackIdData");
      if (storedStackIdData) {
        const data = JSON.parse(storedStackIdData);
        const affiliateId = data.id; // Use the ID from stackIdData
        const response = await fetch(`https://copartners.in:5133/api/APDashboard/GetDashboardAPListingData/${affiliateId}?page=1&pageSize=100000`);
        const result = await response.json();

        const filteredCustomers = result.data.filter(customer => customer.amount !== 0 && customer.amount !== null);

        // Sort data by date and time in descending order
        filteredCustomers.sort((a, b) => new Date(b.subscribeDate) - new Date(a.subscribeDate));

        setCustomers(filteredCustomers);
        setFilteredData(filteredCustomers);
        setTotalPages(Math.ceil(filteredCustomers.length / itemsPerPage));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Nothing to show in the data');
      navigate(-1); // Navigate back to the previous page
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
  }, [filteredData]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleSort = (type) => {
    let sortedCustomers = [...filteredData];
    if (type === 'price') {
      sortedCustomers.sort((a, b) => a.amount - b.amount);
    } else if (type === 'price_reverse') {
      sortedCustomers.sort((a, b) => b.amount - a.amount);
    }
    setFilteredData(sortedCustomers);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleFilterClick = () => {
    setShowFilterModal(!showFilterModal);
  };

  const handleClearFilter = () => {
    setSortBy('none');
    setSelectedOption('');
    setStartDate(null);
    setEndDate(null);
    setSearchQuery('');
    setShowFilterModal(false);
    setFilteredData(customers);
  };

  const handleApplyFilter = () => {
    setShowFilterModal(false);
    handleSort(selectedOption);
  };

  const handleFilterChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setCurrentPage(1);
  };

  const handleClearDates = () => {
    setStartDate(null);
    setEndDate(null);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const getSubscriptionName = (subscriptionId) => {
    switch (subscriptionId) {
      case '1':
        return "Commodity";
      case '2':
        return "Equity";
      case '3':
        return "Options";
      default:
        return "N/A";
    }
  };

  const filteredDataByDateAndSearch = customers.filter((item) => {
    if (!item.subscribeDate) return false;
    const itemDate = new Date(item.subscribeDate.split('T')[0]);
    const matchesSearchQuery = (item.raName && item.raName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.amount && item.amount.toString().includes(searchQuery));

    if (startDate && endDate) {
      return itemDate >= startDate && itemDate <= endDate && matchesSearchQuery;
    } else if (startDate) {
      return itemDate >= startDate && matchesSearchQuery;
    } else if (endDate) {
      return itemDate <= endDate && matchesSearchQuery;
    }
    return matchesSearchQuery;
  });

  useEffect(() => {
    setFilteredData(filteredDataByDateAndSearch);
  }, [startDate, endDate, searchQuery, customers]);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strTime = `${hours}:${minutes} ${ampm}`;
    return `${day}-${month}-${year} ${strTime}`;
  };

  return (
    <div className="relative xl:p-4 md:p-4 sm:ml-[8rem] text-white">
      <div className="p-1 md:p-4 border-gray-200 border-dashed rounded-lg dark:border-gray-700 md:mt-14 mt-[100px]">
        <div className='flex justify-between items-center'>
          <span className='md:text-[30px] text-[20px] font-semibold'>Paid Users Listing</span>
          <div className='flex gap-5'>
            <div className="relative md:flex hidden">
              <img
                src={searchIcon}
                alt=""
                className="cursor-pointer absolute top-1/2 left-4 transform -translate-y-1/2 w-[19px] h-[19px]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for name or price"
                className="pl-[3rem] pr-4 bg-[#2E323C] w-full h-[55px] text-white rounded-[10px]"
              />
            </div>
            <button
              className="bg-transparent border-[1px] text-white px-5 py-3 rounded-lg transition duration-300 hover:bg-[#fff] hover:text-[#000]"
              onClick={handleFilterClick}
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
        <div className="relative md:hidden mt-2">
          <img
            src={searchIcon}
            alt=""
            className="cursor-pointer absolute top-1/2 left-4 transform -translate-y-1/2 w-[19px] h-[19px]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for name or price"
            className="pl-[3rem] pr-4 bg-[#2E323C] w-full h-[55px] text-white rounded-[10px]"
          />
        </div>
        {showFilterModal && (
          <div className="absolute right-0 mt-5 mr-4 z-10">
            <div className="bg-gradient rounded-[30px] p-8">
              <h2 className="text-lg font-semibold mb-4">Filter Options</h2>
              <div className="flex flex-col">
                <label className="inline-flex items-center mt-2">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-blue-600"
                    value="price"
                    checked={selectedOption === 'price'}
                    onChange={() => handleOptionChange('price')}
                  />
                  <span className="ml-2">Low To High</span>
                </label>
                <label className="inline-flex items-center mt-2">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-blue-600"
                    value="price_reverse"
                    checked={selectedOption === 'price_reverse'}
                    onChange={() => handleOptionChange('price_reverse')}
                  />
                  <span className="ml-2">High To Low</span>
                </label>
              </div>
              <div className="flex flex-col mt-4">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => handleFilterChange({ startDate: date, endDate })}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="From Date"
                  className="bg-transparent text-white border-b border-white"
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
                  className="bg-transparent text-white border-b border-white"
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
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                  onClick={handleClearFilter}
                >
                  Clear
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  onClick={handleApplyFilter}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="mt-4 relative overflow-x-auto rounded-[30px] border-[#ffffff3e] border">
          <table className="md:w-full w-[170%]">
            <thead className='text-center bg-[#29303F] sticky top-0'>
              <tr className='uppercase'>
                <th className='text-center text-[15px]'>Date & Time</th>
                <th className='text-center text-[15px]'>Mobile Number</th>
                <th className='text-center text-[15px]'>Subscription</th>
                <th className='text-center text-[15px]'>Experts</th>
                <th className='text-center text-[15px]'>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((customer) => (
                <tr key={customer.id} className="">
                  <td className="px-6 py-4 text-center">{formatDateTime(customer.subscribeDate)}</td>
                  <td className='text-center'>{customer.userMobileNo}</td>
                  <td className='text-center'>{getSubscriptionName(customer.subscription)}</td>
                  <td className='text-center'>{customer.raName || 'N/A'}</td>
                  <td className='text-center'>₹{customer.amount !== null ? customer.amount : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end gap-3 items-center mt-4">
          <span className="text-white">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => paginate(currentPage - 1)}
            className={`px-4 py-3 rounded-[50%] border-[1px] border-[#fff3] ${currentPage === 1 ? 'bg-transparent cursor-not-allowed' : 'bg-gray-500 '}`}
            disabled={currentPage === 1}
          >
            <img src={leftArrow} alt="Previous" className="w-4 h-4 inline-block" />
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            className={`px-4 py-3 rounded-[50%] border-[1px] border-[#fff3] ${currentPage === totalPages ? 'bg-transparent cursor-not-allowed' : 'bg-gray-500 '}`}
            disabled={currentPage === totalPages}
          >
            <img src={rightArrow} alt="Next" className="w-4 h-4 inline-block" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
