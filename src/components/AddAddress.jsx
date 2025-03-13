import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../redux/userSlice';

const AddAddress = ({ onClose }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: userData?.phoneNumber || '', // Pre-fill phoneNumber number from userData
    email: '',
    age: '',
    gender: '',
    flatNo: '',
    addressLine1: '',
    addressLine2: '',
    area: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const [useLocation, setUseLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [invalidFields, setInvalidFields] = useState({});

  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  // At the start of your component, add this useEffect
// useEffect(() => {
//   if (userData?.phoneNumber) {
//     setFormData(prev => ({
//       ...prev,
//       phoneNumber: userData.phoneNumber,
//       name: userData.name
//     }));
//     console.log("name"+userData?.name);
//   }
// }, [userData]);



  const handleChange = (e) => {
    console.log('Input changed:', e.target.name, e.target.value);  // Log input changes
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setInvalidFields((prev) => ({ ...prev, [e.target.name]: false }));
  };

  const initializeMap = (lat, long) => {
    console.log('Initializing map at:', lat, long);  // Log map initialization
    if (mapRef.current) {
      const initialMap = L.map(mapRef.current).setView([lat, long], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(initialMap);

      setMap(initialMap);
      const newMarker = L.marker([lat, long], { draggable: true }).addTo(initialMap);
      setMarker(newMarker);
      fetchAddress(lat, long);

      newMarker.on('dragend', (e) => {
        const newPos = e.target.getLatLng();
        console.log('Marker dragged to:', newPos);  // Log marker drag event
        fetchAddress(newPos.lat, newPos.lng);
      });
    }
  };

  useEffect(() => {
    console.log('useEffect triggered, showMap:', showMap, 'map:', map, 'useLocation:', useLocation);  // Log useEffect dependencies
    if (showMap && !map && useLocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log('Geolocation success:', latitude, longitude);  // Log geolocation success
            setTimeout(() => initializeMap(latitude, longitude), 100);
          },
          () => alert('Failed to get your location.')
        );
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    }
  }, [showMap, map, useLocation]);

  const handleUseCurrentLocation = () => {
    console.log('Handling current location usage');  // Log current location usage
    setLoadingLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Current location coordinates:', latitude, longitude);  // Log current location
          setLoadingLocation(false);
          setShowMap(true);
          initializeMap(latitude, longitude);
          setUseLocation(true);
        },
        () => {
          alert('Geolocation permission denied or an error occurred.');
          setLoadingLocation(false);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
      setLoadingLocation(false);
    }
  };

  const fetchAddress = async (lat, long) => {
    console.log('Fetching address for coordinates:', lat, long);  // Log address fetch attempt
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json&accept-language=en`
      );
      console.log('Fetched address data:', response.data);  // Log address data
      const address = response.data.address;
      const addressLine2 = [address.road, address.suburb].filter(Boolean).join(', ');

      setFormData((prevData) => ({
        ...prevData,
        addressLine2: addressLine2 || '',
        area: address.neighbourhood || '',
        city: address.city || address.town || address.village || '',
        state: address.state || '',
        zipCode: address.postcode || '',
        country: address.country || '',
      }));
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const handleSaveAddress = async () => {
    console.log('Phone Number being used:', formData.phoneNumber);
  
    const coordinates = marker
      ? { lat: marker.getLatLng().lat, long: marker.getLatLng().lng }
      : { lat: null, long: null };
  
    const addressObject = {
      fullAddress: {
        flatNo: formData.flatNo,
        area: formData.area,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      },
      coordinates
    };
  
    // Ensure addresses is an array and not a string
    const updatedUserData = {
      name: formData.name,
      phoneNumber: formData.phoneNumber, // Ensure consistency with backend field names
      email: formData.email,
      age: parseInt(formData.age) || 0,
      addresses: [addressObject], // Pass it as an array, not a string
    };
  
    // Conditionally add removeAddr if address data exists
    if (updatedUserData.addresses.length >1) {
      updatedUserData.removeAddr = 0; // Ensure it's present only when address data exists
    }
    
  
    console.log('Data being sent:', JSON.stringify(updatedUserData, null, 2));
  
    try {
      const response = await fetch(
        `https://b2c-backend-eik4.onrender.com/api/v1/customer/user/${userData?.phoneNumber}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUserData),
        }
      );
  
      const responseData = await response.json();
      console.log('Response status:', response.status);
      console.log('Response data:', responseData);
  
      if (response.ok) {
        console.log('Address saved successfully');
        dispatch(fetchUserData(formData.phoneNumber));
        onClose();
      } else {
        console.error('Failed to add address:', responseData);
        alert('Failed to save address. Please try again.');
      }
    } catch (error) {
      console.error('Error during save:', error);
      alert('Error saving address. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-60">
          <div className="loader border-t-4 border-blue-500 w-16 h-16 rounded-full animate-spin"></div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[90%] md:max-w-[700px] relative flex flex-col md:flex-row overflow-y-auto max-h-[90vh] z-50">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black text-xl font-bold"
          disabled={isLoading}>
          &times;
        </button>

        {showMap && (
          <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0">
            <div ref={mapRef} style={{ height: '300px', width: '100%' }}></div>
          </div>
        )}

        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-bold mb-4">Add Address</h2>

          {useLocation === null && (
            <button
              onClick={handleUseCurrentLocation}
              className="w-full px-4 py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600">
              Use Current Location / Mark Location on Map
            </button>
          )}

          {useLocation !== null && (
            <form className="space-y-4">
              {/* New fields */}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg ${
                  invalidFields.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Name"
                required
              />
              {/* <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg ${
                  invalidFields.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Email"
                required
              /> */}
              <input
                type="text"
                name="flatNo"
                value={formData.flatNo}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg ${
                  invalidFields.flatNo ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Flat No"
                required
              />
              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg ${
                  invalidFields.addressLine1 ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Address Line 1"
                required
              />
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg ${
                  invalidFields.addressLine2 ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Address Line 2"
              />
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg ${
                  invalidFields.area ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Area"
                required
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg ${
                  invalidFields.city ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="City"
                required
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg ${
                  invalidFields.state ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="State"
                required
              />
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg ${
                  invalidFields.zipCode ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Zip Code"
                required
              />
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg ${
                  invalidFields.country ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Country"
                required
              />
            </form>
          )}
          <button
            type="button"
            onClick={handleSaveAddress}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={isLoading}>
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;