import React, { useState } from "react";
import useNotification from "./useNotification";

const FCMToken = () => {
  const { notification, loading, sendNotification } = useNotification();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (title.trim() && message.trim()) {
      sendNotification(title, message);
    } else {
      alert("Please enter both title and message");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">FCM Token Example</h2>
      {notification && (
        <div className="bg-white p-4 rounded-md shadow-md mb-4 w-full">
          <h4 className="text-lg font-semibold">{notification.title}</h4>
          <p className="text-gray-600">{notification.body}</p>
        </div>
      )}
      <input
        type="text"
        placeholder="Notification Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 mb-2 border border-gray-300 rounded w-full"
      />
      <textarea
        placeholder="Notification Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="p-2 mb-4 border border-gray-300 rounded w-full"
      />
      <button
        onClick={handleSend}
        disabled={loading}
        className={`px-4 py-2 rounded-md text-white font-semibold transition-colors ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Sending..." : "Send Notification"}
      </button>
    </div>
  );
};

export default FCMToken;
