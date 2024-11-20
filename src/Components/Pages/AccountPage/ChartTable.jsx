import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const Table = ({ rows = [], onDelete }) => {
  return (
    <div>
      <div className="overflow-x-auto rounded-2xl shadow-lg">
        <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="p-2 py-6">Name of Head</th>
              <th className="p-2 py-6">Type</th>
              <th className="p-2 py-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length===0?(  
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
              No data found
            </td>
            </tr>
            ):( rows.map((row, index) => (
              <tr
                key={index}
                className={`border border-gray-300 ${
                  index % 2 === 0 ? "bg-[#BCA8EA]" : "bg-[#E3D6FF]"
                }`}
              >
                <td className="p-2 text-center">{row.nameOfHead}</td>
                <td className="p-2 text-center">{row.type}</td>
                <td className="p-2 text-center">
                  <button className="p-1 text-black transition-colors duration-300 hover:bg-red-600 hover:text-white" onClick={() => onDelete(index)}>
                    <RiDeleteBin6Line className="hover:text-lg"/>
                  </button>
                </td>
              </tr>
            )))}
           
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center pb-10">
        <div className="flex space-x-2 items-center">
          <button className="px-3 py-2 border border-gray-400 rounded-full">10</button>
          <button className="px-3 py-2 border border-gray-400 rounded-full">25</button>
          <button className="px-3 py-2 border border-gray-400 rounded-full">50</button>
          <p>Records per page </p>
        </div>
        <div className="flex flex-row items-center">
          <div className="text-sm text-gray-600">Showing 1 to 25 of 78 records</div>
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
