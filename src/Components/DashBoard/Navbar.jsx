import React, { useState, useEffect, useRef } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { CgMaximizeAlt, CgMinimize } from 'react-icons/cg';
import ProfileDropDown from './Profile/ProfileDropDown';
import NotificationDropdown from './Notification';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const toggleMaximize = () => {
    if (!isMaximized) {
      // Request fullscreen
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
      }
    }
    setIsMaximized(!isMaximized);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      setIsNotificationOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex flex-wrap justify-end bg-[#5011DD] text-white p-4 pr-6 relative">
      <div className="flex items-center space-x-4 mt-2 lg:mt-0">
        {!isMaximized ? (
          <CgMaximizeAlt className="cursor-pointer" onClick={toggleMaximize} />
        ) : (
          <CgMinimize className="cursor-pointer" onClick={toggleMaximize} />
        )}
        <FaBell className="cursor-pointer" onClick={toggleNotification} />
        <FaUserCircle className="cursor-pointer" onClick={toggleDropdown} />
      </div>

      <div ref={dropdownRef} className="absolute right-4 top-8">
        <ProfileDropDown isOpen={isDropdownOpen} />
      </div>

      <div ref={notificationRef} className="absolute right-4 top-8">
        <NotificationDropdown isOpen={isNotificationOpen} toggleNotification={toggleNotification} />
      </div>
    </nav>
  );
};

export default Navbar;
