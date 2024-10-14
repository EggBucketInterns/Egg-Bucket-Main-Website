import React, { useState } from 'react';
import { FaTrashAlt, FaMapMarkerAlt } from 'react-icons/fa';
import AddAddress from './AddAddress';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../redux/userSlice';

const Addresses = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user); // Call useSelector at the top level
  const addresses = userData?.addresses || [];

  const [isAdding, setIsAdding] = useState(false);

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleAddCloseModal = () => {
    setIsAdding(false);
  };

  const handleDeleteAddress = async (addressId, addressIndex) => {
    const phoneNumber = userData.phone;
    // Remove the address with the provided addressId from the user's address list
    const updatedAddresses = addresses.filter((address) => address.id !== addressId);

    const updatedUserData = {
      addresses: JSON.stringify(updatedAddresses), // Send the updated addresses list
      removeAddr: addressIndex // Use the index of the address
    };

    try {
      // Use PATCH method to update the user's address list
      const response = await fetch(`https://b2c-49u4.onrender.com/api/v1/customer/user/${phoneNumber}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });

      if (!response.ok) {
        throw new Error('Failed to update address list');
      }

      // Fetch updated user data after deletion
      dispatch(fetchUserData(phoneNumber));
    } catch (error) {
      console.error("Error updating address list:", error);
    }
  };

  return (
    <div className="p-1 h-4/5">
      <div className="h-3/4 lg:h-5/6 overflow-y-auto bg-transparent p-4 border-2 border-gray-100 shadow-md">
        {addresses.length === 0 ? (
          <p className="text-black text-center text-lg">No addresses available</p>
        ) : (
          <div className="space-y-4">
            {addresses.map((address, index) => (
              <div
                key={index}
                className="bg-gray-50 border-black-100 border-2 rounded-lg p-4 flex justify-between items-center shadow-sm hover:bg-gray-100"
              >
                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-xl text-gray-600" />
                  <div>
                    <span className="text-lg font-semibold">{`${address.fullAddress.flatNo}, ${address.fullAddress.area}, ${address.fullAddress.city}, ${address.fullAddress.state}, ${address.fullAddress.country}-${address.fullAddress.zipCode}`}</span>
                  </div>
                </div>
                <div className="flex items-center sm:space-y-0 space-y-2 sm:space-x-2 sm:flex-row flex-col w-full sm:w-auto">
                  <button onClick={() => handleDeleteAddress(address.id, index)} className="flex justify-center w-full sm:w-auto items-center bg-white text-black py-1 px-2 rounded hover:bg-gray-300">
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

      {isAdding && (
        <AddAddress onClose={handleAddCloseModal} />
      )}
    </div>
  );
};

export default Addresses;
