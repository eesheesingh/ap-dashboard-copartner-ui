import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { close } from '../../assets'; // Make sure to import the close image correctly

const EditLink = ({ linkId, initialTag, onClose, onSave }) => {
  const [tag, setTag] = useState(initialTag);

  const handleSave = async () => {
    const patchData = [
      {
        path: "tag",
        op: "replace",
        value: tag
      }
    ];

    try {
      const response = await fetch(`https://copartners.in:5133/api/APDashboard/PatchGenerateAPLink?Id=${linkId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patchData),
      });

      if (response.ok) {
        toast.success('Yay! Your Link has been Named');
        onSave(tag);
        onClose();
      } else {
        toast.error('Failed to update tag');
      }
    } catch (error) {
      console.error('Error updating tag:', error);
      toast.error('Error updating tag');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#29303F] rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4">
          <img src={close} alt="Close" className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-white">Edit Tag</h2>
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="w-full p-2 mb-4 border border-[#ffffff60] rounded-lg bg-transparent text-white focus:outline-none focus:border-white"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLink;
