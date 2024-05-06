import React, { useState, useRef, useEffect } from 'react';
import { close } from '../assets';

const EarningPopup = ({ onClose }) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [thumbPosition, setThumbPosition] = useState(0);
  const rangeRef = useRef(null);

  useEffect(() => {
    updateRangeValuePosition();
  }, [sliderValue]);

  const handleSubmit = () => {
    onClose();
  };

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  const updateRangeValuePosition = () => {
    const thumbWidth = 20; // Width of the thumb
    const sliderWidth = rangeRef.current.offsetWidth;
    const calculatedThumbPosition = (sliderValue / 100) * (sliderWidth - thumbWidth);
    setThumbPosition(calculatedThumbPosition);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#2E374B] p-4 rounded-[20px] shadow-lg relative text-[#fff]">
        <div className="flex flex-row gap-5 items-center mb-4">
          <h2 className="text-[30px] font-semibold">Earning Calculator</h2>
          <div className="">
            Full access to in any of our products<br />
            Full access to in any of
          </div>
          <button onClick={onClose} className="absolute top-3 right-1">
            <img src={close} alt="Close" className="w-10 h-10" />
          </button>
        </div>

        {/* Range Slider */}
        <div className="relative flex justify-center mt-10">
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
            className="custom-slider" // Apply custom styling class
            ref={rangeRef}
          />
          <div
            className="range-value"
            style={{ left: sliderValue === '0' ? '0' : `${thumbPosition}px` }}
          >
            {sliderValue}
          </div>
        </div>

        <div className="flex flex-wrap justify-start mt-8">
          <div className="flex flex-col p-4 hover:bg-[#00000047] hover:border-[#ffffff40] hover:border-[1px] rounded-[10px] mb-4 mr-4">
            <span className="text-[30px] font-bold subheading-color">1st Year Earning</span>
            <span className="font-bold text-[46px] text-[#fff]">1,60,000</span>
            <p>Lorem ipsum Dolor</p>
          </div>

          <div className="flex flex-col p-4 hover:bg-[#00000047] hover:border-[#ffffff40] hover:border-[1px] rounded-[10px] mb-4 mr-4">
            <span className="text-[30px] font-bold subheading-color">2nd Year Earning</span>
            <span className="font-bold text-[46px] text-[#fff]">2,60,000</span>
            <p>Lorem ipsum Dolor</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-start mt-1">
          <div className="flex flex-col p-4 hover:bg-[#00000047] hover:border-[#ffffff40] hover:border-[1px] rounded-[10px]">
            <span className="text-[30px] font-bold subheading-color">3rd Year Earning</span>
            <span className="font-bold text-[46px] text-[#fff]">3,60,000</span>
            <p>Lorem ipsum Dolor</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningPopup;
