import React, { useState } from 'react';
import { document, editBlack, editBtn, deleteIcon } from '../../assets';

const DocumentSetting = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newFiles = Array.from(files);
    setSelectedFiles([...selectedFiles, ...newFiles]);

    // You can perform additional actions like uploading the files to a server here
  };

  const handleDelete = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  return (
    <div className='p-4 border-[1px] border-[#fff3] rounded-xl'>
      <div className='flex justify-between items-center'>
        <h2 className="text-left md:text-[22px] xl:text-[40px] font-semibold">Document</h2>
        <div className="flex items-center">
          <button
            className="flex bg-[#ffffff43] hover:bg-[#fff] items-center text-white hover:text-[#000] px-5 py-1 border-[1px] rounded-[50px] transition duration-300"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {isHovered ? (
              <>
                <img src={editBlack} alt="" className="inline-block w-[12px] mr-[8px]" />
                Edit
              </>
            ) : (
              <>
                <img src={editBtn} alt="" className="inline-block w-4 mr-1" />
                Edit
              </>
            )}
          </button>
        </div>
      </div>
      <div className='flex flex-row pt-3 items-center'>
        {selectedFiles.map((file, index) => (
          <div key={index} className="flex flex-col justify-center items-center mr-4">
            <img src={URL.createObjectURL(file)} alt="Preview" className="mt-2 w-40" />
            <h3 className="text-lg font-semibold">{file.name}</h3>
            <button onClick={() => handleDelete(index)} className="mt-2 flex items-center">
              {/* <img src={deleteIcon} alt="Delete" className="w-4 h-4 mr-1" /> */}
              Delete
            </button>
          </div>
        ))}
        <label htmlFor="file-upload" className='py-[50px] px-5 border-[2px] border-[#ffffffac] text-[#c9c9c9] border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer ml-4'>
          <img src={document} alt="" className='w-[60%] justify-center items-center' />
          Upload Documents
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            multiple
          />
        </label>
      </div>
    </div>
  );
};

export default DocumentSetting;
