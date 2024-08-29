import React, { useState, useEffect, useRef } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { CgMaximizeAlt } from 'react-icons/cg';
import ProfileDropDown from './Profile/ProfileDropDown';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
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
        <CgMaximizeAlt className="cursor-pointer" />
        <FaBell className="cursor-pointer" />
        <FaUserCircle 
          className="cursor-pointer" 
          onClick={toggleDropdown}
        />
      </div>

      <div ref={dropdownRef} className="absolute right-4 top-8  ">
        <ProfileDropDown isOpen={isDropdownOpen} />
      </div>
    </nav>
  );
};

export default Navbar;
