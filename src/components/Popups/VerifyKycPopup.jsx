import React, { useState, useEffect } from 'react';
import { close } from '../../assets';

const VerifyKycPopup = ({ onClose, onVideoUpload }) => {
  const [userData, setUserData] = useState({});
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedStackIdData = localStorage.getItem('stackIdData'); // Get the user data from local storage
      if (!storedStackIdData) {
        alert('User data not found in local storage.');
        return;
      }

      const data = JSON.parse(storedStackIdData);
      const userId = data.id;

      try {
        const response = await fetch(`https://copartners.in:5133/api/AffiliatePartner?Id=${userId}`);
        if (response.ok) {
          const result = await response.json();
          setUserData(result.data[0]);
        } else {
          alert('Failed to fetch user data.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange1 = () => setIsChecked1(!isChecked1);
  const handleCheckboxChange2 = () => setIsChecked2(!isChecked2);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoURL(url);
      setVideoFile(file);

      const videoElement = document.createElement('video');
      videoElement.src = url;
      videoElement.onloadedmetadata = () => {
        if (videoElement.duration <= 120) {
          onVideoUpload(true);
        } else {
          alert('Video must be less than 2 minutes.');
          onVideoUpload(false);
          setVideoURL(null);
          setVideoFile(null);
        }
      };
    }
  };

  const handleSubmit = async () => {
    if (videoFile && isChecked1 && isChecked2) {
      if (videoFile.size > 10485760) { // Example: 10MB limit
        alert('File size exceeds the maximum limit of 10MB.');
        return;
      }

      try {
        const formData = new FormData();
        formData.append("file", videoFile, videoFile.name);

        const uploadResponse = await fetch(
          `https://copartners.in:5134/api/AWSStorage?prefix=${videoFile.name}`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload file");
        }

        const uploadData = await uploadResponse.json();
        const presignedURL = uploadData.data.presignedUrl;
        console.log("File uploaded successfully. Presigned URL:", presignedURL);

        const patchData = [
          {
            path: 'kycVideoPath',
            op: 'replace',
            value: presignedURL,
          },
          {
            path: 'isKyc',
            op: 'replace',
            value: true,
          }
        ];

        const storedStackIdData = localStorage.getItem('stackIdData'); // Get the user data from local storage
        const data = JSON.parse(storedStackIdData);
        const userId = data.id;

        const response = await fetch(`https://copartners.in:5133/api/AffiliatePartner?Id=${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json-patch+json', // Make sure the Content-Type is correct
          },
          body: JSON.stringify(patchData),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("Server response:", responseData);
          alert('KYC video uploaded successfully and KYC status updated.');
          onClose();
        } else {
          const errorText = await response.text();
          console.error('Failed to update KYC status. Server response:', errorText);
          alert('Failed to update KYC status.');
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert('Failed to upload video.');
      }
    } else {
      alert('Please upload a video and check all the declarations.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#2E374B] md:p-8 p-2 rounded-[20px] shadow-lg relative md:w-[716px] w-[350px] max-h-screen overflow-y-auto">
        <div className="absolute top-2 right-2">
          <button onClick={onClose}>
            <img src={close} alt="Close" className="w-10 h-10" />
          </button>
        </div>
        <div className="pb-4 text-left">
          <h2 className="text-[24px] font-semibold">Pan Card Verification</h2>
          <p className="text-[#c9c9c9] mt-2">
            Full access to in any of our products Full access to in any of{' '}
          </p>
        </div>
        <div className="max-w-[643px] min-h-[303px] border border-[#ffffff3c] rounded-xl relative flex items-center justify-center overflow-hidden">
          {videoURL ? (
            <video
              src={videoURL}
              controls
              autoPlay
              className="max-w-full max-h-full rounded-xl object-cover"
            />
          ) : (
            <span className="text-[#c9c9c9]">No video uploaded</span>
          )}
        </div>

        <div className="flex justify-center items-center pt-4">
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="hidden"
            id="uploadInput"
          />
          <label
            htmlFor="uploadInput"
            className="bg-[#000] text-white hover:text-[#000] px-4 py-2 rounded-md hover:bg-[#fff] transition duration-300 cursor-pointer"
          >
            Upload Video
          </label>
        </div>

        {/* Checklists */}
        <div className="flex flex-col space-y-2 mt-4">
          <label className="flex items-start text-left">
            <input
              type="checkbox"
              checked={isChecked1}
              onChange={handleCheckboxChange1}
              className="mr-2 mt-2"
            />
            I/ We hereby declare, represent and undertake -&gt; The information and the documents
            submitted by me are true, correct and accurate. I am/ we are the rightful owner and/or
            in genuine possession of the said documents/ information.
          </label>
          <label className="flex items-start text-left">
            <input
              type="checkbox"
              checked={isChecked2}
              onChange={handleCheckboxChange2}
              className="mr-2 mt-2"
            />
            I/ We hereby declare, represent and undertake -&gt; The information and the documents
            submitted by me are true, correct and accurate. I am/ we are the rightful owner and/or
            in genuine possession of the said documents/ information.
          </label>
        </div>

        <div className="flex justify-center items-center pt-3">
          <button
            className="bg-[#000] text-white hover:text-[#000] px-4 py-4 rounded-md hover:bg-[#fff] transition duration-300"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyKycPopup;
