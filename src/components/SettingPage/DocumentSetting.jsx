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
  };

  const handleDelete = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const truncateFileName = (fileName, maxLength) => {
    if (fileName.length <= maxLength) return fileName;
    return fileName.substring(0, maxLength - 3) + '...';
  };

  return (
    <div className='p-4 border-[1px] border-[#fff3] rounded-xl'>
      <div className='flex justify-between items-center'>
        <h2 className="text-left md:text-[22px] xl:text-[40px] font-semibold">Document</h2>
      </div>
      <div className='flex flex-row pt-3 items-center'>
        {selectedFiles.map((file, index) => (
          <div key={index} className="flex flex-col justify-center items-center mr-4">
            <img src={URL.createObjectURL(file)} alt="Preview" className="mt-2 w-40" />
            <h3 className="text-lg font-semibold">{truncateFileName(file.name, 20)}</h3>
            <button onClick={() => handleDelete(index)} className="mt-2 flex items-center justify-center p-1 hover:bg-[#ffffff21] transition duration-300 rounded-[50px] hover:scale-125">
              <img src={deleteIcon} alt="Delete" className="w-4 h-4 " />
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
