import React from "react";
import { FaEdit } from "react-icons/fa";
import { IoPrintOutline } from "react-icons/io5";

const StdResSearch = () => {
  const studentInfo = [
    { label: "Enrollment ID", value: "01249999" },
    { label: "Student Name", value: "Rahul Kumar Debnath" },
    { label: "Father's Name", value: "Rakhai Kumar Debnath" },
    { label: "Class", value: "Class 08" },
    { label: "Roll No", value: "35" },
  ];
  return (
    <div className="p-8 bg-pink-100 min-h-screen">
      <div className="flex gap-4  bg-white  rounded-3xl p-2 ">
        <div className="flex items-center space-x-2">
          <FaEdit className="text-gray-700 " />
          <span className="text-gray-700 font-medium">Exam </span>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-700 h-6"></div>
        <div>
          <span className="text-gray-700 font-medium">Result</span>
        </div>
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">Student Wise Result</span>
        </div>
        <div className="border-l border-gray-700 h-6"></div>
        <div>
          <span className="text-gray-700 font-medium">Search</span>
        </div>
      </div>

      <div>
        <p className="text-center font-bold pt-10 text-2xl">Result Card</p>
        <div className="flex justify-end pt-6">
            <span className=" bg-white rounded-full p-2 items-center px-4">
                 <IoPrintOutline />
            </span>
           
        </div>
        <div className="grid grid-cols-2 pt-8">
          <div>
            {/* Student Details Section */}
            <div className="flex items-start space-x-6">
              <div className="w-24 h-24 bg-purple-200 rounded-full"></div>
              <div className="space-y-1 ">
                {studentInfo.map((info) => (
                  <p key={info.label} className="text-sm">
                    <span className="font-semibold pr-3">{info.label}  :</span>
                    {info.value}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Table section */}
          <div>
            <div className="bg-white py-4 rounded-lg shadow-lg  ">
              <table className="w-full text-center ">
                <thead>
                  <tr className=" ">
                    <th className="p-2">Sl No.</th>
                    <th className="p-2">Subjects</th>
                    <th className="p-2">Total Mark</th>
                    <th className="p-2">Obtained Mark</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { subject: "English", total: 100, obtained: 84 },
                    { subject: "Math", total: 100, obtained: 84 },
                    { subject: "Science", total: 100, obtained: 84 },
                    { subject: "Social", total: 100, obtained: 84 },
                    { subject: "MIL", total: 100, obtained: 84 },
                    { subject: "Computer Science", total: 100, obtained: 84 },
                  ].map((item, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0 ? "bg-[#BCA8EA]" : "bg-[#E3D6FF]"
                      }
                    >
                      <td className="p-2">{`0${index + 1}`}</td>
                      <td className="p-2">{item.subject}</td>
                      <td className="p-2">{item.total}</td>
                      <td className="p-2">{item.obtained}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#5011DD] text-white ">
                    <td colSpan="2" className="p-2 font-semibold">
                      Total
                    </td>
                    <td className="p-2 font-semibold">600</td>
                    <td className="p-2 font-semibold">504</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Summary Section */}
            <div className="flex justify-between space-x-8 mt-8">
              <div className="text-center">
                <p className="font-semibold">Total Mark</p>
                <p className="bg-white p-2 rounded-full w-24 text-center ">
                  600
                </p>
              </div>
              <div className="text-center">
                <p className="font-semibold">Obtained Mark</p>
                <p className="bg-white p-2 rounded-full w-24 text-center ">
                  504
                </p>
              </div>
              <div className="text-center">
                <p className="font-semibold">Percentage</p>
                <p className="bg-white p-2 rounded-full w-24 text-center ">
                  84
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StdResSearch;
