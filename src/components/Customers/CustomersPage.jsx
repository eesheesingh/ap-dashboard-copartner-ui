import React, { useState } from 'react';
import { customers_data } from '../../constants/data';
import { filterBlack, filterBtn, rightArrow } from '../../assets';
import { Link } from 'react-router-dom';

const CustomersPage = () => {
  const [customers, setCustomers] = useState(customers_data);
  const [isHovered, setIsHovered] = useState(false);
  const [sortBy, setSortBy] = useState('none');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
   const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleSort = (type) => {
    if (type === sortBy) {
      setSortBy(type + '_reverse');
      setCustomers([...customers].reverse());
    } else {
      setSortBy(type);
      setCustomers([...customers].sort((a, b) => {
        let aValue = a[type];
        let bValue = b[type];
        // Parse string values to numbers if applicable
        if (typeof aValue === 'string') {
          aValue = parseFloat(aValue.replace(/[^\d.-]/g, ''));
        }
        if (typeof bValue === 'string') {
          bValue = parseFloat(bValue.replace(/[^\d.-]/g, ''));
        }
        if (type === 'price') {
          return aValue - bValue;
        }
        return 0;
      }));
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleFilterClick = () => {
    setShowFilterModal(!showFilterModal);
  };

  const handleClearFilter = () => {
    // Reset the filter settings
    setSortBy('none');
    setSelectedOption('');
    setShowFilterModal(false);
    // Reset customers data to original
    setCustomers(customers_data);
  };

  const handleApplyFilter = () => {
    setShowFilterModal(false);
    // Apply selected option
    handleSort(selectedOption);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = customers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(customers.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="relative xl:p-4 md:p-4 sm:ml-[8rem] text-white">
      <div className="p-4 border-gray-200 border-dashed rounded-lg dark:border-gray-700 md:mt-14 mt-[10rem]">
        <div className='flex justify-between items-center'>
          <span className='md:text-[30px] text-[20px] font-semibold'>Withdrawals Listing</span>
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
              <div className="flex justify-end mt-4">
                <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-2" onClick={handleClearFilter}>Clear</button>
                <button className="bg-[#fff] text-[#000] px-4 py-2 rounded-lg" onClick={handleApplyFilter}>Apply</button>
              </div>
            </div>
          </div>
        )}
        <div className="mt-4 overflow-x-auto rounded-[30px] border-[#ffffff3e] border">      
          <table className='md:w-full w-[200%]'>
            <thead>
              <tr className='uppercase'>
                <th className="text-center text-[15px]">Name</th>
                <th className="text-center text-[15px]">Mobile Number</th>
                <th className="text-center text-[15px]">Service</th>
                <th className="text-center text-[15px]">Course</th>
                <th className="text-center text-[15px]">Earn Amount</th> 
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id} className='text-center'>
                  <td className="border px-4 py-2">{customer.name}</td>
                  <td className="border px-4 py-2">{customer.mobileNumber}</td>
                  <td className="border px-4 py-2">{customer.service}</td>
                  <td className="border px-4 py-2">{customer.course}</td>
                  <Link to="/customers/singleCustomer">
                  <td className="border px-4 py-2 flex justify-center items-center">
                    {customer.price}
                    <img src={rightArrow} alt="" className='w-2 h-3 ml-3' />
                  </td>
                  </Link>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

          {/* Pagination */}
      {/* <div className="flex justify-end items-center gap-2 mt-4">
        <span className='mr-2 text-sm text-gray-500'>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="page-link border border-[#ffffff4a] p-2 rounded-[50%]">
          &lt;
        </button>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="page-link border border-[#ffffff4a] p-2 rounded-[50%]">
          &gt;
        </button>
      </div> */}
      </div>
    </div>
  );
};

export default CustomersPage;
