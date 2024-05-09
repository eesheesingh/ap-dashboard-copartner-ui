import React, { useState } from 'react';
import { comingSoon, banner, banner2, banner4, banner5, banner6, download } from '../../assets';

const Marketing = () => {
  const [activeTab, setActiveTab] = useState('images');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const imageList = [
    { src: banner2, description: 'Description for Banner 1' },
    { src: banner2, description: 'Description for Banner 2' },
    { src: banner2, description: 'Description for Banner 4' },
    { src: banner2, description: 'Description for Banner 5' },
    { src: banner2, description: 'Description for Banner 6' }
  ]; 

  const videoList = [
    { src: banner, description: 'Description for Banner 1' },
    { src: banner, description: 'Description for Banner 2' },
    { src: banner, description: 'Description for Banner 4' },
    { src: banner, description: 'Description for Banner 5' },
    { src: banner, description: 'Description for Banner 6' }
  ];

  return (
    <div className="xl:p-4 md:p-4 sm:ml-[8rem] text-white">
      <div className="p-4 md:px-5 px-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 md:mt-14 mt-[8rem]">
        <h2 className="md:text-left text-center md:text-[22px] text-[30px] xl:text-[40px] font-semibold w-full">Marketing Partner</h2>

        {/* Tab buttons */}
        <div className="flex mt-6 flex-wrap md:justify-start justify-center">
          <button
            onClick={() => handleTabChange('images')}
            className={`py-2 px-4 rounded-tl-md rounded-bl-md transition duration-300 ${
              activeTab === 'images' ? 'bg-gray-200 text-gray-800' : 'bg-[transparent] border-solid border-[1px] text-white' 
            } hover:bg-gray-300 hover:text-gray-900 mb-2 md:mb-0`}
          >
            Banners
          </button>
          <button
            onClick={() => handleTabChange('videos')}
            className={`py-2 px-4 rounded-tr-md rounded-br-md transition duration-300 ${
              activeTab === 'videos' ? 'bg-gray-200 text-gray-800' : 'bg-[transparent] border-solid border-[1px] text-white'
            } hover:bg-gray-300 hover:text-gray-900 mb-2 md:mb-0`}
          >
            Videos
          </button>
        </div>

        {/* Tab content */}
        <div className="mt-8">
          {activeTab === 'images' && (
            <div className={`tab-content ${activeTab === 'images' ? 'active' : 'inactive'}`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {videoList.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image.src}
                      alt={`banner ${index + 1}`}
                      className="w-full h-auto object-cover rounded"
                    />
                    <div className="bottom-0 top-0 flex flex-row justify-between text-white text-sm p-2 rounded-b bg-gray-900 bg-opacity-50">
                      {image.description}
                      <img src={download} className='w-5' alt="" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'videos' && (
            <div className={`tab-content ${activeTab === 'videos' ? 'active' : 'inactive'}`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {imageList.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image.src}
                      alt={`banner ${index + 1}`}
                      className="w-full h-auto object-cover rounded"
                    />
                    <div className="bottom-0 top-0 flex flex-row justify-between text-white text-sm p-2 rounded-b bg-gray-900 bg-opacity-50">
                      {image.description}
                      <img src={download} className='w-5' alt="" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className='mt-10'>
          <h2 className="md:text-left text-center md:text-[22px] text-[25px] xl:text-[40px] font-semibold w-full">Marketing Partner Listing</h2>
          <div className="py-3">
            <img src={comingSoon} alt="Coming Soon" className="w-full mb-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
