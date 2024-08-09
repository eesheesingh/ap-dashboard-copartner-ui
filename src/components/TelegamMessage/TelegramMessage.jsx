import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const TelegramMessage = () => {
  const [telegramChannels, setTelegramChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editedChannels, setEditedChannels] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchTelegramChannels = async () => {
      try {
        const storedStackIdData = localStorage.getItem("stackIdData");
        if (storedStackIdData) {
          const stackIdData = JSON.parse(storedStackIdData);
          const affiliateId = stackIdData.id;
          console.log("", affiliateId);

          const response = await axios.get(
            `https://copartners.in:5134/api/TelegramMessage/${affiliateId}?userType=AP&page=1&pageSize=1000`
          );

          if (response.data) {
            setTelegramChannels(response.data.data);
          }
        }
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchTelegramChannels();
  }, []);

  const handleInputChange = (channelId, field, value) => {
    setEditedChannels((prevState) => ({
      ...prevState,
      [channelId]: {
        ...prevState[channelId],
        [field]: value,
      },
    }));
  };

  const handleSave = async (channelId, channelName) => {
    const changes = editedChannels[channelId];
    if (!changes) return;

    const patchData = Object.keys(changes).map((field) => ({
      path: field,
      op: "replace",
      value: changes[field],
    }));

    setSaving(true);
    try {
      await axios.patch(
        `https://copartners.in:5134/api/TelegramMessage?Id=${channelId}`,
        patchData,
        {
          headers: {
            "Content-Type": "application/json-patch+json",
          },
        }
      );
      toast.success(`Saved changes for channel: ${channelName}`);
      setEditedChannels((prevState) => ({
        ...prevState,
        [channelId]: {},
      }));
    } catch (error) {
      toast.error(`Error saving changes for channel: ${channelName}`);
      console.error(`Error saving changes for channel: ${channelId}`, error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="xl:px-1 md:p-4 sm:ml-[10rem] text-white">
      <ToastContainer />
      <div className="p-1 border-gray-200 border-dashed rounded-lg dark:border-gray-700 md:mt-14 mt-[30px]">
        <div className="text-white text-center">
          <div className="flex md:flex-row flex-col justify-between mt-10 md:flex-nowrap flex-wrap">
            <h2 className="md:text-left text-center md:text-[27px] text-[30px] xl:text-[40px] font-semibold w-full">
              Prompted Telegram Message
            </h2>
          </div>
        </div>
      </div>
      <div className="grid font-poppins grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full p-2">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          telegramChannels.map((channel, index) => (
            <div
              key={channel.id}
              className="telegramChannels text-xl border border-gray-600 rounded-[20px] bg-gray-800 shadow-lg"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: index * 0.5, // Delay each channel by 0.5 second
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <div className="border-b-[1px] border-[#ffffff3c] p-4 bg-gray-700 rounded-t-[20px]">
                <h1>{channel.channelName}</h1>
              </div>
              <div className="p-4">
                <label htmlFor={`joinMessage${channel.id}`} className="block mb-2 text-xs font-medium text-gray-300">
                  Join Message
                </label>
                <input
                  type="text"
                  id={`joinMessage${channel.id}`}
                  defaultValue={channel.joinMessage}
                  className="w-full hover:bg-[#ffffff27] cursor-pointer p-2 text-xs bg-gray-700 border border-gray-600 rounded-lg placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) =>
                    handleInputChange(channel.id, "joinMessage", e.target.value)
                  }
                />
              </div>
              <div className="p-4">
                <label htmlFor={`leaveMessage${channel.id}`} className="block mb-2 text-xs font-medium text-gray-300">
                  Left Message
                </label>
                <input
                  type="text"
                  id={`leaveMessage${channel.id}`}
                  defaultValue={channel.leaveMessage}
                  className="hover:bg-[#ffffff27] cursor-pointer w-full p-2 text-xs bg-gray-700 border border-gray-600 rounded-lg placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) =>
                    handleInputChange(channel.id, "leaveMessage", e.target.value)
                  }
                />
              </div>
              {/* <div className="p-4">
                <label htmlFor={`marketingMessage${channel.id}`} className="block mb-2 text-xs font-medium text-gray-300">
                  Marketing Message
                </label>
                <input
                  type="text"
                  id={`marketingMessage${channel.id}`}
                  defaultValue={channel.marketingMessage}
                  placeholder="Your Message"
                  className="hover:bg-[#ffffff27] cursor-pointer w-full p-2 text-xs bg-gray-700 border border-gray-600 rounded-lg placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) =>
                    handleInputChange(channel.id, "marketingMessage", e.target.value)
                  }
                />
              </div> */}
              <div className="p-4">
                <motion.button
                  className="w-full bg-[#fff] border-[1px] p-3 rounded-[10px] text-[#000] disabled:opacity-50"
                  onClick={() => handleSave(channel.id, channel.channelName)}
                  disabled={saving}
                  whileHover={{ backgroundColor: ["#fff", "#ccc", "#fff"] }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  Save
                </motion.button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TelegramMessage;
