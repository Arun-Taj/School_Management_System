import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEdit, FaUsers, FaMoneyBill, FaHandPaper, FaCog, FaPlus, FaMinus } from 'react-icons/fa';
import { MdHome, MdAccountBalanceWallet } from "react-icons/md";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { MdBusinessCenter } from "react-icons/md";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [expandedSubMenu, setExpandedSubMenu] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubMenu = (index) => {
    setExpandedMenu(expandedMenu === index ? null : index);
  };

  const toggleResultSubMenu = () => {
    setExpandedSubMenu(expandedSubMenu === 'result' ? null : 'result');
  };

  const menuItems = [
    { name: 'Dashboard', icon: MdHome, link: '/' },
    {
      name: 'Students', icon: FaUsers, link: '/students',
      subMenu: [
        { name: 'Add New', link: '/students/admissionForm' },
        { name: 'All Students', link: '/students/allStudents' },
        { name: 'Promote Students', link: '/students/promoteStudents' },
        { name: 'Student ID Card', link: '/students/idCard' }
      ]
    },
    {
      name: 'Employees', icon: MdBusinessCenter, link: '/employees',
      subMenu: [
        { name: 'Add New', link: '/employees/employeeForm' },
        { name: 'All Employees', link: '/employees/allEmployees' },
        { name: 'Employee ID Card', link: '/employees/eId' },
      ]
    },
    {
      name: 'Accounts', icon: MdAccountBalanceWallet, link: '/accounts',
      subMenu: [
        { name: 'Chart Of Account', link: '/accounts/chart' },
        { name: 'Add Income', link: '/accounts/addIncome' },
        { name: 'Add Expenses', link: '/accounts/addExpenses' },
        { name: 'Account Statement', link: '/accounts/statements' },
      ]
    },
    {
      name: 'Fees', icon: FaMoneyBill, link: '/fees',
      subMenu: [
        { name: 'Fee Receipt', link: '/fees/feeReceipt' },
        { name: 'Fee Report', link: '/fees/feeReport' },
        { name: 'Fee Defaulter', link: '/fees/feeDefaulter' },
      ]
    },
    {
      name: 'Attendance', icon: FaHandPaper, link: '/attendance',
      subMenu: [
        { name: 'Mark Student Attendance', link: '/attendance/markStudent' },
        { name: 'Student Attendance Report', link: '/attendance/studentReport' },
        { name: 'Mark Employee Attendance', link: '/attendance/markEmployee' },
        { name: 'Employee Attendance Report', link: '/attendance/EmployeeReport' }
      ]
    },
    {
      name: 'Exam', icon: FaEdit, link: '/exam',
      subMenu: [
        { name: 'Create New Exam', link: '/exam/createExam' },
        { name: 'Edit or Delete', link: '/exam/updateExam' },
        { name: 'Add/Update Exam Marks', link: '/exam/updateExamMarks' }
      ]
    },
    { name: 'Configuration', icon: FaCog, link: '/config',
    subMenu: [
      { name: 'Classes', link: '/config/classes' },
      
    ] }
  ];

  return (
    <div className={`flex flex-col ${isOpen ? 'w-64' : 'w-20'} bg-[#FFFFFF] h-screen p-5 box-`}style={{ boxShadow: '4px 4px 4px 0px #00000040' }}>
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
                <Link to={item.link} className="flex items-center">
                  <item.icon className="mr-2" />
                  {isOpen && <span>{item.name}</span>}
                </Link>
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
                  <div key={subIndex}>
                    <Link to={subItem.link} className="block text-black py-1">
                      {subItem.name}
                    </Link>
                  </div>
                ))}
                {/* Render the Result submenu only when Exam is expanded */}
                {item.name === 'Exam' && (
                  <>
                    <div className="flex items-center justify-between text-black py-2 cursor-pointer">
                      <span>Result</span>
                      <div onClick={toggleResultSubMenu}>
                        {expandedSubMenu === 'result' ? (
                          <FaMinus className="text-black cursor-pointer" />
                        ) : (
                          <FaPlus className="text-black cursor-pointer" />
                        )}
                      </div>
                    </div>
                    {expandedSubMenu === 'result' && (
                      <div className="ml-6">
                        <Link to="/exam/studentReport" className="block text-black py-1">
                          Student Wise Report
                        </Link>
                        <Link to="/exam/classReport" className="block text-black py-1">
                          Class Wise Report
                        </Link>
                      </div>
                    )}
                  </>
                )}
                {item.name === 'Configuration' && (
                  <>
                    <div className="flex items-center justify-between text-black py-2 cursor-pointer">
                      <span>Subjects</span>
                      <div onClick={toggleResultSubMenu}>
                        {expandedSubMenu === 'result' ? (
                          <FaMinus className="text-black cursor-pointer" />
                        ) : (
                          <FaPlus className="text-black cursor-pointer" />
                        )}
                      </div>
                    </div>
                    {expandedSubMenu === 'result' && (
                      <div className="ml-6">
                        <Link to="/config/createSub" className="block text-black py-1">
                          Create Subjects
                        </Link>
                        <Link to="/config/assignSub" className="block text-black py-1">
                          Assign Subjects
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
