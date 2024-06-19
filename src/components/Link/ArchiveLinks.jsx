import React, { useEffect, useState } from 'react';
import { clipboard, tick, close, archieve } from '../../assets';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditLink from './EditLink';

const ArchiveLinks = ({ onClose, onUnarchive }) => {
  const [generatedLinks, setGeneratedLinks] = useState([]);
  const [userData, setUserData] = useState({});
  const [subscriberData, setSubscriberData] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditLink, setCurrentEditLink] = useState(null);

  const fetchGeneratedLinks = async () => {
    try {
      const storedStackIdData = localStorage.getItem('stackIdData');
      const data = storedStackIdData ? JSON.parse(storedStackIdData) : null;

      if (data) {
        const response = await fetch(`https://copartners.in:5133/api/APDashboard/GetGeneratedAPLinks/${data.id}`);
        const result = await response.json();

        if (result.isSuccess) {
          const archivedLinks = result.data.filter(link => link.isArchive);
          setGeneratedLinks(archivedLinks);
          archivedLinks.forEach(link => {
            const apurl = getApUrlFromLink(link.generatedLink);
            if (apurl) {
              fetchTotalUserData(apurl);
              fetchSubscriberData(apurl);
            }
          });
        } else {
          console.error('Failed to fetch generated links', result);
        }
      }
    } catch (error) {
      console.error('Error fetching generated links:', error);
    }
  };

  useEffect(() => {
    fetchGeneratedLinks();
  }, []);

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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Link has copied');
    });
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

  const handleUnarchive = async (linkId) => {
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
            value: 'false',
          },
        ]),
      });
      const result = await response.json();
      if (response.ok) {
        const unarchivedLink = generatedLinks.find((link) => link.id === linkId);
        setGeneratedLinks((prevLinks) => prevLinks.filter((link) => link.id !== linkId));
        onUnarchive(unarchivedLink);
        toast.success('Link unarchived successfully');
      } else {
        toast.error(`Failed to unarchive link: ${result.displayMessage || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error unarchiving link:', error);
      toast.error('Error unarchiving link');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#29303F] rounded-lg shadow-lg p-8 w-full max-w-5xl relative text-white">
        <button onClick={onClose} className="absolute top-4 right-4">
          <img src={close} alt="Close" className="w-4 h-4" />
        </button>
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold">Archived Links</h2>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-700 max-h-96 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Sr. No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Generated URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Redirected URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Paid Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider text-center">
                  Tags
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider text-center">
                  Un-Archive
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {generatedLinks.map((link, index) => {
                const apurl = getApUrlFromLink(link.generatedLink);
                const userCount = userData[apurl] || 0;
                const subscriberInfo = subscriberData[apurl] || { totalAmount: 0, count: 0 };
                return (
                  <tr key={link.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">
                      {index + 1}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center cursor-pointer"
                      onClick={() => copyToClipboard(link.generatedLink)}
                      data-tooltip-content="Copy"
                    >
                      <span className="border border-gray-600 rounded-lg px-2 py-1 hover:bg-gray-700 transition duration-300">
                        {truncateLinkStart(link.generatedLink, 12)}
                      </span>
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center cursor-pointer"
                      onClick={() => copyToClipboard(link.apReferralLink)}
                    >
                      {truncateLinkEnd(link.apReferralLink, 30)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">
                      {userCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">
                      {subscriberInfo.count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">
                      {subscriberInfo.totalAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">
                      <span
                        className="border border-gray-600 rounded-lg px-2 py-1 hover:bg-gray-700 transition duration-300 cursor-pointer"
                        onClick={() => handleEdit(link)}
                      >
                        {link.tag ? link.tag : 'Name Tag'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">
                      <button
                        className='border-none bg-transparent cursor-pointer'
                        onClick={() => handleUnarchive(link.id)}>
                        <img src={archieve} alt="Unarchive" className="w-6 h-6 mx-auto rotate-180" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {isEditModalOpen && (
          <EditLink
            linkId={currentEditLink.id}
            initialTag={currentEditLink.tag}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleEditSave}
          />
        )}
      </div>
    </div>
  );
};

export default ArchiveLinks;
