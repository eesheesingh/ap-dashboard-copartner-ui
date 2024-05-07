import React, { useState } from 'react';
import { dummyUser, logo, notification, searchIcon } from './assets';
import styles from './style';
import EarningPopup from './components/EarningPopup';

const Navbar = () => {
  const [isEarningPopupOpen, setIsEarningPopupOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleEarningPopup = () => {
    setIsEarningPopupOpen(!isEarningPopupOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`bg-gradient overflow-hidden ${styles.boxWidth} ${styles.paddingX}`}>
      <nav className="fixed left-0 top-0 z-50 w-full bg-[#22262F]">
        <div className="px-3 py-4 lg:px-5 lg:pr-[4rem] lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={toggleSidebar}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="https://flowbite.com" className="flex ms-2 md:me-24">
                <img src={logo} className="md:h-10 me-3" alt="FlowBite Logo" />
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3 gap-4">
                <button className="bg-[#fff] text-[#000] md:text-[15px] px-8 py-3 rounded-md font-semibold" onClick={toggleEarningPopup}>
                  Earning Calculator
                </button>
                {/* Search field */}
                <div className="relative">
                  <img
                    src={searchIcon}
                    alt=""
                    className="cursor-pointer absolute top-1/2 left-4 transform -translate-y-1/2 w-[19px] h-[19px]"
                  />
                  <input
                    type="text"
                    placeholder="Search for something"
                    className="pl-10 pr-4 bg-[#2E323C] w-[252px] h-[55px] text-white rounded-[10px]"
                  />
                </div>
                {/* Notification Icon */}
                <div className="flex items-center justify-center w-[46px] h-[50px] border-2 border-[#282F3E] p-1 rounded-[10px]">
                  <img
                    src={notification}
                    alt="Notification Icon"
                    className="w-[21px] h-[21px] cursor-pointer"
                  />
                </div>
                <div>
                  <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                    <span className="sr-only">Open user menu</span>
                    <img
                      src={dummyUser}
                      alt="LoginUser"
                      className="w-[50px] h-[50px] rounded-full"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {isEarningPopupOpen && <EarningPopup onClose={toggleEarningPopup} />}
      <div className={`fixed top-2 left-0 z-40 w-[12rem] h-screen pt-20 transition-transform ${isSidebarOpen ? '' : '-translate-x-full'} bg-[#22262F] sm:translate-x-0`} aria-label="Sidebar">
        {/* Sidebar content */}
      </div>
    </div>
  );
};

export default Navbar;
