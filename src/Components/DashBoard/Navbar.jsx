import React from 'react';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="flex flex-wrap justify-end bg-[#5011DD] text-white p-4 pr-6">
  
  <div className="flex items-center space-x-4 mt-2 lg:mt-0">
    <FaSearch className="cursor-pointer" />
    <FaBell className="cursor-pointer" />
    <FaUserCircle className="cursor-pointer" />
  </div>
</nav>

  );
};

export default Navbar;
