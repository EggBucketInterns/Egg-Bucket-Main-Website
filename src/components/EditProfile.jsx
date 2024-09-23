
import React, { useState, useEffect } from 'react';

const EditProfile = ({ profile, onProfileUpdate, onCancel }) => {
  const [formData, setFormData] = useState(profile);

  useEffect(() => {
    setFormData(profile); // Sync form data with profile prop
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onProfileUpdate(formData); // Pass updated profile to parent
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
      <div className="bg-white rounded-lg border-2 border-black shadow-lg p-8 w-full max-w-md relative">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-orange-400 font-bold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter full name"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-orange-400 font-bold">Mobile number</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="+91 Enter mobile number"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-orange-400  font-bold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-orange-400 font-bold">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Age */}
          <div>
            <label className="block text-orange-400 font-bold">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your age"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border-2 border-orange-400 text-orange-400 rounded-md hover:border-orange-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
