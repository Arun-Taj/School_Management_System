import React, { useState, useEffect } from "react";
import { FcSettings } from "react-icons/fc";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import ClassSubjects from "./ClassSubjects";

const Classes = () => {
  const classList = [
    { id: 1, name: "Class Nursery" },
    { id: 2, name: "Class LKG" },
    { id: 3, name: "Class UKG" },
    { id: 4, name: "Class 01" },
    { id: 5, name: "Class 02" },
    { id: 6, name: "Class 03" },
    { id: 7, name: "Class 04" },
    { id: 8, name: "Class 05" },
    { id: 9, name: "Class 06" },
    { id: 10, name: "Class 07" },
    { id: 11, name: "Class 08" },
    { id: 12, name: "Class 09" },
    { id: 13, name: "Class 10" },
  ];

  const subjectList = [
    { id: 1, name: "English" },
    { id: 2, name: "Mathematics" },
    { id: 3, name: "Science" },
    { id: 4, name: "Social Studies" },
    { id: 5, name: "Hindi" },
    { id: 6, name: "Computer Science" },
    { id: 7, name: "Physics" },
    { id: 8, name: "Chemistry" },
    { id: 9, name: "Biology" },
    { id: 10, name: "Geography" },
    { id: 11, name: "History" },
    { id: 12, name: "Economics" },
    { id: 13, name: "Physical Education" },
  ];

  const teacherList = [
    { id: 1, name: "John Smith" },
    { id: 2, name: "Emily Johnson" },
    { id: 3, name: "Michael Brown" },
    { id: 4, name: "Sarah Davis" },
    { id: 5, name: "David Wilson" },
    { id: 6, name: "Anna Taylor" },
    { id: 7, name: "James Anderson" },
    { id: 8, name: "Sophia Martinez" },
    { id: 9, name: "William Hernandez" },
    { id: 10, name: "Olivia Moore" },
    { id: 11, name: "Lucas Martin" },
    { id: 12, name: "Amelia Garcia" },
    { id: 13, name: "Benjamin Lee" },
  ];

  const [selectedClassId, setSelectedClassId] = useState("");
  const [assignedSubjects, setAssignedSubjects] = useState([
    { subjectId: "", teacherId: "" },
  ]);
  const [classes, setClasses] = useState(
    localStorage.getItem("classes")
      ? JSON.parse(localStorage.getItem("classes"))
      : []
  );
  useEffect(() => {
    const loadClasses = () => {
      const savedClasses = localStorage.getItem("classes");
      return savedClasses ? JSON.parse(savedClasses) : [];
    };
    setClasses(loadClasses());
  }, []);
  //const [updated,setUpdated]=useState(false)
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("classes", JSON.stringify(classes));
  }, [classes]);

  const handleAddMore = () => {
    setAssignedSubjects([
      ...assignedSubjects,
      { subjectId: "", teacherId: "" },
    ]);
  };

  const handleAssign = () => {
    if (selectedClassId && assignedSubjects.length > 0) {
      const classExists = classes.some(
        (cls) => cls.id === parseInt(selectedClassId)
      );

      if (classExists) {
        const updatedClasses = classes.map((cls) =>
          cls.id === parseInt(selectedClassId)
            ? { ...cls, subjects: [...cls.subjects, ...assignedSubjects] }
            : cls
        );
        setClasses(updatedClasses);
      } else {
        const selectedClassName = classList.find(
          (cls) => cls.id === parseInt(selectedClassId)
        )?.name;
        setClasses([
          ...classes,
          {
            id: parseInt(selectedClassId),
            name: selectedClassName,
            subjects: assignedSubjects,
          },
        ]);
      }

      setSelectedClassId("");
      setAssignedSubjects([{ subjectId: "", teacherId: "" }]);
    }
  };

  const handleRemove = (index) => {
    setAssignedSubjects(assignedSubjects.filter((_, i) => i !== index));
  };

  const handleSearch = () => {
    const filteredClasses = classes.filter((cls) =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setClasses(filteredClasses);
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setClasses(JSON.parse(localStorage.getItem("classes")) || []);
  };
 const handleUpdateSubjects = (classId, updatedSubjects) => {
    setClasses((prevClasses) =>
      prevClasses.map((cls) =>
        cls.id === classId ? { ...cls, subjects: updatedSubjects } : cls
      )
    );
  };

  return (
    <div className="p-8 bg-pink-100 min-h-screen">
      {/* Header */}
      <div className="flex gap-4 bg-white rounded-3xl p-2">
        <div className="flex items-center space-x-2">
          <FcSettings className="text-gray-700" />
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

      <div className="flex flex-row justify-between gap-4 mt-10">
        {/* Assign Subjects */}
        <div className="w-2/3 flex flex-col bg-white shadow-md rounded-2xl items-center h-2/3">
          <h3 className="text-2xl font-semibold mt-10">
            Assign Subjects to Class
          </h3>
          <div className="px-6">
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="p-3 px-4 mb-4 rounded-3xl bg-white border border-blue-500 w-96"
            >
              <option value="" disabled>
                Select Class
              </option>
              {classList.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>

            {assignedSubjects.map((item, index) => (
              <div key={index} className="flex justify-between gap-4 mb-4">
                <select
                  value={item.subjectId}
                  onChange={(e) => {
                    const updatedSubjects = [...assignedSubjects];
                    updatedSubjects[index].subjectId = e.target.value;
                    setAssignedSubjects(updatedSubjects);
                  }}
                  className="p-3 px-4 rounded-3xl bg-white border border-blue-500 w-full"
                >
                  <option value="" disabled>
                    Select Subject
                  </option>
                  {subjectList.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
                <select
                  value={item.teacherId}
                  onChange={(e) => {
                    const updatedSubjects = [...assignedSubjects];
                    updatedSubjects[index].teacherId = e.target.value;
                    setAssignedSubjects(updatedSubjects);
                  }}
                  className="p-3 px-4 rounded-3xl bg-white border border-blue-500 w-full"
                >
                  <option value="" disabled>
                    Select Teacher
                  </option>
                  {teacherList.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="flex justify-around gap-4">
            <button
              className="mt-10 bg-red-500 rounded-3xl text-white p-1 px-4 font-bold"
              onClick={() => handleRemove(assignedSubjects.length - 1)}
            >
              Remove
            </button>
            <button
              className="mt-10 bg-blue-800 rounded-3xl text-white p-1 px-4 font-bold"
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

        {/* Class Subjects */}
        <div className="w-3/4">
          <div className="flex flex-row gap-4 py-4 justify-end">
            <div>
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
          {/* <ClassSubjects classes={classes} onUpdate={handleUpdateSubjects} /> */}
          <ClassSubjects classes={classes} />
        </div>
      </div>
    </div>
  );
};

export default Classes;
