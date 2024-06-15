import React, { useState } from 'react';
import { close } from '../../assets';

const FilterModal = ({ onClose, onApply }) => {
const [sortOrder, setSortOrder] = useState('asc');

const handleApply = () => {
onApply(sortOrder);
onClose();
};

return (
<div className="fixed inset-0 flex items-center justify-center z-50">
<div className="bg-[#29303F] rounded-lg shadow-lg p-8 w-full max-w-md relative">
<button onClick={onClose} className="absolute top-4 right-4">
<img src={close} alt="Close" className="w-6 h-6" />
</button>
<h2 className="text-2xl font-semibold mb-4 text-white">Sort by Users</h2>
<div className="mb-4">
<label className="flex items-center mb-2">
<input
type="radio"
value="asc"
checked={sortOrder === 'asc'}
onChange={() => setSortOrder('asc')}
className="mr-2"
/>
Low to High
</label>
<label className="flex items-center">
<input
type="radio"
value="desc"
checked={sortOrder === 'desc'}
onChange={() => setSortOrder('desc')}
className="mr-2"
/>
High to Low
</label>
</div>
<div className="flex justify-end space-x-4">
<button
         onClick={handleApply}
         className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
       >
Apply
</button>
</div>
</div>
</div>
);
};

export default FilterModal;