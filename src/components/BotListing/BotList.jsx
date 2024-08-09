import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import AddBot from './AddBot';
import IconBox from './IconBox';
import BotListTable from './BotListTable';
import LinkListTable from './LinkListTable';
import { botData, LinkData } from './index'; // Update this path based on the actual location of your index.js

const BotList = () => {
  const [activeBox, setActiveBox] = useState(null);
  const [activeBot, setActiveBot] = useState('Bot1');
  const [activeDataType, setActiveDataType] = useState('Bot'); // new state to handle data type
  const [isAddBotModalOpen, setIsAddBotModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleBoxClick = (box) => {
    setActiveBox(box);
  };

  const handleBotClick = (bot) => {
    setActiveBot(bot);
    setActiveDataType('Bot');
    setActiveBox(null); // Reset the active box when switching bots
  };

  const handleLinkClick = (bot) => {
    setActiveBot(bot);
    setActiveDataType('Link');
    setActiveBox(null); // Reset the active box when switching links
  };

  const handleAddBotClick = () => {
    setIsAddBotModalOpen(true);
  };

  const closeAddBotModal = () => {
    setIsAddBotModalOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectAll = () => {
    console.log("Select All clicked");
    setIsDropdownOpen(false);
  };

  const currentData = activeDataType === 'Bot' ? botData[activeBot] : LinkData[activeBot];

  return (
    <div className="xl:px-4 md:px-6 sm:ml-[10rem] text-white">
      <div className="p-2 py-5 border-gray-200 border-dashed rounded-lg dark:border-gray-700 md:mt-[4rem] mt-[30px]">
        <div className="text-white text-center md:text-left">
          <div className="flex md:flex-row flex-row justify-between items-center md:mt-1 mt-6 md:flex-nowrap flex-wrap">
            <h2 className="md:text-left text-center md:text-[32px] text-[28px] xl:text-[40px] font-bold md:w-full">
              Bot Listing
            </h2>
            <div className='md:flex md:w-auto md:justify-end md:items-center xl:items-center justify-start mt-4 md:mt-0'>
              <button 
                onClick={handleAddBotClick}
                className='bg-transparent border-[1px] border-white hover:bg-white hover:text-black transition duration-300 py-2 px-6 rounded-lg'
              >
                Add
              </button>
            </div>
          </div>
          <div className='flex justify-center md:justify-start mt-4 space-x-4'>
            <button 
              className={`text-lg font-medium rounded-lg py-2 px-6 ${activeBot === 'Bot1' && activeDataType === 'Bot' ? 'bg-white text-black' : 'bg-transparent text-white'} border-[1px] border-white hover:text-black hover:bg-white transition-all`}
              onClick={() => handleBotClick('Bot1')}
            >
              Bot 1
            </button>
            <button 
              className={`text-lg font-medium rounded-lg py-2 px-6 ${activeBot === 'Bot2' && activeDataType === 'Bot' ? 'bg-white text-black' : 'bg-transparent text-white'} border-[1px] border-white hover:text-black hover:bg-white transition-all`}
              onClick={() => handleBotClick('Bot2')}
            >
              Bot 2
            </button>
          </div>
        </div>
      </div>

      <div className="p-2 md:py-5 border-gray-200 border-dashed rounded-lg dark:border-gray-700 container-bg">
        <div className="text-white text-center md:text-left relative">
          <div className="flex md:flex-row flex-row justify-between md:mt-1 mt-1 md:flex-nowrap flex-wrap">
            <h2 className="md:text-left text-center md:text-[32px] text-[28px] xl:text-[30px] font-semibold md:w-full">
              Link Listing
            </h2>
          </div>
          <div className='flex justify-center md:justify-start mt-4 space-x-4'>
            <button 
              className={`text-lg font-medium rounded-lg py-2 px-6 ${activeBot === 'Bot1' && activeDataType === 'Link' ? 'bg-white text-black' : 'bg-transparent text-white'} border-[1px] border-white hover:text-black hover:bg-white transition-all`}
              onClick={() => handleLinkClick('Bot1')}
            >
              Link 1
            </button>
            <button 
              className={`text-lg font-medium rounded-lg py-2 px-6 ${activeBot === 'Bot2' && activeDataType === 'Link' ? 'bg-white text-black' : 'bg-transparent text-white'} border-[1px] border-white hover:text-black hover:bg-white transition-all`}
              onClick={() => handleLinkClick('Bot2')}
            >
              Link 2
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row mt-10 space-y-4 md:space-y-0 md:space-x-4">
          {currentData.iconBoxes.map((box, index) => (
            <IconBox 
              key={index}
              title={box.title}
              count={box.count}
              icon={box.icon}
              isActive={activeBox === box.title.toLowerCase().replace(' ', '')}
              onClick={() => handleBoxClick(box.title.toLowerCase().replace(' ', ''))}
            />
          ))}
        </div>
      </div>

      {activeDataType === 'Bot' ? (
        <BotListTable tableData={currentData.tableData} />
      ) : (
        <LinkListTable tableData={currentData.tableData} />
      )}

      {isAddBotModalOpen && <AddBot onClose={closeAddBotModal} />}
    </div>
  );
};

export default BotList;
