import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { customerActive, dashboardIcon, filterBlack, leaderActive, loginBlack, loginBtn, marketingIcon, settingIcon, walletIcon } from './assets';
import styles from './style';
import Navbar from './navbar';

const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`bg-gradient overflow-hidden ${styles.boxWidth} ${styles.paddingX}`}>
      <Navbar />
      <aside
        id="logo-sidebar"
        className={`fixed top-2 left-0 md:z-40 w-[12rem] h-screen pt-20 transition-transform ${isSidebarOpen ? '' : '-translate-x-full'} bg-[#22262F] sm:translate-x-0`}
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
                className={`flex items-center p-2 py-4 text-white text-[18px] rounded-lg tab-btn group ${activeItem === '/' ? 'btn-active' : ''}`}
              >
                <img src={dashboardIcon} alt="dashboard" className="w-4 mr-1" />
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/leaderBoard"
                className={`flex items-center p-2 py-4 text-white text-[18px] rounded-lg tab-btn group ${activeItem === '/leaderBoard' ? 'btn-active' : ''}`}
              >
                <img src={leaderActive} alt="leader" className="w-4 mr-1" />
                <span className="ml-3">Lead Board</span>
              </Link>
            </li>
            <li>
              <Link
                to="/customers"
                className={`flex items-center p-2 py-4 text-white text-[18px] rounded-lg tab-btn group ${activeItem === '/customers' ? 'btn-active' : ''}`}
              >
                <img src={customerActive} alt="customer" className="w-6 mr-1" />
                <span className="ml-3">Customer</span>
              </Link>
            </li>
            <li>
              <Link
                to="/marketing-planning"
                className={`flex items-center p-2 py-4 text-white text-[18px] rounded-lg tab-btn group ${activeItem === '/marketing-planning' ? 'btn-active' : ''}`}
              >
                <img src={marketingIcon} alt="wallet" className="w-6 mr-1" />
                <span className="ml-3">Marketing Partner</span>
              </Link>
            </li>
            <li>
              <Link
                to="/wallet"
                className={`flex items-center p-2 py-4 text-white text-[18px] rounded-lg tab-btn group ${activeItem === '/wallet' ? 'btn-active' : ''}`}
              >
                <img src={walletIcon} alt="wallet" className="w-6 mr-1" />
                <span className="ml-3">Wallet</span>
              </Link>
            </li>
            <li>
              <Link
                to="/setting"
                className={`flex items-center p-2 py-4 text-white text-[18px] rounded-lg tab-btn group ${activeItem === '/setting' ? 'btn-active' : ''}`}
              >
                <img src={settingIcon} alt="setting" className="w-6 mr-1" />
                <span className="ml-3">Setting</span>
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 py-4 text-white rounded-lg group"
              >
                <button className="flex items-center  p-3 bg-[#fff] text-[#000] rounded-lg hover:bg-[#000] hover:text-[#fff] transition duration-300">
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
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
