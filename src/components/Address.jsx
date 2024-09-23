
import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaMapMarkerAlt } from 'react-icons/fa';
import EditAddress from './EditAddress';
import AddAddress from './AddAddress';

const Addresses = () => {
  const addresses = [
    { id: 1, text: '123 Main St, Springfield, IL' },
    { id: 2, text: '456 Elm St, Springfield, IL' },
    { id: 3, text: '789 Oak St, Springfield, IL' },
    { id: 4, text: '101 Pine St, Springfield, IL' },
    { id: 5, text: '202 Maple St, Springfield, IL' },
    { id: 6, text: '303 Birch St, Springfield, IL' },
    { id: 6, text: '303 Birch St, Springfield, IL' },

  ];
  
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAdding, setIsAdding] = useState(false); // State for Add Address modal

  const handleEditClick = (address) => {
    setSelectedAddress(address);
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    setSelectedAddress(null);
  };

  const handleAddCloseModal = () => {
    setIsAdding(false);
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };

  return (
    <div className="p-1 h-4/5">
      <div className="h-3/4 lg:h-5/6 overflow-y-auto bg-transparent p-4 border-2 border-gray-100 shadow-md">
        {addresses.length === 0 ? (
          <p className="text-black text-center text-lg">No addresses available</p>
        ) : (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="bg-gray-50 border-black-100 border-2 rounded-lg p-4 flex justify-between items-center shadow-sm hover:bg-gray-100"
              >
                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-xl text-gray-600" />
                  <div>
                    <span className="text-lg font-semibold">{address.text}</span>
                  </div>
                </div>
                <div className="flex items-center sm:space-y-0 space-y-2 sm:space-x-2 sm:flex-row flex-col w-full sm:w-auto">
                  <button onClick={() => handleEditClick(address)} className="flex justify-center w-full sm:w-auto items-center bg-white  text-black py-1 px-2 rounded hover:bg-gray-300">
                    <FaEdit className="mr-1 text-blue-600" /> Edit
                  </button>
                  <button className="flex justify-center w-full sm:w-auto items-center bg-white  text-black py-1 px-2 rounded hover:bg-gray-300">
                    <FaTrashAlt className="mr-1 text-red-600" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-center">
        <button onClick={handleAddClick} className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600">
          Add New Address
        </button>
      </div>

      {isEditing && (
        <EditAddress
          address={selectedAddress}
          onClose={handleCloseModal}
        />
      )}

      {isAdding && (
        <AddAddress
          onClose={handleAddCloseModal}
        />
      )}
    </div>
  );
};

export default Addresses;
