import React, { useState } from 'react';
import { FaHome, FaBriefcase, FaEllipsisH } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';

const EditAddress = ({ address, onClose }) => {
  const [selectedOption, setSelectedOption] = useState('home'); 

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    onClose(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] sm:w-[500px] shadow-lg relative">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Address</h2>

        <div className="mb-6">
          <div className="flex justify-around space-x-2">
            <div
              className={`flex flex-col items-center cursor-pointer p-2 rounded-lg ${selectedOption === 'home' ? 'bg-gray-200' : ''}`}
              onClick={() => handleOptionClick('home')}
            >
              <FaHome className="text-3xl text-blue-500" />
              <span className="text-lg">Home</span>
            </div>
            <div
              className={`flex flex-col items-center cursor-pointer p-2 rounded-lg ${selectedOption === 'work' ? 'bg-gray-200' : ''}`}
              onClick={() => handleOptionClick('work')}
            >
              <FaBriefcase className="text-3xl text-green-500" />
              <span className="text-lg">Work</span>
            </div>
            <div
              className={`flex flex-col items-center cursor-pointer p-2 rounded-lg ${selectedOption === 'other' ? 'bg-gray-200' : ''}`}
              onClick={() => handleOptionClick('other')}
            >
              <IoLocationOutline className="text-3xl text-yellow-500" />
              <span className="text-lg">Other</span>
            </div>
          </div>
        </div>

     
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold">Flat/Building No.</label>
            <input type="text" className="w-full border rounded p-2 mt-1" defaultValue={address.text} />
          </div>
          <div>
            <label className="block text-sm font-semibold">Area/Locality/Sector</label>
            <input type="text" className="w-full border rounded p-2 mt-1" placeholder="Enter Area/Locality/Sector" />
          </div>
          <div>
            <label className="block text-sm font-semibold">Landmark (Optional)</label>
            <input type="text" className="w-full border rounded p-2 mt-1" placeholder="Enter Landmark" />
          </div>
          <div>
            <label className="block text-sm font-semibold">Your Name</label>
            <input type="text" className="w-full border rounded p-2 mt-1" placeholder="Enter Your Name" />
          </div>
          <div>
            <label className="block text-sm font-semibold">Phone Number</label>
            <input type="text" className="w-full border rounded p-2 mt-1" placeholder="Enter Phone Number" />
          </div>

          <button type="submit" className="w-full bg-[#f87709] text-white py-2 rounded hover:bg-green-600 mt-4">
            Save Address
          </button>
        </form>

        <button
          className="absolute top-2 right-5 X text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
        X
        </button>
      </div>
    </div>
  );
};

export default EditAddress;
