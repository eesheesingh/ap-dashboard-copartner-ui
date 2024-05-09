import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { dummyUser, logo, notification, searchIcon, dashboardIcon, filterBlack, leaderActive, loginBlack, loginBtn, marketingIcon, settingIcon, walletIcon, customerActive } from './assets';
import styles from './style';
import EarningPopup from './components/EarningPopup';

const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEarningPopupOpen, setIsEarningPopupOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  useEffect(() => {
    setActiveItem(location.pathname);


    // Close sidebar on route change if it's in mobile responsive mode
    if (isSidebarOpen && isMobileView) {
      setIsSidebarOpen(true);
    }

    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [location, isMobileView, isSidebarOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleEarningPopup = () => {
    setIsEarningPopupOpen(!isEarningPopupOpen);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  

  const handleMenuItemClick = () => {
    // Close sidebar if it's in mobile responsive mode
    if (isMobileView) {
      setIsSidebarOpen(false);
    }
    scrollToTop(0)
  };

  return (
    <div className={`bg-gradient overflow-hidden ${styles.boxWidth} ${styles.paddingX}`}>
      <nav className="fixed left-0 top-0 z-50 w-full bg-[#22262F]">
        <div className="px-3 py-4 lg:px-5 lg:pr-[4rem] lg:pl-3">
          <div className="flex items-center md:justify-between justify-between">
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
              <a href="/" className="md:flex hidden ms-2 md:me-24">
                <img src={logo} className="md:h-10 me-3" alt="FlowBite Logo" />
              </a>
            </div>
            <a href="/" className="flex ms-2 md:me-24 md:hidden">
                <img src={logo} className="h-10" alt="FlowBite Logo" />
              </a>
            <div className="flex items-center">
              <div className="items-center ms-3 gap-4 flex">
              {!isMobileView && (
                  <button className="bg-[#fff] text-[#000] md:text-[15px] px-8 py-3 rounded-md font-semibold" onClick={toggleEarningPopup}>
                    Earning Calculator
                  </button>
                )}
                {!isMobileView && (
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
                )}
               {!isMobileView && (
                  <div className="flex items-center justify-center w-[46px] h-[50px] border-2 border-[#282F3E] p-1 rounded-[10px]">
                    <img
                      src={notification}
                      alt="Notification Icon"
                      className="w-[21px] h-[21px] cursor-pointer"
                    />
                  </div>
                )}
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
          <div className='flex md:hidden gap-2 justify-between mt-2'>
            
                  <div className="relative w-full">
                    <img
                      src={searchIcon}
                      alt=""
                      className="cursor-pointer absolute top-1/2 left-4 transform -translate-y-1/2 w-[19px] h-[19px]"
                    />
                  <input
                    type="text"
                    placeholder="Search for something"
                    className="pl-[3rem] pr-4 bg-[#2E323C] w-full h-[55px] text-white rounded-[10px]"
                  />
                </div>
                <div className='flex items-center justify-center'>
            <div className="flex items-center justify-center w-[46px] h-[50px] border-2 border-[#282F3E] p-1 rounded-[10px]">
                    <img
                      src={notification}
                      alt="Notification Icon"
                      className="w-[21px] h-[21px] cursor-pointer"
                    />
                  </div>
                  </div>
          </div>
        </div>
      </nav>
      {isEarningPopupOpen && <EarningPopup onClose={toggleEarningPopup} />}
      <aside
        id="logo-sidebar"
        className={`fixed top-2 left-0 z-40 w-[12rem] h-screen md:pt-[90px] pt-[150px] transition-transform ${isSidebarOpen ? '' : '-translate-x-full'} bg-[#22262F] sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-[#22262F]">
          <button onClick={toggleSidebar} className="absolute top-2 right-2 text-white sm:hidden focus:outline-none">
            {/* You can use any icon for the toggle button */}
            {isSidebarOpen ? <>&#x2715;</> : <>&#9776;</>}
          </button>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                onClick={handleMenuItemClick}
                className={`flex items-center p-2 py-4 text-white text-[18px] rounded-lg tab-btn group ${activeItem === '/' ? 'btn-active' : ''}`}
              >
                <img src={dashboardIcon} alt="dashboard" className="w-4 mr-1" />
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/leaderBoard"
                onClick={handleMenuItemClick}
                className={`flex items-center p-2 py-4 text-white text-[18px] rounded-lg tab-btn group ${activeItem === '/leaderBoard' ? 'btn-active' : ''}`}
              >
                <img src={leaderActive} alt="leader" className="w-4 mr-1" />
                <span className="ml-3">Lead Board</span>
              </Link>
            </li>
            <li>
              <Link
                to="/customers"
                onClick={handleMenuItemClick}
                className={`flex items-center p-2 py-4 text-white text-[18px] rounded-lg tab-btn group ${activeItem === '/customers' ? 'btn-active' : ''}`}
              >
                <img src={customerActive} alt="customer" className="w-6 mr-1" />
                <span className="ml-3">Customer</span>
              </Link>
            </li>
            <li>
              <Link
                to="/marketing-planning"
                onClick={handleMenuItemClick}
                className={`flex items-center p-2 py-4 text-white text-[18px] rounded-lg tab-btn group ${activeItem === '/marketing-planning' ? 'btn-active' : ''}`}
              >
                <img src={marketingIcon} alt="wallet" className="w-6 mr-1" />
                <span className="ml-3">Marketing Partner</span>
              </Link>
            </li>
            <li>
              <Link
                to="/wallet"
                onClick={handleMenuItemClick}
                className={`flex items-center p-2 py-4 text-white text-[18px] rounded-lg tab-btn group ${activeItem === '/wallet' ? 'btn-active' : ''}`}
              >
                <img src={walletIcon} alt="wallet" className="w-6 mr-1" />
                <span className="ml-3">Wallet</span>
              </Link>
            </li>
            <li>
              <Link
                to="/setting"
                onClick={handleMenuItemClick}
                className={`flex items-center p-2 py-4 text-white text-[18px] rounded-lg tab-btn group ${activeItem === '/setting' ? 'btn-active' : ''}`}
              >
                <img src={settingIcon} alt="setting" className="w-6 mr-1" />
                <span className="ml-3">Setting</span>
              </Link>
            </li>
            <li>
            <div
                href="#"
                className="md:hidden items-center text-white rounded-lg group flex"
              >
            <button className="bg-[#fff] text-[#000] md:text-[15px] w-full px-5 py-2 rounded-lg font-semibold" onClick={toggleEarningPopup}>
                    Earning Calculator
                  </button>
                  </div>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center text-white rounded-lg group"
              >
                <button className="flex items-center justify-center w-full py-2 px-3 bg-[#fff] text-[#000] rounded-lg hover:bg-[#000] hover:text-[#fff] transition duration-300">
                {isHovered ? (
                  <>
                    Logout
                    <img src={loginBtn} alt="" className="inline-block w-4 mr-1" />
                  </>
                ) : (
                  <>
                    Logout
                    <img src={loginBlack} alt="" className="inline-block w-4 mr-1" />
                  </>
                )}
                </button>
              </a>
            </li>
            <div className='md:hidden'>
            {isEarningPopupOpen && <EarningPopup onClose={toggleEarningPopup} />}
            </div>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
