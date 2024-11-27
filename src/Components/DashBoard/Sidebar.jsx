import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUser,
  FaEdit,
  FaUsers,
  FaMoneyBill,
  FaHandPaper,
  FaCog,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { MdHome, MdAccountBalanceWallet } from "react-icons/md";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { MdBusinessCenter } from "react-icons/md";
import Logo from "../../assets/Logo.svg";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [expandedSubMenu, setExpandedSubMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeNestedSubMenu, setActiveNestedSubMenu] = useState(null); // Track active nested submenu

  const location = useLocation();

  // Load active submenu, menu, and nested submenu from localStorage on component mount
  useEffect(() => {
    try {
      const storedMenu = localStorage.getItem("expandedMenu");
      const storedSubMenu = localStorage.getItem("activeSubMenu");
      const storedNestedSubMenu = localStorage.getItem("activeNestedSubMenu");

      if (storedMenu) {
        setExpandedMenu(JSON.parse(storedMenu));
      }
      if (storedSubMenu) {
        setActiveSubMenu(JSON.parse(storedSubMenu));
      }
      if (storedNestedSubMenu) {
        setActiveNestedSubMenu(JSON.parse(storedNestedSubMenu));
      }
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      // Clear the invalid localStorage data if necessary
      localStorage.removeItem("expandedMenu");
      localStorage.removeItem("activeSubMenu");
      localStorage.removeItem("activeNestedSubMenu");
    }
  }, []);

  // Store the current active menu, submenu, and nested submenu in localStorage
  useEffect(() => {
    localStorage.setItem("expandedMenu", JSON.stringify(expandedMenu));
    localStorage.setItem("activeSubMenu", JSON.stringify(activeSubMenu));
    localStorage.setItem(
      "activeNestedSubMenu",
      JSON.stringify(activeNestedSubMenu)
    );
  }, [expandedMenu, activeSubMenu, activeNestedSubMenu]);

  // Update active submenu and nested submenu based on the current location
  useEffect(() => {
    menuItems.forEach((menu, index) => {
      if (menu.subMenu) {
        menu.subMenu.forEach((subMenu) => {
          if (location.pathname.includes(subMenu.link)) {
            setExpandedMenu(index);
            setActiveSubMenu(subMenu.name);
          }

          // Check if submenu contains nested submenus
          if (subMenu.subSubMenu) {
            subMenu.subSubMenu.forEach((nestedSub) => {
              if (location.pathname.includes(nestedSub.link)) {
                setExpandedMenu(index);
                setActiveSubMenu(subMenu.name);
                setActiveNestedSubMenu(nestedSub.name);
              }
            });
          }
        });
      } else if (location.pathname === menu.link) {
        setExpandedMenu(null);
        setActiveSubMenu(null);
        setActiveNestedSubMenu(null);
      }
    });
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubMenu = (index) => {
    setExpandedMenu(expandedMenu === index ? null : index);
  };

  const handleSubMenuClick = (subMenuKey) => {
    setActiveSubMenu(subMenuKey === activeSubMenu ? null : subMenuKey);
  };

  const handleNestedSubMenuClick = (nestedSubMenuKey) => {
    setActiveNestedSubMenu(
      nestedSubMenuKey === activeNestedSubMenu ? null : nestedSubMenuKey
    );
  };

  const menuItems = [
    { name: "Dashboard", icon: MdHome, link: "/dashboard" },
    {
      // name: 'Students', icon: FaUsers, link: '/students',
      name: "Students",
      icon: FaUsers,
      subMenu: [
        { name: "Add New", link: "/students/admissionForm" },
        { name: "All Students", link: "/students/allStudents" },
        { name: "Promote Students", link: "/students/promoteStudents" },
        // { name: 'Student ID Card', link: '/students/idCard' }
      ],
    },
    {
      // name: 'Employees', icon: MdBusinessCenter, link: '/employees',
      name: "Employees",
      icon: MdBusinessCenter,
      subMenu: [
        { name: "Add New", link: "/employees/employeeForm" },
        { name: "All Employees", link: "/employees/allEmployees" },
        // { name: 'Employee ID Card', link: '/employees/eId' },
      ],
    },
    {
      // name: 'Accounts', icon: MdAccountBalanceWallet, link: '/accounts',
      name: "Accounts",
      icon: MdAccountBalanceWallet,
      subMenu: [
        { name: "Chart Of Account", link: "/accounts/chart" },
        { name: "Add Income", link: "/accounts/addIncome" },
        { name: "Add Expenses", link: "/accounts/addExpenses" },
        { name: "Account Statement", link: "/accounts/statements" },
      ],
    },
    {
      // name: 'Fees', icon: FaMoneyBill, link: '/fees',
      name: "Fees",
      icon: FaMoneyBill,
      subMenu: [
        { name: "Fee Receipt", link: "/fees/feeReceipt" },
        { name: "Fee Report", link: "/fees/feeReport" },
        // { name: 'Fee Defaulter', link: '/fees/feeDefaulter' },
      ],
    },
    {
      // name: 'Attendance', icon: FaHandPaper, link: '/attendance',
      name: "Attendance",
      icon: FaHandPaper,
      subMenu: [
        { name: "Mark Student Attendance", link: "/attendance/markStudent" },
        {
          name: "Student Attendance Report",
          link: "/attendance/studentReport",
        },
        { name: "Mark Employee Attendance", link: "/attendance/markEmployee" },
        {
          name: "Employee Attendance Report",
          link: "/attendance/EmployeeReport",
        },
      ],
    },
    {
      name: "Exam",
      icon: FaEdit,
      subMenu: [
        { name: "Create New Exam", link: "/exam/createExam" },
        { name: "Edit or Delete", link: "/exam/updateExam" },
        { name: "Add/Update Exam Marks", link: "/exam/updateExamMarks" },
        {
          name: "Result",
          subSubMenu: [
            { name: "Student Wise Result", link: "/exam/studentReport" },
            { name: "Class Wise Result", link: "/exam/classReport" },
          ],
        },
      ],
    },
    {
      name: "Configuration",
      icon: FaCog,
      subMenu: [
        { name: "Classes", link: "/config/classes" },
        {
          name: "Subjects",
          subSubMenu: [
            { name: "Create Subjects", link: "/config/createSub" },
            { name: "Assign Subjects", link: "/config/assignSub" },
          ],
        },
      ],
    },
  ];

  return (
    <div
      className={`flex flex-col ${
        isOpen ? "w-64" : "w-20"
      } bg-[#FFFFFF] h-screen p-5 transition-all duration-300 ease-in-out`}
      style={{ boxShadow: "4px 4px 4px 0px #00000040" }}
    >
      <div className="flex justify-between items-center">
        <h1 className={`text-black ${!isOpen && "hidden"}`}>
          <img src={Logo} alt="" className="w-44"/>
        </h1>
        {isOpen ? (
          <IoIosArrowDropleft
            className="text-gray-700 cursor-pointer text-2xl"
            onClick={toggleSidebar}
          />
        ) : (
          <IoIosArrowDropright
            className="text-gray-700 cursor-pointer text-2xl"
            onClick={toggleSidebar}
          />
        )}
      </div>
      <div className="mt-10">
        {menuItems.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between text-black py-2 cursor-pointer">
              <div className="flex items-center">
                <Link
                  to={item.link}
                  className={`flex items-center hover:text-[#5011DD] hover:font-bold transition-colors duration-200 ${
                    (location.pathname === item.link ||
                      expandedMenu === index) &&
                    "text-[#5011DD] font-bold"
                  }`}
                >
                  <item.icon
                    className={`mr-2 text-xl ${
                      (location.pathname === item.link ||
                        expandedMenu === index) &&
                      "text-[#5011DD]"
                    }`}
                  />
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
            {item.subMenu && expandedMenu === index && isOpen && (
              <div className="ml-6">
                {item.subMenu.map((subItem, subIndex) => (
                  <div key={subIndex}>
                    <div className="flex items-center justify-between">
                      <Link
                        to={subItem.link}
                        className={`block py-1 hover:text-[#5011DD] hover:font-bold transition-colors duration-200 ${
                          location.pathname === subItem.link ||
                          activeSubMenu === subItem.name
                            ? "text-[#5011DD] font-bold"
                            : ""
                        }`}
                        onClick={() => handleSubMenuClick(subItem.name)}
                      >
                        {subItem.name}
                      </Link>
                      {subItem.subSubMenu && (
                        <span
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent click from bubbling up
                            activeSubMenu === subItem.name
                              ? setActiveSubMenu(null)
                              : setActiveSubMenu(subItem.name);
                          }}
                        >
                          {activeSubMenu === subItem.name ? (
                            <FaMinus className="cursor-pointer"/>
                          ) : (
                            <FaPlus className="cursor-pointer"/>
                          )}
                        </span>
                      )}
                    </div>
                    {subItem.subSubMenu && activeSubMenu === subItem.name && (
                      <div className="ml-6">
                        {subItem.subSubMenu.map(
                          (nestedSubItem, nestedIndex) => (
                            <Link
                              key={nestedIndex}
                              to={nestedSubItem.link}
                              className={`block py-1 hover:text-[#5011DD] hover:font-bold transition-colors duration-200 ${
                                location.pathname === nestedSubItem.link ||
                                activeNestedSubMenu === nestedSubItem.name
                                  ? "text-[#5011DD] font-bold"
                                  : ""
                              }`}
                              onClick={() =>
                                handleNestedSubMenuClick(nestedSubItem.name)
                              }
                            >
                              {nestedSubItem.name}
                            </Link>
                          )
                        )}
                      </div>
                    )}
                  </div>
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
