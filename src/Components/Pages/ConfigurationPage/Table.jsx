import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const Table = ({ rows, handleEdit, handleDelete }) => {
  return (
    <div>
      <div className="overflow-x-auto rounded-2xl shadow-lg">
        <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="p-2 py-6">Class</th>
              <th className="p-2 py-6">Class Teacher</th>
              <th className="p-2 py-6">Monthly Fees</th>
              <th className="p-2 py-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className={`border border-gray-300 ${
                  index % 2 === 0 ? "bg-[#BCA8EA]" : "bg-[#E3D6FF]"
                }`}
              >
                <td className="p-2 text-center">{row.className}</td>
                <td className="p-2 text-center">{row.class_teacher_fullname}</td>
                <td className="p-2 text-center">{row.monthlyFees}</td>
                <td className="p-2 text-center flex justify-around">
                  <button className="p-1 text-black flex items-center" onClick={() => handleEdit(index)}>
                    <MdEdit />
                  </button>
                  <button className="p-1 text-black flex items-center" onClick={() => handleDelete(index)}>
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center pb-10">
        <div className="flex space-x-2 items-center">
          <button className="px-3 py-2 border border-gray-400 rounded-full ">
            10
          </button>
          <button className="px-3 py-2 border border-gray-400 rounded-full ">
            25
          </button>
          <button className="px-3 py-2 border border-gray-400 rounded-full ">
            50
          </button>
          <p>Records per page</p>
        </div>
        <div className="flex flex-row items-center">
          <div className="text-sm text-gray-600">
            Showing 1 to {rows.length} of {rows.length} records
          </div>
          <div className="flex space-x-2 items-center">
            <button className="px-3">
              <IoIosArrowDropleft size={30} />
            </button>
            <p className="border border-gray-700 px-2 rounded-full"> 1</p>
            <button className="px-3">
              <IoIosArrowDropright size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
