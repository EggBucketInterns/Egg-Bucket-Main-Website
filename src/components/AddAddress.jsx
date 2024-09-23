import React, { useState } from 'react';
import { IoHomeOutline, IoBriefcaseOutline, IoLocationOutline } from 'react-icons/io5';

const AddAddress = ({ onClose }) => {
  const [selectedAddressType, setSelectedAddressType] = useState('Home');
  const [formData, setFormData] = useState({
    flatNumber: '',
    area: '',
    landmark: '',
    name: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // Add save logic here if needed
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[500px] relative">
        <h2 className="text-xl font-bold mb-4">Enter Complete Address</h2>

        {/* Address Type Selection with Colored Icons */}
        <div className="mb-4 flex justify-between">
          <div
            className={`flex items-center cursor-pointer p-2 border rounded-lg ${selectedAddressType === 'Home' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedAddressType('Home')}
          >
            <IoHomeOutline className={`mr-2 ${selectedAddressType === 'Home' ? 'text-white' : 'text-blue-500'}`} /> Home
          </div>
          <div
            className={`flex items-center cursor-pointer p-2 border rounded-lg ${selectedAddressType === 'Work' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedAddressType('Work')}
          >
            <IoBriefcaseOutline className={`mr-2 ${selectedAddressType === 'Work' ? 'text-white' : 'text-green-500'}`} /> Work
          </div>
          <div
            className={`flex items-center cursor-pointer p-2 border rounded-lg ${selectedAddressType === 'Other' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedAddressType('Other')}
          >
            <IoLocationOutline className={`mr-2 ${selectedAddressType === 'Other' ? 'text-white' : 'text-orange-500'}`} /> Other
          </div>
        </div>

        {/* Form Inputs */}
        <form className="space-y-4">
          <input
            type="text"
            name="flatNumber"
            value={formData.flatNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Flat/Building No."
          />
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Area/Locality/Sector"
          />
          <input
            type="text"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Landmark (Optional)"
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Your Name"
          />
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Phone Number"
          />
        </form>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#f87709] text-white rounded hover:bg-green-600"
          >
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
