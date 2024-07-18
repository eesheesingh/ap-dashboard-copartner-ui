import React, { useEffect, useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { clipboard, tick, close, archieve } from '../../assets';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditLink from './EditLink';
import ArchiveLinks from './ArchiveLinks';
import MinorSub from './MinorSub';

const Link = () => {
  const [copiedReferralLink, setCopiedReferralLink] = useState(false);
  const [referralLink, setReferralLink] = useState('');
  const [affiliateData, setAffiliateData] = useState(null);
  const [loadingReferral, setLoadingReferral] = useState(false);
  const [numLinks, setNumLinks] = useState('');
  const [url, setUrl] = useState('');
  const [generatedLinks, setGeneratedLinks] = useState([]);
  const [userData, setUserData] = useState({});
  const [subscriberData, setSubscriberData] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditLink, setCurrentEditLink] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [isMinorModalOpen, setIsMinorModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);
  const [filterButtonPosition, setFilterButtonPosition] = useState({ top: 0, left: 0 });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const filterButtonRef = useRef(null);

  useEffect(() => {
    const fetchAffiliateData = async () => {
      try {
        const storedStackIdData = localStorage.getItem('stackIdData');
        if (storedStackIdData) {
          const data = JSON.parse(storedStackIdData);
          setAffiliateData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAffiliateData();
  }, []);

  const fetchGeneratedLinks = async () => {
    if (affiliateData) {
      try {
        const response = await fetch(`https://copartners.in:5133/api/APDashboard/GetGeneratedAPLinks/${affiliateData.id}`);
        const result = await response.json();
        if (result.isSuccess) {
          const activeLinks = result.data.filter(link => !link.isArchive);
          setGeneratedLinks(activeLinks);
          activeLinks.forEach(link => {
            const apurl = getApUrlFromLink(link.generatedLink);
            if (apurl) {
              fetchTotalUserData(apurl);
              fetchSubscriberData(apurl);
            }
          });
        } else {
          console.error('Failed to fetch generated links', result);
        }
      } catch (error) {
        console.error('Error fetching generated links:', error);
      }
    }
  };

  useEffect(() => {
    fetchGeneratedLinks();
  }, [affiliateData]);

  const fetchTotalUserData = async (apurl) => {
    try {
      const response = await fetch(`https://copartners.in:5131/api/User/GetUserByLink?page=1&pageSize=100000&link=${apurl}`);
      const result = await response.json();
      if (result.isSuccess) {
        setUserData(prevState => ({
          ...prevState,
          [apurl]: result.data,
        }));
      } else {
        console.error('Failed to fetch user data', result);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchSubscriberData = async (apurl) => {
    try {
      const response = await fetch(`https://copartners.in:5009/api/Subscriber/GetSubscriberByLink?page=1&pageSize=100000&link=${apurl}`);
      const result = await response.json();
      if (result.isSuccess) {
        setSubscriberData(prevState => ({
          ...prevState,
          [apurl]: result.data,
        }));
      } else {
        console.error('Failed to fetch subscriber data', result);
      }
    } catch (error) {
      console.error('Error fetching subscriber data:', error);
    }
  };

  const getApUrlFromLink = (link) => {
    if (link) {
      const urlParams = new URLSearchParams(link.split('?')[1]);
      const apurl = urlParams.get('apurl');
      return apurl;
    }
    return null;
  };

  const generateReferralLink = async (affiliateId) => {
    setLoadingReferral(true);
    try {
      const response = await fetch(
        `https://copartners.in:5133/api/AffiliatePartner/GenerateReferralLink/${affiliateId}`
      );
      const result = await response.json();
      if (result.isSuccess) {
        setReferralLink(result.data);
        toast.success('Check Out Your Generated Link');
      } else {
        console.error('Failed to generate referral link', result);
      }
    } catch (error) {
      console.error('Error fetching referral link:', error);
    }
    setLoadingReferral(false);
  };

  const copyReferralLinkToClipboard = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink).then(() => {
        setCopiedReferralLink(true);
        setTimeout(() => setCopiedReferralLink(false), 2000);
        toast.success('Link has copied');
      });
    }
  };

  const truncateLinkStart = (link, maxLength) => {
    if (link && link.length > maxLength) {
      return '...' + link.substring(link.length - maxLength);
    }
    return link || '';
  };

  const truncateLinkEnd = (link, maxLength) => {
    if (link && link.length > maxLength) {
      return link.substring(0, maxLength) + '...';
    }
    return link || '';
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Link has copied');
    });
  };

  const handleGenerate = async () => {
    if (!affiliateData) {
      toast.error('Affiliate data not available');
      return;
    }

    if (!numLinks || !url) {
      toast.error('Please provide both Number of Links and URL');
      return;
    }

    const requestData = {
      affiliatePartnerId: affiliateData.id,
      num: parseInt(numLinks, 10),
      apReferralLink: url,
    };

    console.log('Request Data:', requestData);

    try {
      const response = await fetch('https://copartners.in:5133/api/APDashboard/GenerateAPLink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      const result = await response.json();
      console.log('Response:', response);
      if (response.ok) {
        toast.success('Links generated successfully');
        fetchGeneratedLinks(); // Delay to allow toast message to display
      } else {
        toast.error(`Failed to generate links: ${result.displayMessage || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error generating links:', error);
      toast.error('Error generating links');
    }
  };

  const handleEdit = (link) => {
    setCurrentEditLink(link);
    setIsEditModalOpen(true);
  };

  const handleEditSave = (updatedTag) => {
    setGeneratedLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === currentEditLink.id ? { ...link, tag: updatedTag } : link
      )
    );
  };

  const handleFilterClick = () => {
    if (filterButtonRef.current) {
      const rect = filterButtonRef.current.getBoundingClientRect();
      setFilterButtonPosition({ top: rect.bottom, left: rect.left });
      setIsFilterModalOpen(true);
    }
  };

  const handleSort = (order) => {
    const sortedLinks = [...generatedLinks].sort((a, b) => {
      const apurlA = getApUrlFromLink(a.generatedLink);
      const apurlB = getApUrlFromLink(b.generatedLink);
      const usersA = userData[apurlA] ? userData[apurlA].length : 0;
      const usersB = userData[apurlB] ? userData[apurlB].length : 0;

      if (order === 'asc') {
        return usersA - usersB;
      } else {
        return usersB - usersA;
      }
    });

    setSortOrder(order);
    setGeneratedLinks(sortedLinks);
  };

  const handleRemoveSort = () => {
    fetchGeneratedLinks();
    setSortOrder(null);
  };

  const handleArchive = async (linkId) => {
    try {
      const response = await fetch(`https://copartners.in:5133/api/APDashboard/PatchGenerateAPLink?Id=${linkId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            path: 'isArchive',
            op: 'replace',
            value: 'true',
          },
        ]),
      });
      const result = await response.json();
      if (response.ok) {
        setGeneratedLinks((prevLinks) => prevLinks.filter((link) => link.id !== linkId));
        toast.success('Link archived successfully');
      } else {
        toast.error(`Failed to archive link: ${result.displayMessage || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error archiving link:', error);
      toast.error('Error archiving link');
    }
  };

  const handleOpenArchiveModal = () => {
    setIsArchiveModalOpen(true);
  };

  const handleCloseArchiveModal = () => {
    setIsArchiveModalOpen(false);
  };

  const handleUnarchive = (unarchivedLink) => {
    setGeneratedLinks((prevLinks) => [...prevLinks, unarchivedLink]);
  };

  const handleOpenMinorModal = () => {
    setIsMinorModalOpen(true);
  };

  const handleCloseMinorModal = () => {
    setIsMinorModalOpen(false);
  };

  const filterUsersByDateRange = (start, end) => {
    const filteredUserData = {};
    const filteredSubscriberData = {};

    Object.keys(userData).forEach((key) => {
      filteredUserData[key] = userData[key].filter((user) => {
        const userDate = new Date(user.createdOn);
        if (start && end) {
          return userDate >= start && userDate <= end;
        } else if (start) {
          return userDate >= start;
        } else if (end) {
          return userDate <= end;
        }
        return true;
      });
    });

    Object.keys(subscriberData).forEach((key) => {
      filteredSubscriberData[key] = subscriberData[key].filter((subscriber) => {
        const subscriberDate = new Date(subscriber.createdOn);
        if (start && end) {
          return subscriberDate >= start && subscriberDate <= end;
        } else if (start) {
          return subscriberDate >= start;
        } else if (end) {
          return subscriberDate <= end;
        }
        return true;
      });
    });

    return { filteredUserData, filteredSubscriberData };
  };

  const { filteredUserData, filteredSubscriberData } = filterUsersByDateRange(startDate, endDate);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClearDates = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const isSpecialUser = affiliateData?.id === "9ddc2f38-71e7-4100-4402-08dc94f829a3";

  return (
    <div className="xl:px-1 md:p-4 sm:ml-[10rem] text-white">
      <div className="p-1 border-gray-200 border-dashed rounded-lg dark:border-gray-700 md:mt-14 mt-[30px]">
        <div className="text-white text-center">
          <div className="flex md:flex-row flex-col justify-around mt-10 md:flex-nowrap flex-wrap">
            <h2 className="md:text-left text-left md:text-[27px] text-[30px] xl:text-[40px] font-semibold w-full">
              {isSpecialUser ? 'Links Listings' : 'Generate Your Links'}
            </h2>
            <div className='flex justify-center items-center'>
              <button className="p-2 px-8 xl:w-[250px] text-[20px] md:text-[15px] md:w-[260px] w-full lg:w-[270px] transitions-all duration-300 rounded bg-[#fff] hover:bg-[#000] hover:text-[#fff] text-[#000] font-semibold focus:outline-none focus:text-[#fff] focus:bg-[#000]"
                onClick={handleOpenMinorModal}
              >
                Minor Subscription Link
              </button>
            </div>
          </div>

          {/* Desktop version */}
          {!isSpecialUser && (
            <div className="md:flex hidden flex-col md:flex-row justify-between p-3 md:px-[40px] mt-5 bg-[#29303F] rounded-[20px] items-center">
              <div className="flex flex-row md:flex-row items-center gap-3 w-full md:w-auto">
                <span className="md:text-lg text-sm">Referral Link</span>
                <div className="p-1 px-3 flex rounded-[30px] bg-transparent border-[1px]">
                  {referralLink ? (
                    <>
                      <span className="mr-1 md:block">
                        {referralLink}
                      </span>
                      <button
                        onClick={copyReferralLinkToClipboard}
                        className="flex items-center mt-[2px]"
                      >
                        |
                        {copiedReferralLink ? (
                          <img src={tick} alt="Copied" className="w-5" />
                        ) : (
                          <img src={clipboard} alt="Copy" className="w-5" />
                        )}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => generateReferralLink(affiliateData.id)}
                      className="flex items-center mt-[2px]"
                      disabled={loadingReferral}
                    >
                      {loadingReferral ? 'Just a sec...' : 'View Link'}
                    </button>
                  )}
                </div>
              </div>
              <button
                onClick={handleOpenArchiveModal}
                className="p-2 md:px-8 px-11 transitions-all duration-300 rounded bg-[#fff] hover:bg-[#000] hover:text-[#fff] text-[#000] font-semibold focus:outline-none focus:text-[#fff] focus:bg-[#000]"
              >
                Archive
              </button>
            </div>
          )}

          {/* Mobile version */}
          {!isSpecialUser && (
            <div className="flex md:hidden flex-col md:flex-row mt-[2rem] justify-between p-3 md:px-[40px] bg-[#29303F] rounded-[20px] items-start">
              <span className="text-lg text-left font-semibold mb-3">For Signing Up : -</span>
              <div className="flex flex-row md:flex-row items-center gap-3 w-full md:w-auto">
                <span className="md:text-lg text-sm">Referral Link</span>
                <div className="p-1 px-3 flex rounded-[30px] bg-transparent border-[1px]">
                  {referralLink ? (
                    <>
                      <span className="mr-1 md:block truncate-link">
                        {referralLink}
                      </span>
                      <button
                        onClick={copyReferralLinkToClipboard}
                        className="flex items-center mt-[2px]"
                      >
                        |
                        {copiedReferralLink ? (
                          <img src={tick} alt="Copied" className="w-5" />
                        ) : (
                          <img src={clipboard} alt="Copy" className="w-5" />
                        )}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => generateReferralLink(affiliateData.id)}
                      className="flex items-center mt-[2px]"
                      disabled={loadingReferral}
                    >
                      {loadingReferral ? 'Just a sec...' : 'View Link'}
                    </button>
                  )}
                </div>
              </div>
              <div className='mt-2 w-full'>
                <button
                  onClick={handleOpenArchiveModal}
                  className="p-2 md:px-8 px-3 w-full transitions-all duration-300 rounded bg-[#fff] hover:bg-[#000] hover:text-[#fff] text-[#000] font-semibold focus:outline-none focus:text-[#fff] focus:bg-[#000]"
                >
                  Archives
                </button>
              </div>
            </div>
          )}

          {!isSpecialUser && (
            <div className="generateLinksDiv md:flex flex-col md:flex-row justify-between p-3 md:px-[40px] mt-5 bg-[#29303F] rounded-[20px] items-center">
              <div className='flex md:flex-row flex-col justify-start items-center md:gap-4 md:mb-0 mb-3'>
                <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto mb-3 md:mb-0">
                  <span className="md:text-lg text-sm">Number of Links :</span>
                  <input
                    type="number"
                    value={numLinks}
                    onChange={(e) => setNumLinks(e.target.value)}
                    className="p-2 bg-[#0b0c104d] border-[1px] border-gray-500 text-white focus:outline-none rounded-xl focus:border-[#fff]"
                  />
                </div>
                <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto mb-3 md:mb-0">
                  <span className="md:text-lg text-sm">URL :</span>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="p-2 rounded-xl bg-[#0b0c104d] border-[1px] border-gray-500 text-white focus:outline-none focus:border-[#fff]"
                  />
                </div>
                <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
                  <button
                    onClick={handleGenerate}
                    className="p-2 px-8 transitions-all duration-300 rounded bg-[#fff] hover:bg-[#000] hover:text-[#fff] text-[#000] font-semibold focus:outline-none focus:text-[#fff] focus:bg-[#000]"
                  >
                    Generate
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="filterCard md:flex flex-col md:flex-row justify-between p-3 md:px-[40px] mt-5 bg-[#29303F] rounded-[20px] items-center">
            <div className='flex md:flex-row flex-col items-center justify-center md:border-r-2 border-r-0 md:border-b-0 border-b-[1px] md:pb-0 pb-2 md:mb-0 mb-2 md:pr-2 gap-2'>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start Date"
                className="p-2 rounded-xl bg-[#0b0c104d] border-[1px] border-gray-500 text-white focus:outline-none focus:border-[#fff]"
                renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
                  <div className="flex justify-center">
                    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>&lt;</button>
                    <select value={date.getFullYear()} onChange={({ target: { value } }) => changeYear(parseInt(value))}>
                      {Array.from({ length: 80 }, (_, i) => new Date().getFullYear() - 79 + i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <select value={date.getMonth()} onChange={({ target: { value } }) => changeMonth(parseInt(value))}>
                      {Array.from({ length: 12 }, (_, i) => i).map(month => (
                        <option key={month} value={month}>{new Date(0, month).toLocaleString(undefined, { month: 'long' })}</option>
                      ))}
                    </select>
                    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>&gt;</button>
                  </div>
                )}
              />
              To
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="End Date"
                className="p-2 rounded-xl bg-[#0b0c104d] border-[1px] border-gray-500 text-white focus:outline-none focus:border-[#fff]"
                renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
                  <div className="flex justify-center">
                    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>&lt;</button>
                    <select value={date.getFullYear()} onChange={({ target: { value } }) => changeYear(parseInt(value))}>
                      {Array.from({ length: 80 }, (_, i) => new Date().getFullYear() - 79 + i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <select value={date.getMonth()} onChange={({ target: { value } }) => changeMonth(parseInt(value))}>
                      {Array.from({ length: 12 }, (_, i) => i).map(month => (
                        <option key={month} value={month}>{new Date(0, month).toLocaleString(undefined, { month: 'long' })}</option>
                      ))}
                    </select>
                    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>&gt;</button>
                  </div>
                )}
              />
              <button
                onClick={handleClearDates}
                className="ml-1 px-6 py-2 rounded bg-[#fff] hover:bg-[#000] hover:text-[#fff] text-[#000] transition-all duration-300"
              >
                Clear
              </button>
            </div>
            <button
              ref={filterButtonRef}
              onClick={handleFilterClick}
              className="p-2 md:px-8 px-11 transitions-all duration-300 rounded bg-[#fff] hover:bg-[#000] hover:text-[#fff] text-[#000] font-semibold focus:outline-none focus:text-[#fff] focus:bg-[#000]"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Order
            </button>
          </div>

          <div className="mt-4 relative">
            <div className="mt-4 relative overflow-x-auto rounded-[30px] border-[#ffffff3e] border">
              <table className='md:w-full w-[300%] '>
                <thead className='text-center bg-[#29303F] sticky top-0'>
                  <tr className='uppercase'>
                    <th className='text-center text-[15px]'>Sr. No.</th>
                    <th className='text-center text-[15px]'>Generated URL</th>
                    <th className='text-center text-[15px]'>Redirected URL</th>
                    <th className='text-center text-[15px]'>Users</th>
                    <th className='text-center text-[15px]'>Paid Users</th>
                    <th className='text-center text-[15px]'>Amount</th>
                    <th className='text-center text-[15px]'>Tags</th>
                    {!isSpecialUser && <th className='text-center text-[15px]'>Archive</th>}
                  </tr>
                </thead>
                <tbody>
                  {generatedLinks.map((link, index) => {
                    const apurl = getApUrlFromLink(link.generatedLink);
                    const users = filteredUserData[apurl] || [];
                    const userCount = Array.isArray(users) ? users.length : 0;

                    const subscribers = filteredSubscriberData[apurl] || [];
                    const subscriberCount = Array.isArray(subscribers) ? subscribers.length : 0;
                    const totalAmount = Array.isArray(subscribers) ? subscribers.reduce((sum, subscriber) => sum + subscriber.totalAmount, 0) : 0;

                    return (
                      <tr key={link.id}>
                        <td className='text-center'>{index + 1}</td>
                        <td
                          className='text-center'
                          onClick={() => copyToClipboard(link.generatedLink)}
                          data-tooltip-content="Copy"
                        >
                          <span className='border-[1px] rounded-xl p-1 bg-[#0000002a] hover:bg-[#ffffff25] transition-all duration-300 cursor-pointer'>
                            {truncateLinkStart(link.generatedLink, 40)}
                          </span>
                        </td>
                        <td
                          className='text-center'
                          onClick={() => copyToClipboard(link.apReferralLink)}
                        >
                          {truncateLinkEnd(link.apReferralLink, 30)}
                        </td>
                        <td className='text-center'>{userCount}</td>
                        <td className='text-center'>{subscriberCount}</td>
                        <td className='text-center'>{totalAmount}</td>
                        <td className='text-center'>
                          <span
                            className={`border-[1px] rounded-md p-1 ${!isSpecialUser ? 'bg-[#0000002a] hover:bg-[#ffffff25] transition-all duration-300 cursor-pointer' : 'cursor-not-allowed'}`}
                            onClick={() => !isSpecialUser && handleEdit(link)}
                          >
                            {link.tag ? link.tag : 'Name Tag'}
                          </span>
                        </td>
                        {!isSpecialUser && (
                          <td className='text-center'>
                            <button 
                              className='border-none bg-transparent cursor-pointer' 
                              onClick={() => handleArchive(link.id)}>
                              <img src={archieve} alt="Archive" className="w-6 h-6 mx-auto"/>
                            </button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <EditLink
          linkId={currentEditLink.id}
          initialTag={currentEditLink.tag}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditSave}
        />
      )}
      {isFilterModalOpen && (
        <div
          className="absolute bg-[#1E293B] rounded-lg shadow-lg p-5 w-[180px] z-50"
          style={{
            top: `${filterButtonPosition.top + window.scrollY}px`,
            left: `${filterButtonPosition.left}px`,
          }}
        >
          <button onClick={() => setIsFilterModalOpen(false)} className="absolute top-2 right-2">
            <img src={close} alt="Close" className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-semibold mb-4 text-white">Sort by Users</h2>
          <div className="mb-4">
            <label className="flex items-center mb-2 text-white">
              <input
                type="radio"
                value="asc"
                checked={sortOrder === 'asc'}
                onChange={() => setSortOrder('asc')}
                className="mr-2"
              />
              Low to High
            </label>
            <label className="flex items-center text-white">
              <input
                type="radio"
                value="desc"
                checked={sortOrder === 'desc'}
                onChange={() => setSortOrder('desc')}
                className="mr-2"
              />
              High to Low
            </label>
          </div>
          <button
            onClick={() => {
              handleSort(sortOrder);
              setIsFilterModalOpen(false);
            }}
            className="bg-[#fff] text-[#000] px-3 py-1 rounded-lg hover:bg-[#000] hover:text-[#fff] transition duration-200 w-full"
          >
            Apply
          </button>
          <button
            onClick={() => {
              handleRemoveSort();
              setIsFilterModalOpen(false);
            }}
            className="bg-[#fff] text-[#000] px-3 py-1 rounded-lg hover:bg-[#000] hover:text-[#fff] transition duration-200 w-full mt-2"
          >
            Remove
          </button>
        </div>
      )}
      {isArchiveModalOpen && (
        <ArchiveLinks onClose={handleCloseArchiveModal} onUnarchive={handleUnarchive} />
      )}
      {isMinorModalOpen && (
        <MinorSub onClose={handleCloseMinorModal} />
      )}
    </div>
  );
};

export default Link;
