import React, { useEffect, useState, useRef } from 'react';
import { clipboard, tick, close, archieve } from '../../assets';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditLink from './EditLink';
import ArchiveLinks from './ArchiveLinks';

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
  const [sortOrder, setSortOrder] = useState(null); // Changed initial state to null
  const [filterButtonPosition, setFilterButtonPosition] = useState({ top: 0, left: 0 });
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
          [apurl]: result.data.length,
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
        const totalAmount = result.data.reduce((sum, subscriber) => sum + subscriber.totalAmount, 0);
        setSubscriberData(prevState => ({
          ...prevState,
          [apurl]: {
            totalAmount,
            count: result.data.length,
          },
        }));
      } else {
        console.error('Failed to fetch subscriber data', result);
      }
    } catch (error) {
      console.error('Error fetching subscriber data:', error);
    }
  };

  const getApUrlFromLink = (link) => {
    const urlParams = new URLSearchParams(link.split('?')[1]);
    const apurl = urlParams.get('apurl');
    return apurl;
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
    if (link.length > maxLength) {
      return '...' + link.substring(link.length - maxLength);
    }
    return link;
  };

  const truncateLinkEnd = (link, maxLength) => {
    if (link.length > maxLength) {
      return link.substring(0, maxLength) + '...';
    }
    return link;
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
      const usersA = userData[apurlA] || 0;
      const usersB = userData[apurlB] || 0;

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

  return (
    <div className="xl:px-1 md:p-4 sm:ml-[10rem] text-white">
      <div className="p-1 border-gray-200 border-dashed rounded-lg dark:border-gray-700 md:mt-14 mt-[30px]">
        <div className="text-white text-center">
          <div className="flex md:flex-row flex-col justify-between mt-10 md:flex-nowrap flex-wrap">
            <h2 className="md:text-left text-left md:text-[27px] text-[30px] xl:text-[40px] font-semibold w-full">
              Generate Your Links
            </h2>
          </div>

          {/* Desktop version */}
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
          </div>

          {/* Mobile version */}
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
          </div>

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
              <div className='flex flex-row items-center justify-center gap-3 p-2'>
                <button
                onClick={handleOpenArchiveModal}
                className="p-2 md:px-8 px-11 transitions-all duration-300 rounded bg-[#fff] hover:bg-[#000] hover:text-[#fff] text-[#000] font-semibold focus:outline-none focus:text-[#fff] focus:bg-[#000]"
              >
                Archived
              </button>
              
              <button
                ref={filterButtonRef}
                onClick={handleFilterClick}
                className="p-2 md:px-8 px-11 transitions-all duration-300 rounded bg-[#fff] hover:bg-[#000] hover:text-[#fff] text-[#000] font-semibold focus:outline-none focus:text-[#fff] focus:bg-[#000]"
              >
                Filter
              </button>
              </div>
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
                    <th className='text-center text-[15px]'>Archive</th>
                  </tr>
                </thead>
                <tbody>
                  {generatedLinks.map((link, index) => {
                    const apurl = getApUrlFromLink(link.generatedLink);
                    const userCount = userData[apurl] || 0;
                    const subscriberInfo = subscriberData[apurl] || { totalAmount: 0, count: 0 };
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
                        <td className='text-center'>{subscriberInfo.count}</td>
                        <td className='text-center'>{subscriberInfo.totalAmount}</td>
                        <td className='text-center'>
                          <span
                            className='border-[1px] rounded-md p-1 bg-[#0000002a] hover:bg-[#ffffff25] transition-all duration-300 cursor-pointer'
                            onClick={() => handleEdit(link)}
                          >
                            {link.tag ? link.tag : 'Name Tag'}
                          </span>
                        </td>
                        <td className='text-center'>
                          <button 
                            className='border-none bg-transparent cursor-pointer' 
                            onClick={() => handleArchive(link.id)}>
                            <img src={archieve} alt="Archive" className="w-6 h-6 mx-auto"/>
                          </button>
                        </td>
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
        <div className="absolute bg-[#1E293B] rounded-lg shadow-lg p-5 w-[150px] z-50" style={{ top: filterButtonPosition.top, left: filterButtonPosition.left }}>
          <button onClick={() => setIsFilterModalOpen(false)} className="absolute top-2 right-2">
            <img src={close} alt="Close" className="w-4 h-4" />
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
    </div>
  );
};

export default Link;
