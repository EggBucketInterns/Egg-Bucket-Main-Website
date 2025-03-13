import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const EditAddress = ({ address, onClose, onAddressUpdated }) => {
  const { userData } = useSelector((state) => state.user);

  const [flatNo, setFlatNo] = useState('');
  const [area, setArea] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (address) {
      setFlatNo(address.fullAddress.flatNo || '');
      setArea(address.fullAddress.area || '');
      setState(address.fullAddress.state || '');
      setCity(address.fullAddress.city || '');
      setCountry(address.fullAddress.country || '');
      setZipCode(address.fullAddress.zipCode || '');
    }
  }, [address]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation to ensure all fields are filled
    if (!flatNo || !area || !city || !state || !country || !zipCode) {
      setError("All fields are required.");
      return;
    }

    setError(''); // Clear any existing errors

    try {
      const phoneNumber = userData.phoneNumber; // Assuming user's phoneNumber is fetched correctly

      const payload = {
        addresses: [
          {
            fullAddress: {
              flatNo,
              area,
              city,
              state,
              zipCode,
              country,
            },
            coordinates: {
              lat: 40.71,  // Example latitude, adjust accordingly
              long: -74.01 // Example longitude, adjust accordingly
            }
          }
        ],
        removeAddr: 0  // 0 indicates no address removal
      };

      console.log("Payload:", payload);

      // Sending the PATCH request to update the address
      const response = await fetch(`https://b2c-backend13.onrender.com/api/v1/customer/user/${phoneNumber}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to update address: ${response.statusText} - ${errorDetails.message || errorDetails}`);
      }

      const updatedUser = await response.json();
      onAddressUpdated(updatedUser.addresses); // Notify parent component of the updated addresses
      onClose(); // Close the modal/dialog
    } catch (error) {
      console.error("Error updating address:", error);
      setError("Failed to update address. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] sm:w-[500px] shadow-lg relative">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Address</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold">Flat/Building No.</label>
            <input
              type="text"
              className="w-full border rounded p-2 mt-1"
              value={flatNo}
              onChange={(e) => setFlatNo(e.target.value)}
              placeholder="Enter Flat/Building No."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Area/Locality/Sector</label>
            <input
              type="text"
              className="w-full border rounded p-2 mt-1"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Enter Area/Locality/Sector"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">City</label>
            <input
              type="text"
              className="w-full border rounded p-2 mt-1"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter City"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">State</label>
            <input
              type="text"
              className="w-full border rounded p-2 mt-1"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Enter State"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Country</label>
            <input
              type="text"
              className="w-full border rounded p-2 mt-1"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter Country"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Pincode</label>
            <input
              type="text"
              className="w-full border rounded p-2 mt-1"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Enter Pincode"
            />
          </div>

          <button type="submit" className="w-full bg-[#f87709] text-white py-2 rounded hover:bg-green-600 mt-4">
            Save Address
          </button>
        </form>

        <button
          className="absolute top-2 right-5 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default EditAddress;
