import React, { useState } from 'react';
import { useRef } from 'react';
import { expertise_data } from "../constants/data";
import { useParams } from 'react-router-dom';
import { call, card, cardHolder, mail, rightArrow, userImg, clipboard, tick, editBtn, editBlack } from '../assets'; // Assuming you have imported clipboard and tick icons
import DocumentSetting from './DocumentSetting';
import BankSetting from './BankSetting';

const Setting = () => {
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState()
  const [showTick, setShowTick] = useState(false);
  const referralLinkRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

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
    if (referralLinkRef.current) {
      const fullLink = referralLinkRef.current.innerText;
      navigator.clipboard.writeText(fullLink);
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

  return (
    <div className="xl:p-4 md:p-4 sm:ml-[8rem] text-white">
      <div className="p-4 px-10 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div>
          <div className='container-bg rounded-[20px] p-3 px-10'>
            <div className='profileCard w-[1048] flex items-center'>
              <div className='w-2/3'>
                <span className='text-gradient text-[70px] font-bold'>Arun Kumar</span>
                <div className='flex flex-col md:w-full xl:w-[40%] gap-5'>

                  <div className='flex flex-row justify-start gap-28'>
                    <div className='flex flex-col gap-3'>
                      <div className='flex flex-row'>
                        <span className='flex items-center gap-3 text-[#c9c9c9]'>
                          <img src={mail} alt="" className='w-5'/>
                          Arunkumar@gmail.com
                        </span>
                      </div>
                      <div className='flex flex-row'>
                        <span className='flex items-center gap-3 text-[#c9c9c9]'>
                          <img src={cardHolder} alt="" className='w-5'/>
                          GST Number
                        </span>
                      </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <span className='flex items-center gap-3 text-[#c9c9c9]'>
                        <img src={call} alt="" className='w-5'/>
                        9876545321
                      </span>
                      <div className='flex flex-row'>
                        <span className='flex items-center gap-3 text-[#c9c9c9]'>
                          <img src={card} alt="" className='w-5'/>
                          PAN Card Number
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className='referralLink flex flex-row gap-3 items-center'>
                    <span className='whitespace-nowrap overflow-ellipsis text-[#c9c9c9] text-lg'>
                      Referral Link:
                    </span>
                    <div className='border-[#fff] border-[1px] flex flex-row gap-2 rounded-[50px] px-3 py-1'>
                      <span ref={referralLinkRef} className='overflow-hidden whitespace-nowrap overflow-ellipsis text-[#c9c9c9]'>https://www.w3schools.com/cssref/pr_text_white-space.php</span>|
                      <button onClick={copyToClipboard}>
                        {copied ? (showTick ? <img src={tick} alt="Copied" className='w-5' /> : <img src={call} alt="Copy" className='w-5'/>) : <img src={call} alt="Copy" className='w-5'/>}
                      </button>
                    </div>
                  </div>

                  <div className='referralLink flex flex-row gap-3 items-center'>
                    <span className='whitespace-nowrap overflow-ellipsis text-[#c9c9c9] text-lg'>
                      Referral Code:
                    </span>
                    <div className='border-[#fff] border-[1px] flex flex-row gap-2 rounded-[50px] px-3 py-1'>
                      <span ref={referralLinkRef} className='overflow-hidden whitespace-nowrap overflow-ellipsis text-[#c9c9c9]'>YOURMOMMY</span>|
                      <button onClick={copyCodeToClipboard}>
                        {copiedCode ? (showTick ? <img src={tick} alt="Copied" className='w-5' /> : <img src={call} alt="Copy" className='w-5'/>) : <img src={call} alt="Copy" className='w-5'/>}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className='rightImgCol flex justify-center w-[1/2] relative userBack'>
                <img src={userImg} alt="" className='w-[60%] maskImage' />
                <button className="absolute flex bottom-0 right-0 bg-[#ffffff43] hover:bg-[#fff] items-center text-white hover:text-[#000] px-5 py-1 border-[1px] rounded-[50px] transition duration-300"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
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

            <div className='Manager py-5 text-nowrap'>
              <div className='text-[20px]'>Your Relationship Manager</div>
              <div className='flex flex-row pt-3 justify-between'>
                <div className='flex flex-row items-center justify-center gap-3'>
                  <span className='text-lg'>Name :</span>
                  <span className='text-[18px] p-3 bg-[#22262F] rounded-[50px] px-8'>Aditya Kumaar</span>
                </div>
                <div className='flex flex-row items-center justify-center gap-3'>
                  <span className='text-lg'>Mobile Number :</span>
                  <span className='text-[18px] p-3 bg-[#22262F] rounded-[50px] px-8'>8169499331</span>
                </div>
                <div className='flex flex-row items-center justify-center gap-3'>
                  <span className='text-lg'>Mail ID :</span>
                  <span className='text-[18px] p-3 bg-[#22262F] rounded-[50px] px-8'>Adityakumar@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className='my-5'>
          <DocumentSetting />
          </div>

          <div className='my-5'>
          <BankSetting />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
