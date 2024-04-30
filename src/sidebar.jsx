import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './navbar';
import { customerActive, dashboardIcon, leaderActive, settingIcon, walletIcon } from './assets';
import styles from './style';

const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    // Extract the pathname from the location object and set the activeItem state
    setActiveItem(location.pathname);
  }, [location]);

  return (
    <div className={`bg-gradient overflow-hidden ${styles.boxWidth} ${styles.paddingX}`}>
      <Navbar />
      <aside
        id="logo-sidebar"
        className="fixed top-2 left-0 z-40 w-[12rem] h-screen pt-20 transition-transform -translate-x-full bg-[#22262F] sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-[#22262F]">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                className={`flex items-center p-2 py-4 text-white text-[18px] rounded-lg tab-btn group ${activeItem === '/' ? 'btn-active' : ''}`}
              >
                <img src={dashboardIcon} alt="dashboard" className="w-6" />
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/leaderBoard"
                className={`flex items-center p-2 py-4 text-white text-[18px] rounded-lg tab-btn group ${activeItem === '/leaderBoard' ? 'btn-active' : ''}`}
              >
                <img src={leaderActive} alt="leader" className="w-6" />
                <span className="ml-3">Lead Board</span>
              </Link>
            </li>
            <li>
              <a
                to="/webinar"
                className="flex items-center p-2 py-4 text-white text-[18px] rounded-lg tab-btn group"
              >
                <img src={customerActive} alt="customer" className="w-6" />
                <span className="ml-3">Customer</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 py-4 text-white text-[18px] rounded-lg tab-btn group"
              >
                <img src={walletIcon} alt="wallet" className="w-6" />
                <span className="ml-3">Wallet</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 py-4 text-white text-[18px] rounded-lg tab-btn group"
              >
                <img src={settingIcon} alt="setting" className="w-6" />
                <span className="ml-3">Setting</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 py-4 text-white rounded-lg tab-btn group"
              >
                <button className="flex items-center bg-[#fff] p-2 rounded-lg">
                  <span className="mr-3">Dashboard</span>
                  <img src={dashboardIcon} alt="dashboard" className="w-6" />
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
