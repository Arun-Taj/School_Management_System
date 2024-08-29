import React from 'react';
import {Link } from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";


const ProfileDropDown = ({ isOpen }) => {
  return (
    <div className="relative inline-block text-left">
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-52 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          {/* Triangle pointer at the top right corner */}
          <div className="absolute top-[-8px] right-[8px] w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white"></div>
          <div className="py-1">
            <div className="text-center text-purple-600 font-bold">School Name</div>
            <Link
                to='/profile'
              className="text-gray-700  px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
            >
              <FaRegUserCircle />
              Profile
            </Link>
            <Link
              to='/accountSetting'
              className="text-gray-700  px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
            >
              <MdOutlineSettings/>
              Account Settings
            </Link>
            <a
              href="#"
              className="text-gray-700 flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
            >
              <LuLogOut/>
              Log Out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;
