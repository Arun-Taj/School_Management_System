import React, { useRef, useEffect } from 'react';

const NotificationDropdown = ({ isOpen, toggleNotification }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggleNotification();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleNotification]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="bg-white text-gray-800 rounded-md shadow-lg p-4 w-64 absolute right-4 top-8"
    >
      <h3 className="text-lg font-bold mb-2">Notifications</h3>
      <ul>
        <li className="py-2 border-b">
          <h4 className="font-bold">New Message</h4>
          <p>You have a new message from John Doe.</p>
        </li>
        <li className="py-2 border-b">
          <h4 className="font-bold">Upcoming Event</h4>
          <p>Don't forget about the team meeting tomorrow at 2 PM.</p>
        </li>
        <li className="py-2">
          <h4 className="font-bold">System Update</h4>
          <p>The system has been updated to the latest version.</p>
        </li>
      </ul>
    </div>
  );
};

export default NotificationDropdown;
