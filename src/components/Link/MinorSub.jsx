import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { clipboard, close } from '../../assets';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCopy } from 'react-icons/fa';

const MinorSub = ({ onClose }) => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://copartners.in:5009/api/Subscription')
      .then(response => {
        if (response.data.isSuccess) {
          // Filter the data based on the conditions
          const filteredData = response.data.data.filter(sub => sub.isSpecialSubscription && sub.experts.isCoPartner);
          setSubscriptions(filteredData);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const copyToClipboard = (id) => {
    const stackIdData = JSON.parse(localStorage.getItem('stackIdData'));
    if (stackIdData && stackIdData.id) {
      const link = `https://copartner.in:443/ra-detail2/${id}?apid=${stackIdData.id}`;
      navigator.clipboard.writeText(link).then(() => {
        toast.success(`Link has been copied: ${link}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    } else {
      toast.error('Error: stackIdData not found in localStorage', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-2">
      <ToastContainer />
      <div className="bg-[#29303F] rounded-lg shadow-lg p-8 w-full max-w-5xl relative text-white">
        <button onClick={onClose} className="absolute top-4 right-4">
          <img src={close} alt="Close" className="w-8 h-8" />
        </button>
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold">Minor Sub</h2>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-700 max-h-96 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Sr. No.
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                  R.A. Name
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Plan Name
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Link
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {subscriptions.map((sub, index) => (
                <tr key={sub.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">
                    {sub.experts.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">
                    {sub.planType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">
                    ₹ {sub.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">
                    {sub.durationMonth} Months
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">
                    <img
                    src={clipboard}
                      className="cursor-pointer w-6 text-[#fff] hover:text-blue-700 text-center"
                      onClick={() => copyToClipboard(sub.id)}
                      size={20}
                      alt='copy'
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MinorSub;
