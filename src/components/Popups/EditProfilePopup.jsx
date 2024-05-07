import React, { useState, useEffect } from 'react';
import { close } from '../../assets';

const EditProfilePopup = ({ isOpen, onClose, initialProfile, onUpdateProfile }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(null); // URL for the uploaded image

  useEffect(() => {
    if (initialProfile) {
      setName(initialProfile.name);
      setEmail(initialProfile.email);
      setMobile(initialProfile.mobile); // Set the mobile number value
      if (initialProfile.imageURL) {
        setImageURL(initialProfile.imageURL); // Set the image URL if available
      }
    }
  }, [initialProfile]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImageURL(URL.createObjectURL(selectedFile)); // Create URL for the uploaded file

  };

  const handleSave = () => {
    onUpdateProfile({ name, email, mobile, imageURL  /* Add other details here */ });
    console.log("Saved Mobile Number:", mobile); // Log the saved mobile number
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#2E374B] p-8 rounded-[20px] shadow-lg relative w-[1084px]">
            <div className="absolute top-2 right-2">
              <button onClick={onClose}>
                <img src={close} alt="Close" className="w-10 h-10" />
              </button>
            </div>
            <h2 className="text-[40px] subheading-color font-semibold mb-4">Profile Edit</h2>
            {/* File Upload */}
            <div className="mb-4 w-1/2">
              <div className='text-lg mb-2'>Upload Profile Image</div>
              <label htmlFor="fileUpload" className="cursor-pointer block bg-transparent border-[2px] border-dashed border-[#ffffff66] text-[#c9c9c9] px-[2rem] py-[4rem] rounded-md text-center mb-2">
                Select
                <input type="file" id="fileUpload" className="hidden" onChange={handleFileChange} />
              </label>
              {file && <p className="text-gray-400">{file.name}</p>}
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className="relative">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-[15px] border-1 border-[1px] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#ffffff46] focus:outline-none focus:ring-0 focus:border-[#ffffff41] peer" placeholder=" " />
                <label htmlFor="name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-[#2E374B] px-2 peer-focus:bg-[#282F3E] peer-focus:px-2 peer-focus:text-[#fff] peer-focus:dark:text-[#fff]  peer-focus:rounded-md peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Name</label>
              </div>
              <div className="relative">
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} id="mailID" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-[15px] border-1 border-[1px] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#ffffff46] focus:outline-none focus:ring-0 focus:border-[#ffffff41] peer" placeholder=" " />
                <label htmlFor="mailID" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-[#2E374B] px-2 peer-focus:bg-[#282F3E] peer-focus:px-2 peer-focus:text-[#fff] peer-focus:dark:text-[#fff]  peer-focus:rounded-md peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Mail ID</label>
              </div>
              <div className="relative">
                <input type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} id="mobileNumber" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-[15px] border-1 border-[1px] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#ffffff46] focus:outline-none focus:ring-0 focus:border-[#ffffff41] peer" placeholder=" " />
                <label htmlFor="mobileNumber" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-[#2E374B] px-2 peer-focus:bg-[#282F3E] peer-focus:px-2 peer-focus:text-[#fff] peer-focus:dark:text-[#fff]  peer-focus:rounded-md peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Mobile Number</label>
              </div>
              <div className="relative">
                <input type="text" id="gstNumber" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-[15px] border-1 border-[1px] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#ffffff46] focus:outline-none focus:ring-0 focus:border-[#ffffff41] peer" placeholder=" " />
                <label htmlFor="gstNumber" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-[#2E374B] px-2 peer-focus:bg-[#282F3E] peer-focus:px-2 peer-focus:text-[#fff] peer-focus:dark:text-[#fff]  peer-focus:rounded-md peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">GST Number</label>
              </div>
              <div className="relative">
                <input type="text" id="panCard" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-[15px] border-1 border-[1px] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#ffffff46] focus:outline-none focus:ring-0 focus:border-[#ffffff41] peer" placeholder=" " />
                <label htmlFor="panCard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-[#2E374B] px-2 peer-focus:bg-[#282F3E] peer-focus:px-2 peer-focus:text-[#fff] peer-focus:dark:text-[#fff]  peer-focus:rounded-md peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">PAN Card</label>
              </div>
            </div>
            <div className='flex justify-center mt-5'> {/* Centered horizontally */}
            <button className='text-center px-7 py-3 rounded-md transition duration-300 bg-[#fff] hover:bg-[#000] text-[#000] hover:text-[#fff]' onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
        
      )}
    </>
  );
};

export default EditProfilePopup;
