import React, { useState, useContext, useEffect } from "react";
import { FcSettings } from "react-icons/fc";
import Table from "./Table";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Classes = () => {
  const { api } = useContext(AuthContext);
  const navigate = useNavigate();

  const [className, setClassName] = useState("");
  const [monthlyFees, setMonthlyFees] = useState("");
  const [classTeacherID, setClassTeacherID] = useState("");
  const [rows, setRows] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredRows, setFilteredRows] = useState(rows); // New state for filtered rows
  const [editIndex, setEditIndex] = useState(-1); // This will now store the original index of the row
  const [classTeacherOptions, setClassTeacherOptions] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);



  useEffect(() => {
    const getRelatedData = async () => {
      try {
        // const response = await api.get("/get_roles/");
        // roles = response.data.filter(role => role.name.toLowerCase() === "teacher")

        const response = await api.get("/get_teachers_for_config/");
        const classTeachers = response.data;
        // console.log(classTeachers);

        if (classTeachers.length === 0) {
          alert("Please add a teacher/employee first");
          navigate("/employees/employeeForm");
        } else {
          setClassTeacherOptions(classTeachers);
        }
      } catch (error) {

        // console.error("Error fetching roles:", error);
      }








    }
    getRelatedData();




    const loadClasses = async () => {
      const response = await api.get("/class/");

      setRows(response.data);
      setFilteredRows(response.data);
      // console.log(response.data);
    };

    loadClasses();



  }, []);
  const getClassTeacherNameFromID = (id) => {
    const classTeacher = classTeacherOptions.find((option) => option.id == id);

    return classTeacher ? classTeacher.name : "";
  };



  const handleCreateClass = () => {
    if (className && monthlyFees && classTeacherID) {
      const classTeacherName = getClassTeacherNameFromID(classTeacherID);
      const newClass = {
        className,
        class_teacher_fullname: classTeacherName,
        class_teacher: classTeacherID,
        monthlyFees,
      };
      // console.log(newClass);

      setClassName("");
      setMonthlyFees("");
      setClassTeacherID("");

      //create class in database
      const formData = new FormData();
      // console.log(className, classTeacherID, monthlyFees);

      formData.append("className", className);
      formData.append("class_teacher", classTeacherID);
      formData.append("monthlyFees", monthlyFees);
      // formData.append("id", monthlyFees);

      const createClass = async () => {
        try {
          const response = await api.post("/class/", formData);
          // console.log(response.data);

          setRows((prevRows) => [...prevRows, newClass]);
          setFilteredRows((prevRows) => [...prevRows, newClass]); // Update filtered rows
          alert("Class created successfully");

        } catch (error) {
          alert(error.response.data.message);
        }
      }
      createClass();
    }
  };

  const handleEditClass = (index) => {
    // Find the original index in the `rows` array using the class name and teacher (since rows may be filtered)
    // console.log(filteredRows[index]);

    // const originalIndex = rows.findIndex(
    //   (row) =>
    //     row.class === filteredRows[index].class &&
    //     row.class_teacher === filteredRows[index].class_teacher &&
    //     row.monthlyFees === filteredRows[index].monthlyFees
    // );
    // console.log(rows, "org index", originalIndex);

    // if (originalIndex >= 0) {
    const rowToEdit = filteredRows[index];
    // console.log(rowToEdit);
    setRowToEdit(rowToEdit);

    setClassName(rowToEdit.className);
    setMonthlyFees(rowToEdit.monthlyFees);
    setClassTeacherID(rowToEdit.class_teacher);
    setEditIndex(index); // Store the original index, not the filtered one
    // }
  };

  const handleSaveEdit = () => {
    if (editIndex >= 0) {
      const updatedRows = filteredRows.map((row, index) => {
        if (index === editIndex) {
          return {
            ...row,
            className: className,
            monthlyFees,
            class_teacher: classTeacherID,
            class_teacher_fullname: getClassTeacherNameFromID(classTeacherID),
          };
        }
        return row;
      });
      const needToUpdateRow = updatedRows[editIndex];


      setEditIndex(-1);
      setClassName("");
      setMonthlyFees("");
      setClassTeacherID("");

      //update class in database
      const formData = new FormData();
      formData.append("className", needToUpdateRow.className);
      formData.append("class_teacher", needToUpdateRow.class_teacher);
      formData.append("monthlyFees", needToUpdateRow.monthlyFees);
      // formData.append("id", needToUpdateRow.id);
      // console.log("needToUpdateRow", needToUpdateRow.id);
      // console.log("needToUpdateRow", needToUpdateRow.class_teacher);

      const updateClass = async () => {
        try {
          const response = await api.put(`/class/${rowToEdit.id}/`, formData);
          // console.log(response);
          setFilteredRows(updatedRows); // Update filtered rows as well
          alert("Class Updated successfully")
        } catch (error) {
          // console.log(error);
          alert(error.response.data.message);
        }
      }
      updateClass()
    }
  };

  const handleDeleteClass = (id) => {
    // Find the original index in the `rows` array
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      // const originalIndex = rows.findIndex(
      //   (row) =>
      //     row.className === filteredRows[index].className &&
      //     row.class_teacher === filteredRows[index].class_teacher &&
      //     row.monthlyFees === filteredRows[index].monthlyFees
      // );

      // const updatedRows = rows.filter((_, i) => i !== originalIndex); // Delete from the original rows
      // const needToDeleteRow = rows[originalIndex];
      const updatedRows = rows.filter((row, i) => row.id !== id); // Delete from the original rows
      const needToDeleteRow = rows.find(row => row.id == id);
      // console.log(needToDeleteRow);

      setRows(updatedRows);
      setFilteredRows(updatedRows); // Update filtered rows after deletion

      //delete class in database
      api
        .delete(`/class/${needToDeleteRow.id}/`)
        .then((response) => {
          // console.log(response);
          alert("Class deleted successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSearch = () => {
    // console.log(rows, searchInput);

    const searchResults = rows.filter(
      (row) =>
        row.className.toLowerCase().includes(searchInput.toLowerCase()) ||
        row.class_teacher_fullname.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredRows(searchResults); // Update the filtered rows based on search input
  };

  const handleRefresh = () => {
    setSearchInput("");
    setFilteredRows(rows); // Reset filtered rows to original rows
  };

  return filteredRows && rows && (
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
              type="number"
              className="p-2 px-4 mb-4 rounded-3xl placeholder-black border border-blue-500 w-full"
              placeholder="Monthly Fees"
              value={monthlyFees}
              onChange={(e) => setMonthlyFees(e.target.value)}
            />
            <select
              className="p-3 px-4 rounded-3xl bg-white border border-blue-500 w-full"
              value={classTeacherID}
              onChange={(e) => setClassTeacherID(e.target.value)}
            >
              <option value="" disabled selected>
                Select Class Teacher
              </option>
              {classTeacherOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
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
                placeholder="classname or class teacher name"
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
              className="border border-[#BCA8EA] p-2 bg-white rounded-full cursor-point~er transition-all duration-200 hover:bg-[#F3E8FF] hover:shadow-lg"
              onClick={handleRefresh}
            >
              <FiRefreshCcw className="text-gray-600 transition-transform duration-200 hover:rotate-180" />
            </div>
          </div>

          <Table
            rows={filteredRows}
            handleEdit={handleEditClass}
            handleDelete={handleDeleteClass}
          />
        </div>
      </div>
    </div>
  );
};

export default Classes;