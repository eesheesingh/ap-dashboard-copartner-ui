import React, { useState, useEffect } from 'react';
import './carousel.css';
import { IoCloseCircle, IoPhonePortraitOutline } from 'react-icons/io5';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { FaUsers } from 'react-icons/fa';
import { GoDependabot } from 'react-icons/go';
import { MdClose } from 'react-icons/md';
import BotListTable from './BotListTable';
import IconBox from './IconBox';
import AddBot from './AddBot';

const BotList = () => {
  const [bots, setBots] = useState([]);
  const [users, setUsers] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [activeBotIndex, setActiveBotIndex] = useState(null);
  const [activeSubtab, setActiveSubtab] = useState(null);
  const [token, setToken] = useState('');
  const [interactedCount, setInteractedCount] = useState(0);
  const [phoneProvidedCount, setPhoneProvidedCount] = useState(0);
  const [otpVerifiedCount, setOtpVerifiedCount] = useState(0);
  const [selectedLandingPageUrl, setSelectedLandingPageUrl] = useState(null);
  const [isAddBotPopupOpen, setIsAddBotPopupOpen] = useState(false);
  const [activeBotName, setActiveBotName] = useState(''); // State to store active bot name
  const [activeBotStatus, setActiveBotStatus] = useState('active'); // State to store active bot status
  const [affiliatePartnerId, setAffiliatePartnerId] = useState(null);
  const [activeFilter, setActiveFilter] = useState(''); // State to store active filter

  useEffect(() => {
    const stackIdData = localStorage.getItem('stackIdData');
    const affiliateId = stackIdData ? JSON.parse(stackIdData).id : null;
    setAffiliatePartnerId(affiliateId);

    if (affiliateId) {
      fetch(`https://apbot.copartner.in/api/botsbyaffiliatepartnerid?affiliate_partner_id=${affiliateId}`)
        .then(response => response.json())
        .then(data => setBots(data.bots))
        .catch(error => console.error('Error fetching bots:', error));
      
      // Fetch user data when no bot is selected
      if (activeBotIndex === null) {
        fetch(`https://apbot.copartner.in/api/get_userbyaffiliatepartenerid?affiliatepartnerid=${affiliateId}`)
          .then(response => response.json())
          .then(data => {
            setUsers(data.users);
            setTableData(data.users);

            const interacted = data.users.filter(user => user.just_interacted).length;
            const phoneProvided = data.users.filter(user => user.phone_provided).length;
            const otpVerified = data.users.filter(user => user.otp_verified).length;

            setInteractedCount(interacted);
            setPhoneProvidedCount(phoneProvided);
            setOtpVerifiedCount(otpVerified);
          })
          .catch(error => console.error('Error fetching users:', error));
      }
    }
  }, [activeBotIndex]); // Re-fetch user data when activeBotIndex changes

  const handleBotClick = (bot, index) => {
    if (activeBotIndex === index) {
      handleDeselect(); // Deselect if the same bot is clicked
    } else {
      setActiveBotIndex(index);
      setActiveSubtab(null);
      setToken(bot.token); 
      setSelectedLandingPageUrl(null);

      const botName = bot.bot_name ? bot.bot_name : `Bot ${index + 1}` || 'Select Bot';
      setActiveBotName(botName); // Set the active bot name
      setActiveBotStatus(bot.status); // Set the active bot status

      fetch(`https://apbot.copartner.in/api/usersbybottoken?token=${bot.token}`)
        .then(response => response.json())
        .then(data => {
          setUsers(data.users);
          setTableData(data.users);

          const interacted = data.users.filter(user => user.just_interacted).length;
          const phoneProvided = data.users.filter(user => user.phone_provided).length;
          const otpVerified = data.users.filter(user => user.otp_verified).length;

          setInteractedCount(interacted);
          setPhoneProvidedCount(phoneProvided);
          setOtpVerifiedCount(otpVerified);
        })
        .catch(error => console.error('Error fetching users:', error));
    }
  };

  const handleStatusToggle = () => {
    const newStatus = activeBotStatus === 'active' ? 'inactive' : 'active'; // Toggle between 'active' and 'inactive'
    setActiveBotStatus(newStatus);

    const payload = {
      status: newStatus,
      token: token,
    };

    console.log('Updating status:', payload);

    fetch('https://apbot.copartner.in/api/updatestatus', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Status updated successfully:', data);
      })
      .catch(error => {
        console.error('Error updating status:', error);
      });
  };

  const handleLinkClick = (landingPageUrl) => {
    if (activeSubtab === landingPageUrl) {
      setActiveSubtab(null); // Deselect if the same link is clicked
    } else {
      setActiveSubtab(landingPageUrl);
      setSelectedLandingPageUrl(landingPageUrl);

      fetch(`https://apbot.copartner.in/api/usersbylandingpageurl?token=${token}&landing_page_url=${landingPageUrl}`)
        .then(response => response.json())
        .then(data => {
          const updatedData = data.users.map(user => ({
            ...user,
            landing_page_url: landingPageUrl,
          }));

          setTableData(updatedData);

          const interacted = data.users.filter(user => user.just_interacted).length;
          const phoneProvided = data.users.filter(user => user.phone_provided).length;
          const otpVerified = data.users.filter(user => user.otp_verified).length;

          setInteractedCount(interacted);
          setPhoneProvidedCount(phoneProvided);
          setOtpVerifiedCount(otpVerified);
        })
        .catch(error => console.error('Error fetching users:', error));
    }
  };

  const handleFilterClick = (filterType) => {
    if (activeFilter === filterType) {
      handleDeselect(); // Deselect if the same filter is clicked
    } else {
      setActiveFilter(filterType);

      let filteredData = [];

      switch (filterType) {
        case 'interacted':
          filteredData = users.filter(user => user.just_interacted);
          break;
        case 'phoneProvided':
          filteredData = users.filter(user => user.phone_provided);
          break;
        case 'otpVerified':
          filteredData = users.filter(user => user.otp_verified);
          break;
        default:
          filteredData = users;
      }

      if (selectedLandingPageUrl) {
        filteredData = filteredData.filter(user => user.landing_page_url === selectedLandingPageUrl);
      }

      setTableData(filteredData);
    }
  };

  const handleAddButtonClick = () => {
    setIsAddBotPopupOpen(true);
  };

  const handleCloseAddBotPopup = () => {
    setIsAddBotPopupOpen(false);
  };

  const handleDeselect = () => {
    setActiveBotIndex(null);
    setActiveSubtab(null);
    setToken('');
    setActiveBotName('');
    setActiveBotStatus('inactive');
    setActiveFilter('');
    setTableData([]); // Clear the table data if needed
  };

  const uniqueLandingPages = [...new Set(users.map(user => user.landing_page_url))];

  return (
    <div className="xl:px-4 md:px-6 sm:ml-[10rem] text-white">
      <div className="p-2 py-5 border-gray-200 border-dashed rounded-lg dark:border-gray-700 md:mt-[4rem] mt-[30px]">
        <div className="text-white text-center md:text-left relative">
          <div className="flex md:flex-row flex-row justify-between items-center md:mt-1 mt-6 md:flex-nowrap flex-wrap">
            <h2 className="md:text-left text-center md:text-[32px] text-[28px] xl:text-[40px] font-bold md:w-full">
              Bot Listing
            </h2>
            <div className="md:flex md:w-auto md:justify-end md:items-center xl:items-center justify-start mt-4 md:mt-0 relative">
              <button
                onClick={handleAddButtonClick}
                className="bg-transparent border-[1px] border-white hover:bg-white hover:text-black transition duration-300 py-2 px-6 rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
          <div className="botButton flex justify-center md:justify-start mt-4 space-x-4 relative">
            {bots.map((bot, index) => (
              <button
                key={index}
                onClick={() => handleBotClick(bot, index)}
                className={`relative text-lg font-medium rounded-lg py-2 px-6 ${
                  activeBotIndex === index
                    ? 'bg-white text-black border-black'
                    : 'bg-transparent border-[1px] text-white border-white hover:text-black hover:bg-white'
                } transition-all flex items-center`}
              >
                {bot.bot_name ? bot.bot_name : `Bot ${index + 1}`}
                {activeBotIndex === index && (
                  <IoCloseCircle
                    onClick={handleDeselect}
                    className="absolute right-[-4px] top-1 bg-[#fff] rounded-full transform -translate-y-1/2 text-red-500 hover:text-red-700"
                    />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-2 md:py-5 border-gray-200 border-dashed rounded-lg dark:border-gray-700 container-bg">
        <div className="text-white text-center md:text-left relative">
          <div className="flex md:flex-row flex-row justify-between md:mt-1 mt-1 md:flex-nowrap flex-wrap">
            <h2 className="md:text-left text-center md:text-[32px] text-[28px] xl:text-[30px] font-semibold md:w/full">
              Link Listing
            </h2>
          </div>
          <div className="carousel-container mt-4">
            <div className="carousel-wrapper">
              <div className="carousel-content flex items-center justify-start space-x-4">
                {uniqueLandingPages.map((landingPageUrl, index) => (
                  <button
                    key={index}
                    onClick={() => handleLinkClick(landingPageUrl)}
                    className={`relative text-lg linkButton font-medium rounded-lg py-2 px-6 ${
                      activeSubtab === landingPageUrl
                        ? 'bg-blue-500 text-white'
                        : 'bg-transparent text-white border-[1px] border-white hover:text-black hover:bg-white'
                    } transition-all flex items-center`}
                  >
                    {landingPageUrl}
                    {activeSubtab === landingPageUrl && (
                      <IoCloseCircle
                        onClick={() => setActiveSubtab(null)}
                        className="absolute right-[-4px] top-2 bg-blue-500 rounded-full transform -translate-y-1/2 text-red-500 hover:text-red-700"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {activeBotIndex !== null && (
          <div className="flex flex-col md:flex-row mt-10 space-y-4 md:space-y-0 md:space-x-4">
            <button className="p-2 mx-3 bg-[#2E374B] border-[1px] border-[#ffffff21] rounded-lg shadow-lg botActive justify-around items-center flex md:w-[200px] relative">
              <div className="flex items-center">
                <GoDependabot className="text-4xl text-[#000] mr-3 bg-[#fff] rounded-full p-1" />
                <span className="text-xl font-semibold text-white">{activeBotName}</span>
              </div>
              <div className="flex items-center ml-2 mx-8">
                <label className="flex flex-col justify-center items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={activeBotStatus === 'active'}
                    onChange={handleStatusToggle} // Toggle the bot status
                  />
                  <div className="relative w-10 h-6 bg-gray-500 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#31ab47] dark:peer-focus:ring-[#237a33a3] dark:bg-gray-600 peer-checked:bg-[#31ab47] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-[#31ab47]"></div>
                  <span className="text-[0.7rem] font-medium mt-1 text-gray-300 dark:text-gray-300 uppercase">{activeBotStatus}</span>
                </label>
              </div>
            </button>

            <IconBox
              title="Interacted Users"
              count={interactedCount}
              icon={
                <div className="relative flex items-center">
                  <FaUsers className="text-4xl text-white transition transform hover:scale-110" />
                  {activeFilter === 'interacted' && (
                    <MdClose
                      onClick={handleDeselect}
                      className="absolute right-[-20px] top-[-25px] bg-[#fff] rounded-full transform -translate-y-1/2 text-red-500 hover:text-red-700"
                    />
                  )}
                </div>
              }
              onClick={() => handleFilterClick('interacted')}
            />
            <IconBox
              title="Phone Provided Users"
              count={phoneProvidedCount}
              icon={
                <div className="relative flex items-center">
                  <IoPhonePortraitOutline className="text-4xl text-white transition transform hover:scale-110" />
                  {activeFilter === 'phoneProvided' && (
                    <MdClose
                      onClick={handleDeselect}
                      className="absolute right-[-20px] top-[-25px] bg-[#fff] rounded-full transform -translate-y-1/2 text-red-500 hover:text-red-700"
                    />
                  )}
                </div>
              }
              onClick={() => handleFilterClick('phoneProvided')}
            />
            <IconBox
              title="OTP Verified Users"
              count={otpVerifiedCount}
              icon={
                <div className="relative flex items-center">
                  <RiVerifiedBadgeFill className="text-4xl text-white transition transform hover:scale-110" />
                  {activeFilter === 'otpVerified' && (
                    <MdClose
                      onClick={handleDeselect}
                      className="absolute right-[-20px] top-[-25px] bg-[#fff] rounded-full transform -translate-y-1/2 text-red-500 hover:text-red-700"
                    />
                  )}
                </div>
              }
              onClick={() => handleFilterClick('otpVerified')}
            />
          </div>
        )}

        {activeBotIndex === null && (
          <div className="flex flex-col md:flex-row mt-10 space-y-4 md:space-y-0 md:space-x-4">
            <IconBox
              title="Interacted Users"
              count={interactedCount}
              icon={<FaUsers className="text-4xl text-white transition transform hover:scale-110" />}
              onClick={() => handleFilterClick('interacted')}
            />
            <IconBox
              title="Phone Provided Users"
              count={phoneProvidedCount}
              icon={<IoPhonePortraitOutline className="text-4xl text-white transition transform hover:scale-110" />}
              onClick={() => handleFilterClick('phoneProvided')}
            />
            <IconBox
              title="OTP Verified Users"
              count={otpVerifiedCount}
              icon={<RiVerifiedBadgeFill className="text-4xl text-white transition transform hover:scale-110" />}
              onClick={() => handleFilterClick('otpVerified')}
            />
          </div>
        )}
      </div>

      <BotListTable 
        tableData={tableData} 
        token={token} 
        affiliatePartnerId={affiliatePartnerId} 
      />

      {isAddBotPopupOpen && <AddBot onClose={handleCloseAddBotPopup} />}
    </div>
  );
};

export default BotList;
