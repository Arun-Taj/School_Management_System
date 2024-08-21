import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEdit, FaUsers, FaMoneyBill, FaHandPaper, FaCog, FaPlus, FaMinus } from 'react-icons/fa';
import { MdHome, MdAccountBalanceWallet } from "react-icons/md";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubMenu = (index) => {
    setExpandedMenu(expandedMenu === index ? null : index);
  };

  const menuItems = [
    { name: 'Dashboard', icon: MdHome, link: '/' },
    {
      name: 'Students', icon: FaUsers, link: '/students',
      subMenu: [
        { name: 'Add New', link: '/students/admissionForm' },
        { name: 'All Students', link: '/students/allStudents' },
        { name: 'Student ID Card', link: '/students/idCard' }
      ]
    },
    { name: 'Employees', icon: FaUser, link: '/employees',
    subMenu: [
      { name: 'Add New', link: '/employees/employeeForm' },
      { name: 'All Employees', link: '/employees/allEmployees' },
      { name: 'Employee ID Card', link: '/employees/eId' },
    ] },
    { name: 'Accounts', icon: MdAccountBalanceWallet, link: '/accounts' },
    { name: 'Fees', icon: FaMoneyBill, link: '/fees' },
    { name: 'Attendance', icon: FaHandPaper, link: '/attendance' },
    { name: 'Exam', icon: FaEdit, link: '/exam' },
    { name: 'Configuration', icon: FaCog, link: '/config' },
  ];

  return (
    <div className={`flex flex-col ${isOpen ? 'w-64' : 'w-20'} bg-[#FFFFFF] h-screen p-5`}>
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
          <div key={index}>
            <div className="flex items-center justify-between text-black py-2 cursor-pointer">
              <div className="flex items-center">
                <item.icon className="mr-2" />
                {isOpen && (
                  <Link to={item.link} className="flex items-center">
                    <span>{item.name}</span>
                  </Link>
                )}
              </div>
              {item.subMenu && isOpen && (
                <div onClick={() => toggleSubMenu(index)}>
                  {expandedMenu === index ? (
                    <FaMinus className="text-black cursor-pointer" />
                  ) : (
                    <FaPlus className="text-black cursor-pointer" />
                  )}
                </div>
              )}
            </div>
            {item.subMenu && expandedMenu === index && (
              <div className="ml-6">
                {item.subMenu.map((subItem, subIndex) => (
                  <Link to={subItem.link} key={subIndex} className="block text-black py-1">
                    {subItem.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
