import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { dummyUser, logo, notification, searchIcon, dashboardIcon, filterBlack, leaderActive, TelgramMsg, loginBlack, loginBtn, marketingIcon, settingIcon, walletIcon, customerActive, userImg, close, link, BotImg } from './assets';
import styles from './style';
import EarningPopup from './components/EarningPopup';
import Notification from './components/notificationPage/Notification';

const Sidebar = () => {
  const [profile, setProfile] = useState({ imageURL: '' });
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEarningPopupOpen, setIsEarningPopupOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [affiliateData, setAffiliateData] = useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasMessageData, setHasMessageData] = useState(false);

  useEffect(() => {
    const fetchAffiliateData = async () => {
      try {
        const storedStackIdData = localStorage.getItem("stackIdData");
        if (storedStackIdData) {
          const data = JSON.parse(storedStackIdData);
          setAffiliateData(data);
          setProfile({
            imageURL: data.affiliatePartnerImagePath || ''
          });

          // Fetch message data for the affiliate
          const response = await fetch(`https://copartners.in:5134/api/TelegramMessage/${data.id}?userType=AP&page=1&pageSize=10`);
          const result = await response.json();
          if (result.data && result.data.length > 0) {
            setHasMessageData(true);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAffiliateData();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setActiveItem(location.pathname);

    const handleResize = () => {
      const isMobile = window.innerWidth < 1000;
      setIsMobileView(isMobile);
      if (isMobile) {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [location]);

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

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMenuItemClick = () => {
    if (isMobileView) {
      setIsSidebarOpen(false);
    }
    scrollToTop();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const isSpecialUser = affiliateData && affiliateData.id === "9ddc2f38-71e7-4100-4402-08dc94f829a3";

  return (
    <div className={`bg-gradient overflow-hidden ${styles.boxWidth} ${styles.paddingX}`}>
      <motion.nav
        className="fixed left-0 top-0 z-50 w-full bg-[#22262F]"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
        key={location.pathname}
      >
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
                <img src={logo} className="md:h-10 me-3" alt="Copartner Logo" />
              </a>
              <a href="/" className="flex md:me-24 md:hidden text-nowrap flex-nowrap">
                <img src={logo} className="h-10" alt="Copartner Logo" />
              </a>
            </div>
            <div className="flex items-center">
              <div className="items-center ms-3 gap-4 flex">

                <div className='flex'>

                  {!isSpecialUser && (
                    <>
                  <Link to="/setting">
                    <button type="button" className="flex text-sm bg-[#000] rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                      <span className="sr-only">Open user menu</span>
                      <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                        <img src={profile.imageURL || userImg} alt="User" className="object-cover w-full h-full" />
                      </div>
                    </button>
                  </Link>
                  </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
      <aside
        id="logo-sidebar"
        className={`fixed top-2 left-0 z-40 w-[12rem] h-screen md:pt-[90px] pt-[100px] transition-transform ${isSidebarOpen ? '' : '-translate-x-full'} bg-[#22262F] sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-[#22262F]">
          <button onClick={toggleSidebar} className="absolute top-2 right-2 text-white sm:hidden focus:outline-none">
            {isSidebarOpen ? <>&#x2715;</> : <>&#9776;</>}
          </button>
          <ul className="space-y-2 font-medium">
            {!isSpecialUser && (
              <>
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
                  <Link
                    to="/bot-listing"
                    onClick={handleMenuItemClick}
                    className={`flex items-center p-2 py-4 text-white text-[18px] rounded-lg tab-btn group ${activeItem === '/bot-listing' ? 'btn-active' : ''}`}
                  >
                    <img src={BotImg} alt="setting" className="w-6 mr-1" />
                    <span className="ml-3">Bot List</span>
                  </Link>
                </li>
                {hasMessageData && (
                  <li>
                    <Link
                      to="/send-prompt-messages"
                      onClick={handleMenuItemClick}
                      className={`flex items-center p-2 py-4 text-white text-[18px] rounded-lg tab-btn group ${activeItem === '/send-prompt-messages' ? 'btn-active' : ''}`}
                    >
                      <img src={TelgramMsg} alt="sendPromptedMessages" className="w-6 mr-1" />
                      <span className="ml-3">Message</span>
                    </Link>
                  </li>
                 )} 
              </>
            )}
            <li>
              <Link
                to="/generate-your-links"
                onClick={handleMenuItemClick}
                className={`flex items-center p-2 py-4 text-white text-[18px] rounded-lg tab-btn group ${activeItem === '/generate-your-links' ? 'btn-active' : ''}`}
              >
                <img src={link} alt="generateLink" className="w-6 mr-1" />
                <span className="ml-3">Links</span>
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center text-white rounded-lg group w-full"
              >
                <span className="flex items-center justify-center w-full py-2 px-3 bg-[#fff] text-[#000] rounded-lg hover:bg-[#000] hover:text-[#fff] transition duration-300">
                  {isHovered ? (
                    <>
                      Logout
                    </>
                  ) : (
                    <>
                      Logout
                    </>
                  )}
                </span>
              </button>
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
