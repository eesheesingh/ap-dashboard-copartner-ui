import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaUsers } from 'react-icons/fa';
import { IoPhonePortraitOutline } from "react-icons/io5";

export const botData = {
  Bot1: {
    iconBoxes: [
      { title: 'Interacted Visitors', count: 69, icon: <FaUsers className="text-4xl text-white transition transform hover:scale-110" /> },
      { title: 'Number Provided', count: 45, icon: <IoPhonePortraitOutline className="text-4xl text-white transition transform hover:scale-110" /> },
      { title: 'Verified Users', count: 30, icon: <RiVerifiedBadgeFill className="text-4xl text-white transition transform hover:scale-110" /> },
      { title: 'Joined Users', count: 30, icon: <FaPeopleGroup className="text-4xl text-white transition transform hover:scale-110" /> },
    ],
    tableData: [
      { date: '2024-08-01', mobile: '1234567890', verified: 'Yes', joined: 'Commodity' },
      { date: '2024-08-02', mobile: '0987654321', verified: 'No', joined: 'Future & Options' },
      { date: '2024-08-03', mobile: '1122334455', verified: 'Yes', joined: 'Equity' },
    ],
  },
  Bot2: {
    iconBoxes: [
        { title: 'Interacted Visitors', count: 69, icon: <FaUsers className="text-4xl text-white transition transform hover:scale-110" /> },
        { title: 'Number Provided', count: 45, icon: <IoPhonePortraitOutline className="text-4xl text-white transition transform hover:scale-110" /> },
        { title: 'Verified Users', count: 30, icon: <RiVerifiedBadgeFill className="text-4xl text-white transition transform hover:scale-110" /> },
        { title: 'Joined Users', count: 30, icon: <FaPeopleGroup className="text-4xl text-white transition transform hover:scale-110" /> },
    ],
    tableData: [
      { date: '2024-08-01', mobile: '2233445566', verified: 'Yes', joined: 'Equity' },
      { date: '2024-08-02', mobile: '3344556677', verified: 'No', joined: 'Commodity' },
      { date: '2024-08-03', mobile: '4455667788', verified: 'Yes', joined: 'Future & Options' },
    ],
  },
};

export const LinkData = {
  Bot1: {
    iconBoxes: [
      { title: 'Total Visitors', count: 63, icon: <FaUsers className="text-4xl text-white transition transform hover:scale-110" /> },
      { title: 'Verified Users', count: 41, icon: <RiVerifiedBadgeFill className="text-4xl text-white transition transform hover:scale-110" /> },
      { title: 'Joined Users', count: 39, icon: <FaPeopleGroup className="text-4xl text-white transition transform hover:scale-110" /> },
    ],
    tableData: [
      { date: '2024-08-01', mobile: '1234567890', verified: 'No', joined: 'Commodity' },
      { date: '2024-08-02', mobile: '0987654321', verified: 'No', joined: 'Future & Options' },
      { date: '2024-08-03', mobile: '1122334455', verified: 'Yes', joined: 'Equity' },
    ],
  },
  Bot2: {
    iconBoxes: [
      { title: 'Total Visitors', count: 53, icon: <FaUsers className="text-4xl text-white transition transform hover:scale-110" /> },
      { title: 'Verified Users', count: 37, icon: <RiVerifiedBadgeFill className="text-4xl text-white transition transform hover:scale-110" /> },
      { title: 'Joined Users', count: 20, icon: <FaPeopleGroup className="text-4xl text-white transition transform hover:scale-110" /> },
    ],
    tableData: [
      { date: '2024-08-01', mobile: '2233445566', verified: 'Yes', joined: 'Equity' },
      { date: '2024-08-02', mobile: '3344556677', verified: 'Yes', joined: 'Commodity' },
      { date: '2024-08-03', mobile: '4455667788', verified: 'No', joined: 'Future & Options' },
    ],
  },
};
