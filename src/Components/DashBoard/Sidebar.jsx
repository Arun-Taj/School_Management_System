import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaUsers, FaMoneyBill, FaBook, FaCog } from 'react-icons/fa';
import { MdHome } from "react-icons/md";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: 'Dashboard', icon: MdHome, link: '/' },
    { name: 'Students', icon: FaUsers, link: '/students' },
    { name: 'Employees', icon: FaUser, link: '/employees' },
    { name: 'Accounts', icon: FaMoneyBill, link: '/accounts' },
    { name: 'Attendance', icon: FaBook, link: '/attendance' },
    { name: 'Exam', icon: FaBook, link: '/exam' },
    { name: 'Configuration', icon: FaCog, link: '/config' },
  ];

  return (
    <div className={`flex flex-col ${isOpen ? 'w-64' : 'w-20'} bg-slate-200 h-screen p-5`}>
      <div className="flex justify-between items-center">
        <h1 className={`text-black ${!isOpen && 'hidden'}`}>LOGO</h1>
        {isOpen ? (
          <IoIosArrowDropleft className="text-gray-700 cursor-pointer text-2xl" onClick={toggleSidebar} />
        ) : (
          <IoIosArrowDropright className="text-gray-700 cursor-pointer text-2xl" onClick={toggleSidebar} />
        )}
      </div>
      <div className="mt-10">
        {menuItems.map((item, index) => (
          <Link to={item.link} key={index} className="flex items-center text-black py-2">
            <item.icon className="mr-2" />
            {isOpen && <span>{item.name}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
