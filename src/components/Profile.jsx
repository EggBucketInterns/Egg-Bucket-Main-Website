


import React, { useState } from 'react';
import EditProfile from './EditProfile'; // Import the EditProfile component

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'John ',
    mobile: '123-456-7890',
    email: 'john.doe@example.com',
    gender: 'Male',
    age: '25',
  });

  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

  // Handle edit button click
  const handleEditClick = () => {
    setIsEditing(true); // Switch to edit mode
  };

  // Handle profile update
  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile); // Update profile with new data
    setIsEditing(false); // Exit edit mode
  };

  // Handle canceling the edit
  const handleEditCancel = () => {
    setIsEditing(false); // Exit edit mode without saving
  };

  return (
    <div className="relative h-2/3 overflow-y-auto border-2 border-gray-200 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Profile Details</h2>

      {!isEditing ? (
        <div className="space-y-4">
          <p className="flex items-center">
            <strong className="w-24 text-xl font-semibold">Name:</strong>
            <span className="ml-2 w-full p-2 border-2 border-x-gray-100 rounded-lg text-lg font-normal ">
              {profile.name}
            </span>
          </p>
          <p className="flex items-center">
            <strong className="w-24 text-xl font-semibold">Mobile:</strong>
            <span className="ml-2 w-full p-2 border-2 border-x-gray-100 rounded-lg text-lg font-normal">{profile.mobile}</span>
          </p>
          <p className="flex items-center">
            <strong className="w-24 text-xl font-semibold">Email:</strong>
            <span className="ml-2 w-full p-2 border-2 border-x-gray-100 rounded-lg text-lg font-normal">{profile.email}</span>
          </p>
          <p className="flex items-center">
            <strong className="w-24 text-xl font-semibold">Gender:</strong>
            <span className="ml-2 w-full p-2 border-2 border-x-gray-100 rounded-lg text-lg font-normal">{profile.gender}</span>
          </p>
          <p className="flex items-center">
            <strong className="w-24 text-xl font-semibold">Age:</strong>
            <span className="ml-2  w-full p-2 border-2 border-x-gray-100 rounded-lg text-lg font-normal">
              {profile.age}
            </span>
          </p>

          <button
            onClick={handleEditClick}
            className="mt-4 bg-orange-400 text-white py-2 px-4 rounded hover:bg-orange-500"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <EditProfile
          profile={profile}
          onProfileUpdate={handleProfileUpdate}
          onCancel={handleEditCancel}
        />
      )}
    </div>
  );
};

export default Profile;
