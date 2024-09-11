import React, { useState } from "react";
import { FcSettings } from "react-icons/fc";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import ClassSubjects from "./ClassSubjects";

const Classes = () => {
  const initialClasses = [
    {
      className: "Class Nursery",
      subjects: [
        { subject: "English", teacher: "John Smith" },
        { subject: "Mathematics", teacher: "Emily Johnson" },
        { subject: "Science", teacher: "Michael Brown" },
      ],
    },
    {
      className: "Class LKG",
      subjects: [
        { subject: "English", teacher: "Sarah Davis" },
        { subject: "Mathematics", teacher: "David Wilson" },
        { subject: "Science", teacher: "Laura Garcia" },
      ],
    },
    {
      className: "Class UKG",
      subjects: [
        { subject: "English", teacher: "James Martinez" },
        { subject: "Mathematics", teacher: "Linda Rodriguez" },
        { subject: "Science", teacher: "Robert Lee" },
      ],
    },
  ];
  const [selectedClass, setSelectedClass] = useState("");
  const [subjectList, setSubjectList] = useState([
    { subject: "", teacher: "" },
  ]);
  const [classes, setClasses] = useState(initialClasses); // To hold the assigned subjects for each class

  const handleAddMore = () => {
    setSubjectList([...subjectList, { subject: "", teacher: "" }]);
  };

  const handleAssign = () => {
    if (selectedClass && subjectList.length > 0) {
      const updatedClasses = classes.map((cls) =>
        cls.className === selectedClass
          ? { ...cls, subjects: [...cls.subjects, ...subjectList] }
          : cls
      );

      const classExists = classes.some(
        (cls) => cls.className === selectedClass
      );

      if (!classExists) {
        setClasses([
          ...classes,
          { className: selectedClass, subjects: subjectList },
        ]);
      } else {
        setClasses(updatedClasses);
      }

      // Reset state after assigning
      setSelectedClass("");
      setSubjectList([{ subject: "", teacher: "" }]);
    }
  };

  const handleRemove = (index) => {
    setSubjectList(subjectList.filter((_, i) => i !== index)); // Remove the selected subject and teacher input
  };

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = () => {
    setClasses(
      initialClasses.filter((cls) =>
        cls.className.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleRefresh = () => {
    setSearchTerm(""); // Clear the search term
    setSubjectList([{ subject: "", teacher: "" }]); // Reset the subjectList to its initial state
    
  };

  return (
    <div className="p-8 bg-pink-100 min-h-screen">
      <div className="flex gap-4 bg-white rounded-3xl p-2">
        <div className="flex items-center space-x-2">
          <FcSettings className="text-gray-700 " />
          <span className="text-gray-700 font-medium">Configuration</span>
        </div>

        <div className="border-l border-gray-700 h-6"></div>

        <div>
          <span className="text-gray-700 font-medium">Subjects</span>
        </div>

        <div className="border-l border-gray-700 h-6"></div>

        <div>
          <span className="text-gray-700 font-medium">Assign Subjects</span>
        </div>
      </div>

      <div className="flex flex-row justify-between gap-4">
        <div className="w-2/3 mt-10 flex flex-col bg-white shadow-md rounded-2xl items-center h-2/3">
          <h3 className="mb-8 text-2xl font-semibold flex mt-10">
            Assign Subjects to Class
          </h3>
          <div className="px-6">
            <select
              name="class"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="p-3 px-4 mb-4 rounded-3xl bg-white border border-blue-500 w-96"
            >
              <option value="" disabled>
                Select Class
              </option>
              <option value="Class Nursery">Class Nursery</option>
              <option value="Class LKG">Class LKG</option>
              <option value="Class UKG">Class UKG</option>
              <option value="Class 01">Class 01</option>
              <option value="Class 02">Class 02</option>
              <option value="Class 03">Class 03</option>
              <option value="Class 04">Class 04</option>
              <option value="Class 05">Class 05</option>
              <option value="Class 06">Class 06</option>
              <option value="Class 07">Class 07</option>
              <option value="Class 08">Class 08</option>
              <option value="Class 09">Class 09</option>
              <option value="Class 10">Class 10</option>
            </select>
            {subjectList.map((item, index) => (
              <div className="flex justify-between gap-4 mb-4" key={index}>
                <select
                  name="subject"
                  value={item.subject}
                  onChange={(e) => {
                    const newSubjectList = [...subjectList];
                    newSubjectList[index].subject = e.target.value;
                    setSubjectList(newSubjectList);
                  }}
                  className="p-3 px-4 rounded-3xl bg-white border border-blue-500 w-full"
                >
                  <option value="" disabled>
                    Select Subject
                  </option>
                  <option value="English">English</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="Social Studies">Social Studies</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Physical Education">Physical Education</option>
                  <option value="Art">Art</option>
                  <option value="Music">Music</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Foreign Language">Foreign Language</option>
                </select>
                <select
                  name="teacher"
                  value={item.teacher}
                  onChange={(e) => {
                    const newSubjectList = [...subjectList];
                    newSubjectList[index].teacher = e.target.value;
                    setSubjectList(newSubjectList);
                  }}
                  className="p-3 px-4 rounded-3xl bg-white border border-blue-500 w-full"
                >
                  <option value="" disabled>
                    Select Teacher
                  </option>
                  <option value="John Smith">John Smith</option>
                  <option value="Emily Johnson">Emily Johnson</option>
                  <option value="Michael Brown">Michael Brown</option>
                  <option value="Sarah Davis">Sarah Davis</option>
                  <option value="David Wilson">David Wilson</option>
                  <option value="Laura Garcia">Laura Garcia</option>
                  <option value="James Martinez">James Martinez</option>
                  <option value="Linda Rodriguez">Linda Rodriguez</option>
                  <option value="Robert Lee">Robert Lee</option>
                  <option value="Patricia Walker">Patricia Walker</option>
                </select>
              </div>
            ))}
          </div>
          <div className="flex justify-around gap-4">
            <button
              className="mt-10 bg-red-500 rounded-3xl text-white p-1 px-4 font-bold"
              onClick={() => handleRemove(index)}
            >
              Remove
            </button>
            <button
              className="mt-10 bg-blue-800 rounded-3xl text-white p-1 px-4 font-bold mb-"
              onClick={handleAddMore}
            >
              Add More
            </button>
          </div>

          <button
            className="mt-16 bg-pink-500 rounded-3xl text-white p-2 px-8 font-bold mb-16"
            onClick={handleAssign}
          >
            Assign
          </button>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex flex-row gap-4 py-10 justify-end">
            <div className=" ">
              <div className="flex items-center bg-white rounded-full ">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="py-2 text-gray-600 placeholder-gray-500 bg-transparent focus:outline-none ml-3"
                />
                <IoSearch
                  className="text-gray-600 mr-4 cursor-pointer"
                  size={24}
                  onClick={handleSearch}
                />
              </div>
            </div>
            <div
              className="border border-[#BCA8EA] p-2 bg-white rounded-full cursor-pointer transition-all duration-200 hover:bg-[#F3E8FF] hover:shadow-lg"
              onClick={handleRefresh}
            >
              <FiRefreshCcw className="text-gray-600 transition-transform duration-200 hover:rotate-180" />
            </div>
          </div>
          <ClassSubjects classes={classes} />
        </div>
      </div>
    </div>
  );
};

export default Classes;
