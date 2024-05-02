import React from 'react';

const DashboardTable = () => {
  return (
    <div className="relative">
      {/* Third Section */}
      <div className="flex justify-between mt-10">
        <h2 className="text-left md:text-[22px] xl:text-[40px] font-semibold">Customer Listing</h2>
      </div>

      <div className="overflow-x-auto mt-4 scroll-container shadow-md sm:rounded-[30px] rounded-lg border border-[#ffffff3f] max-h-[400px] custom-scrollbar">
        <table className=''>
          <thead className='text-center bg-[#29303F] sticky top-0'>
            <tr className=''>
              <th className='text-center text-[15px]'>Date</th>
              <th className='text-center text-[15px]'>Mobile Number</th>
              <th className='text-center text-[15px]'>Subscription</th>
              <th className='text-center text-[15px]'>Expertise </th>
              <th className='text-center text-[15px]'>Amount</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10).keys()].map((index) => (
              <tr key={index}>
                <td className='text-center'>26/01/2024</td>
                <td className='text-center'>9876545321</td>
                <td className='text-center'>Service</td>
                <td className='text-center'>Rohit Sharma</td>
                <td className='text-center'>₹5,999</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardTable;
