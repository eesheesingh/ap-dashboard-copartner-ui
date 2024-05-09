import React, { useState } from "react";
import { useRef } from "react";
import {
  call,
  card,
  cardHolder,
  mail,
  userImg,
  clipboard,
  tick,
  editBtn,
  editBlack,
} from "../../assets"; // Assuming you have imported clipboard and tick icons
import DocumentSetting from "./DocumentSetting";
import BankSetting from "./BankSetting";
import EditProfilePopup from "../Popups/EditProfilePopup";

const ProfileCardMob = () => {
  const [profile, setProfile] = useState({
    name: "Eesheepal Singh",
    email: "arunkumar@gmail.com",
    mobile: "12345678",
  });
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showTick, setShowTick] = useState(false);
  const referralLinkRef = useRef(null);
  const referralCodeRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true); // Open the EditProfilePopup
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const copyToClipboard = () => {
    if (referralLinkRef.current) {
      const fullLink = referralLinkRef.current.innerText;
      navigator.clipboard.writeText(fullLink);
      setCopied(true);
      setShowTick(true);
      setTimeout(() => {
        setShowTick(false);
      }, 1500); // 1.5 seconds delay for the tick icon
      setTimeout(() => {
        setCopied(false);
      }, 3000); // Revert to clipboard icon after 3 seconds
    }
  };

  const copyCodeToClipboard = () => {
    if (referralCodeRef.current) {
      const fullCode = referralCodeRef.current.innerText;
      navigator.clipboard.writeText(fullCode);
      setCopiedCode(true);
      setShowTick(true);
      setTimeout(() => {
        setShowTick(false);
      }, 1500); // 1.5 seconds delay for the tick icon
      setTimeout(() => {
        setCopiedCode(false);
      }, 3000); // Revert to clipboard icon after 3 seconds
    }
  };

  // Function to update profile details
  const updateProfile = (updatedProfile) => {
    setProfile({ ...profile, ...updatedProfile });
  };
  return (
    <div className="container-bg rounded-[20px] p-3 md:px-10 mt-[8rem]">
      <div className="flex flex-row">
        <div className="w-1/2 text-left">
          <span className="text-gradient text-[30px] font-bold">
            {profile.name}
          </span>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col justify-start ">
              <div className="flex flex-row">
                <span className="flex items-center gap-3 text-[#c9c9c9]">
                  <img src={mail} alt="" className="w-5" />
                  {profile.email}
                </span>
              </div>
              <div className="flex flex-row">
                <span className="flex items-center gap-3 text-[#c9c9c9]">
                  <img src={cardHolder} alt="" className="w-5" />
                  GST Number
                </span>
              </div>
              <span className="flex items-center gap-3 text-[#c9c9c9] ">
                <img src={call} alt="" className="w-5" />
                {profile.mobile}
              </span>
              <div className="flex flex-row flex-nowrap">
                <span className="flex items-center  gap-3 text-[#c9c9c9] flex-nowrap">
                  <img src={card} alt="" className="w-5" />
                  PAN Card Number
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rightImgCol flex justify-center w-1/2 relative userBack">
  <div className="imageContainer">
    <img
      src={profile.imageURL || userImg}
      alt=""
      className="w-full h-auto maskImage"
    />
    <button
      className="absolute bottom-0 right-0 bg-[#ffffff43] hover:bg-[#fff] items-center text-white hover:text-[#000] px-5 py-1 border-[1px] rounded-[50px] transition duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleEditProfileClick} // Open the EditProfilePopup on click
    >
      {isHovered ? (
        <>
          <img src={editBlack} alt="" className="inline-block w-3 mr-2" />
          Edit
        </>
      ) : (
        <>
          <img src={editBtn} alt="" className="inline-block w-3 mr-2" />
          Edit
        </>
      )}
    </button>
  </div>
</div>
      </div>

      <div className='referralLink flex flex-row gap-1 items-center mt-2'>
  <span className='text-[#c9c9c9] text-lg'>
    Referral Link:
  </span>
  <div className='border-[#fff] border-[1px] flex flex-row gap-2 rounded-[50px] px-3 py-1'>
    <span ref={referralLinkRef} className='overflow-hidden whitespace-nowrap overflow-ellipsis text-[#c9c9c9] md:w-auto w-[100px]'>https://www.w3schools.com/cssref/pr_text_white-space.php</span>|
    <button onClick={copyToClipboard}>
      {copied ? (showTick ? <img src={tick} alt="Copied" className='w-5' /> : <img src={clipboard} alt="Copy" className='w-5' />) : <img src={clipboard} alt="Copy" className='w-5' />}
    </button>
  </div>
</div>
<div className='referralLink flex flex-row gap-1 items-center mt-2'>
                    <span className='whitespace-nowrap overflow-ellipsis text-[#c9c9c9] text-lg'>
                      Referral Code:
                    </span>
                    <div className='border-[#fff] border-[1px] flex flex-row gap-2 rounded-[50px] px-3 py-1'>
                      <span ref={referralCodeRef} className='overflow-hidden whitespace-nowrap overflow-ellipsis text-[#c9c9c9]'>YOURMOMMY</span>|
                      <button onClick={copyCodeToClipboard}>
                        {copiedCode ? (showTick ? <img src={tick} alt="Copied" className='w-5' /> : <img src={clipboard} alt="Copy" className='w-5'/>) : <img src={clipboard} alt="Copy" className='w-5'/>}
                      </button>
                    </div>
                  </div>
                   <div className='Manager py-2'>
              <div className='text-[25px]'>Your Relationship Manager</div>
              <div className='flex flex-col pt-3 justify-evenly gap-2'>
                <div className='flex flex-row items-center justify-start gap-3'>
                  <span className='text-lg'>Name :</span>
                  <span className='text-[18px] p-1 bg-[#22262F] rounded-[50px] px-5'>Aditya Kumaar</span>
                </div>
                <div className='flex flex-row items-center justify-start gap-3'>
                  <span className='text-lg'>Mobile Number :</span>
                  <span className='text-[18px] p-1 bg-[#22262F] rounded-[50px] px-5'>8169499331</span>
                </div>
                <div className='flex flex-row items-center justify-start gap-3'>
                  <span className='text-lg'>Mail ID :</span>
                  <span className='text-[18px] p-1 bg-[#22262F] rounded-[50px] px-5'>Adityakumar@gmail.com</span>
                </div>
              </div>
            </div>
            <EditProfilePopup 
  isOpen={isEditProfileOpen} 
  onClose={() => setIsEditProfileOpen(false)} 
  onUpdateProfile={updateProfile}   
  initialProfile={{ name: profile.name, email: profile.email, mobile: profile.number, file: profile.file}} // Pass mobile as part of initialProfile
/>
    </div>
  );
};

export default ProfileCardMob;
