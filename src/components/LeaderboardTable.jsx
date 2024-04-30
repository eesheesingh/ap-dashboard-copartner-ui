import React, { useRef } from 'react';
import {  filterBtn } from '../assets';

const LeaderboardTable = () => {
  const tableRef = useRef(null);

  const handleScroll = (e) => {
    const { scrollTop, scrollLeft } = e.target;
    tableRef.current.scrollLeft = scrollLeft;
  };

  return (
    <div>
      {/* Third Section */}
      <div className="flex justify-between mt-10 items-center">
        <h2 className="text-left md:text-[22px] xl:text-[40px] font-semibold">Listing</h2>
        <div className="flex items-center">
          {/* Filter button */}
          
          <button className="bg-transparent border-[1px] hover:bg-[#fff] hover:text-[#000] text-white px-5 py-3 rounded-lg transition duration-300">
          <img src={filterBtn} alt="" className="inline-block w-5 mr-1" />
            Filter
            </button>
        </div>
      </div>

      <div
        className="relative scroll-container mt-4 overflow-x-auto shadow-md sm:rounded-[30px] rounded-lg border border-[#ffffff3f] max-h-[400px]"
        onScroll={handleScroll}
      >
        <table ref={tableRef} className="">
          <thead className='text-center bg-[#29303F] sticky top-0'>
            <tr className='text-[#c9c9c9] '>
              <th className='text-center'>Date</th>
              <th className='text-center'>Mobile Number</th>
              <th className='text-center'>Name</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10).keys()].map((index) => (
              <tr key={index}>
                <td className='text-center'>26/01/2024</td>
                <td className='text-center'>9876545321</td>
                <td className='text-center'>Rohit Sharma</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaderboardTable;
