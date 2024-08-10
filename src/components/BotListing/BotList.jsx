import React, { useState, useEffect } from 'react';
import AddBot from './AddBot';
import IconBox from './IconBox';
import BotListTable from './BotListTable';
import LinkListTable from './LinkListTable';
import './carousel.css';  // Ensure this CSS file exists
import { IoPhonePortraitOutline } from 'react-icons/io5';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { FaUsers } from 'react-icons/fa';

const BotList = () => {
  const [activeBox, setActiveBox] = useState(null);
  const [activeBot, setActiveBot] = useState(null);
  const [activeLink, setActiveLink] = useState(null);
  const [activeDataType, setActiveDataType] = useState('Bot');
  const [isAddBotModalOpen, setIsAddBotModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [botData, setBotData] = useState(null);
  const [groupedUserData, setGroupedUserData] = useState({});
  const [currentBotForLinks, setCurrentBotForLinks] = useState(null); // Track which bot's links are being shown
  const [userCounts, setUserCounts] = useState({ interacted: 0, phoneProvided: 0, otpVerified: 0 });

  useEffect(() => {
    const fetchBotData = async () => {
      try {
        const stackIdData = JSON.parse(localStorage.getItem('stackIdData'));
        const affiliateId = stackIdData?.id;

        const botResponse = await fetch(`http://213.210.36.35:8090/api/botsbyaffiliatepartnerid?affiliate_partner_id=${affiliateId}`);
        const botResult = await botResponse.json();
        console.log('Fetched Bot Data:', botResult);
        setBotData(botResult.bots);

        if (botResult.bots && botResult.bots.length > 0) {
          const token = botResult.bots[0].token;
          const userResponse = await fetch(`http://213.210.36.35:8090/api/usersbybottoken?token=${token}`);
          const userResult = await userResponse.json();
          console.log('Fetched User Data:', userResult);

          // Group user data by landing_page_url
          const groupedData = userResult.users.reduce((acc, user) => {
            const key = user.landing_page_url;
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(user);
            return acc;
          }, {});

          setGroupedUserData(groupedData);
          setCurrentBotForLinks(botResult.bots[0].channel_name); // Set the current bot for links

          // Calculate user counts
          const interactedCount = userResult.users.filter(user => user.just_interacted).length;
          const phoneProvidedCount = userResult.users.filter(user => user.phone_provided).length;
          const otpVerifiedCount = userResult.users.filter(user => user.otp_verified).length;
          setUserCounts({
            interacted: interactedCount,
            phoneProvided: phoneProvidedCount,
            otpVerified: otpVerifiedCount,
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBotData();
  }, []);

  const handleBoxClick = (box) => {
    setActiveBox(box);
  };

  const handleBotClick = async (bot) => {
    setActiveBot(bot);
    setActiveLink(null); // Clear link selection when a bot is clicked
    setActiveDataType('Bot');
    setActiveBox(null);

    try {
      // Fetch and set links specific to the selected bot
      const selectedBot = botData.find(b => b.channel_name === bot);
      if (selectedBot) {
        const token = selectedBot.token;
        const userResponse = await fetch(`http://213.210.36.35:8090/api/usersbybottoken?token=${token}`);
        const userResult = await userResponse.json();

        const groupedData = userResult.users.reduce((acc, user) => {
          const key = user.landing_page_url;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(user);
          return acc;
        }, {});

        setGroupedUserData(groupedData);
        setCurrentBotForLinks(bot); // Set the current bot for links

        // Calculate user counts
        const interactedCount = userResult.users.filter(user => user.just_interacted).length;
        const phoneProvidedCount = userResult.users.filter(user => user.phone_provided).length;
        const otpVerifiedCount = userResult.users.filter(user => user.otp_verified).length;
        setUserCounts({
          interacted: interactedCount,
          phoneProvided: phoneProvidedCount,
          otpVerified: otpVerifiedCount,
        });
      }
    } catch (error) {
      console.error('Error fetching links for selected bot:', error);
    }
  };

  // Convert groupedUserData into an array of user objects for the table
  const userTableData = Object.values(groupedUserData).flat();

  const handleUserLinkClick = (landingPageUrl) => {
    setActiveLink(landingPageUrl);
    console.log('Clicked User Data for:', landingPageUrl, groupedUserData[landingPageUrl]);
  };

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
                // onClick={handleAddBotClick}
                className='bg-transparent border-[1px] border-white hover:bg-white hover:text-black transition duration-300 py-2 px-6 rounded-lg'
              >
                Add
              </button>
            </div>
          </div>
          <div className='flex justify-center md:justify-start mt-4 space-x-4'>
            {botData && botData.map((bot, index) => (
              <button 
                key={index}
                className={`text-lg font-medium rounded-lg py-2 px-6 ${activeBot === bot.channel_name ? 'bg-white text-black' : 'bg-transparent text-white'} border-[1px] border-white hover:text-black hover:bg-white transition-all`}
                onClick={() => handleBotClick(bot.channel_name)}
              >
                {bot.channel_name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Only show the following sections if a bot is selected */}
      {activeBot && (
        <>
          <div className="p-2 md:py-5 border-gray-200 border-dashed rounded-lg dark:border-gray-700 container-bg">
            <div className="text-white text-center md:text-left relative">
              <div className="flex md:flex-row flex-row justify-between md:mt-1 mt-1 md:flex-nowrap flex-wrap">
                <h2 className="md:text-left text-center md:text-[32px] text-[28px] xl:text-[30px] font-semibold md:w/full">
                  Link Listing
                </h2>
              </div>
              <div className="carousel-container mt-4">
                <div className="carousel-wrapper">
                  <div className="carousel-content">
                    {Object.keys(groupedUserData).map((landingPageUrl, index) => (
                      <button 
                        key={index}
                        className={`text-lg font-medium rounded-lg py-2 px-6 ${activeLink === landingPageUrl && activeBot === currentBotForLinks ? 'bg-white text-black' : 'bg-transparent text-white'} border-[1px] border-white hover:text-black hover:bg-white transition-all m-2`}
                        onClick={() => handleUserLinkClick(landingPageUrl)}
                      >
                        {landingPageUrl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row mt-10 space-y-4 md:space-y-0 md:space-x-4">
              {/* Rendering IconBoxes with calculated counts */}
              <IconBox 
                title="Interacted Users"
                count={userCounts.interacted}
                icon={<FaUsers className="text-4xl text-white transition transform hover:scale-110" />}
              />
              <IconBox 
                title="Phone Provided Users"
                count={userCounts.phoneProvided}
                icon={<IoPhonePortraitOutline className="text-4xl text-white transition transform hover:scale-110" />}
              />
              <IconBox 
                title="OTP Verified Users"
                count={userCounts.otpVerified}
                icon={<RiVerifiedBadgeFill className="text-4xl text-white transition transform hover:scale-110" />}
              />
            </div>
          </div>

          {/* Show table data based on the active data type */}
          {activeDataType === 'Bot' ? (
            <BotListTable tableData={userTableData} />
          ) : (
            groupedUserData && <LinkListTable tableData={groupedUserData} />
          )}
        </>
      )}

      {/* {isAddBotModalOpen && <AddBot onClose={closeAddBotModal} />} */}
    </div>
  );
};

export default BotList;
