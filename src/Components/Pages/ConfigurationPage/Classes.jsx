import React, { useState } from "react";
import { FcSettings } from "react-icons/fc";
import Table from "./Table";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";

const Classes = () => {
  const [className, setClassName] = useState("");
  const [monthlyFees, setMonthlyFees] = useState("");
  const [classTeacher, setClassTeacher] = useState("");
  const [rows, setRows] = useState([
    { class: "class 01", classTeacher: "Ram Kumar Sharma", monthlyFees: "700" },
  ]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredRows, setFilteredRows] = useState(rows); // New state for filtered rows
  const [editIndex, setEditIndex] = useState(-1); // This will now store the original index of the row
  const [classTeacherOptions, setClassTeacherOptions] = useState([
    "Anil Rajbanshi",
    "Sita Devi",
    "Ram Suryabansham",
    "Mohan Yadav",
    "Shyam Lal Rajbanshi",
    "Priya Magar",
    "Kapil Sharma",
    "Arya Khan",
  ]);

  const handleCreateClass = () => {
    if (className && monthlyFees && classTeacher) {
      const newClass = { class: className, classTeacher, monthlyFees };
      setRows((prevRows) => [...prevRows, newClass]);
      setFilteredRows((prevRows) => [...prevRows, newClass]); // Update filtered rows

      setClassName("");
      setMonthlyFees("");
      setClassTeacher("");
    }
  };

  const handleEditClass = (index) => {
    // Find the original index in the `rows` array using the class name and teacher (since rows may be filtered)
    const originalIndex = rows.findIndex(
      (row) =>
        row.class === filteredRows[index].class &&
        row.classTeacher === filteredRows[index].classTeacher &&
        row.monthlyFees === filteredRows[index].monthlyFees
    );

    if (originalIndex >= 0) {
      const rowToEdit = rows[originalIndex];
      setClassName(rowToEdit.class);
      setMonthlyFees(rowToEdit.monthlyFees);
      setClassTeacher(rowToEdit.classTeacher);
      setEditIndex(originalIndex); // Store the original index, not the filtered one
    }
  };

  const handleSaveEdit = () => {
    if (editIndex >= 0) {
      const updatedRows = rows.map((row, index) => {
        if (index === editIndex) {
          return { ...row, class: className, monthlyFees, classTeacher };
        }
        return row;
      });
      setRows(updatedRows);
      setFilteredRows(updatedRows); // Update filtered rows as well
      setEditIndex(-1);
      setClassName("");
      setMonthlyFees("");
      setClassTeacher("");
    }
  };

  const handleDeleteClass = (index) => {
    // Find the original index in the `rows` array
    const originalIndex = rows.findIndex(
      (row) =>
        row.class === filteredRows[index].class &&
        row.classTeacher === filteredRows[index].classTeacher &&
        row.monthlyFees === filteredRows[index].monthlyFees
    );

    const updatedRows = rows.filter((_, i) => i !== originalIndex); // Delete from the original rows
    setRows(updatedRows);
    setFilteredRows(updatedRows); // Update filtered rows after deletion
  };

  const handleSearch = () => {
    const searchResults = rows.filter(
      (row) =>
        row.class.toLowerCase().includes(searchInput.toLowerCase()) ||
        row.classTeacher.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredRows(searchResults); // Update the filtered rows based on search input
  };

  const handleRefresh = () => {
    setSearchInput("");
    setFilteredRows(rows); // Reset filtered rows to original rows
  };

  return (
    <div className="p-8 bg-pink-100 min-h-screen">
      <div className="flex gap-4 bg-white rounded-3xl p-2 ">
        <div className="flex items-center space-x-2">
          <FcSettings className="text-gray-700 " />
          <span className="text-gray-700 font-medium">Configuration</span>
        </div>
        <div className="border-l border-gray-700 h-6"></div>
        <div>
          <span className="text-gray-700 font-medium">Classes</span>
        </div>
      </div>

      <div className="flex flex-row justify-between gap-4">
        <div className="w-2/3 mt-10 flex flex-col bg-white shadow-md rounded-2xl items-center h-2/3">
          <h3 className="mb-8 text-2xl font-semibold flex mt-10">
            {editIndex >= 0 ? "Edit Class" : "Add New Class"}
          </h3>
          <div className="px-6">
            <input
              type="text"
              className="p-2 px-4 mb-4 rounded-3xl placeholder-black border border-blue-500 w-full"
              placeholder="Name of the Class"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
            <input
              type="text"
              className="p-2 px-4 mb-4 rounded-3xl placeholder-black border border-blue-500 w-full"
              placeholder="Monthly Fees"
              value={monthlyFees}
              onChange={(e) => setMonthlyFees(e.target.value)}
            />
            <select
              className="p-3 px-4 rounded-3xl bg-white border border-blue-500 w-full"
              value={classTeacher}
              onChange={(e) => setClassTeacher(e.target.value)}
            >
              <option value="" disabled selected>
                Select Class Teacher
              </option>
              {classTeacherOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <button
            className="mt-16 bg-pink-500 rounded-3xl text-white p-2 px-4 font-bold mb-16"
            onClick={editIndex >= 0 ? handleSaveEdit : handleCreateClass}
          >
            {editIndex >= 0 ? "Save" : "Create"}
          </button>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex flex-row gap-4 py-10 justify-end">
            <div className="flex items-center bg-white rounded-full ">
              <input
                type="text"
                placeholder="Search Class"
                className="py-2 text-gray-600 placeholder-gray-500 bg-transparent focus:outline-none ml-3"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <IoSearch
                className="text-gray-600 mr-4 cursor-pointer"
                size={24}
                onClick={handleSearch} // Trigger search on click
              />
            </div>
            <div
              className="border border-[#BCA8EA] p-2 bg-white rounded-full cursor-pointer transition-all duration-200 hover:bg-[#F3E8FF] hover:shadow-lg"
              onClick={handleRefresh}
            >
              <FiRefreshCcw className="text-gray-600 transition-transform duration-200 hover:rotate-180" />
            </div>
          </div>

          <Table rows={filteredRows} handleEdit={handleEditClass} handleDelete={handleDeleteClass} />
        </div>
      </div>
    </div>
  );
};

export default Classes;
