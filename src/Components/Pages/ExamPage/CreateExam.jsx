import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const CreateExam = () => {
  const [selectedClasses, setSelectedClasses] = useState({});
  const classesData = [
    {
      className: "Class 1",
      subjects: ["English", "Social Science", "Math"],
    },
    {
      className: "Class 2",
      subjects: ["English", "Social Science", "Math"],
    },
    {
      className: "Class 3",
      subjects: ["English", "Social Science", "Math"],
    },
    {
      className: "Class 4",
      subjects: ["English", "Social Science", "Math"],
    },
  ];

  const handleClassToggle = (className) => {
    setSelectedClasses((prev) => ({
      ...prev,
      [className]: !prev[className],
    }));
  };
  const handleSelectAllClasses = (isSelected) => {
    const allClassesSelected = {};
    classesData.forEach((classItem) => {
      allClassesSelected[classItem.className] = isSelected;
    });
    setSelectedClasses(allClassesSelected);
  };

  const isAllSelected = Object.values(selectedClasses).every(
    (isSelected) => isSelected
  );

  return (
    <div className="p-8 bg-pink-100 min-h-screen">
      <div className="flex gap-4  bg-white  rounded-3xl p-2 ">
        <div className="flex items-center space-x-2">
          <FaEdit className="text-gray-700 " />
          <span className="text-gray-700 font-medium">Exam </span>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">Create New Exam</span>
        </div>
      </div>

      <div className="pt-10 ">
        <h1 className="text-center font-bold text-2xl">Add New Examination</h1>

        <div className="flex flex-row pt-6 justify-around">
          <div className="space-y-6">
            <div className="flex flex-row gap-4">
              <span>
                <p className="text-center font-bold">Select Session</p>
                <select
                  name=""
                  id=""
                  className="p-2 bg-white rounded-full border border-gray-300"
                >
                  <option value="">2020-2021</option>
                  <option value="">2021-2022</option>
                  <option value="">2022-2023</option>
                  <option value="">2023-2024</option>
                </select>
              </span>
              <span>
                <p className="text-center font-bold">Starting Date</p>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="p-2 border border-gray-300 rounded-full"
                />
              </span>
              <span>
                <p className="text-center font-bold">Ending Date</p>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="p-2 border border-gray-300 rounded-full"
                />
              </span>
            </div>
            <div className="pt-8">
              <p className="text-center font-bold">Examination Name</p>
              <input
                type="text"
                className="p-2 rounded-full w-full border border-gray-300 flex justify-center items-center"
                placeholder="Name the exam"
              />
            </div>
            <div className="flex justify-center items-center pt-10">
              <button className="bg-pink-500 rounded-full p-2 px-6 border border-gray-300 ">
                Submit
              </button>
            </div>
          </div>

          <div className="w-1/3">
            <div className="bg-white py-4 rounded-lg shadow-xl">
              <h2 className="text-xl font-bold text-center">Classes</h2>
              <div className="mt-4 ">
                <div className="flex items-center justify-between p-2 bg-[#BCA8EA] px-4">
                  <span>Select All Class</span>
                  <input
                    type="checkbox"
                    onChange={(e) => handleSelectAllClasses(e.target.checked)}
                    checked={
                      isAllSelected && Object.keys(selectedClasses).length > 0
                    }
                  />
                </div>

                {classesData.map((classItem, index) => (
                  <div key={index} className="mb-2 ">
                    <div className="flex items-center justify-between p-2 border-b border-purple-200 px-4">
                      <span>{classItem.className}</span>
                      <input
                        type="checkbox"
                        onChange={() => handleClassToggle(classItem.className)}
                        checked={!!selectedClasses[classItem.className]}
                      />
                    </div>

                    {selectedClasses[classItem.className] && (
                      <div className="bg-[#E3D6FF] p-2">
                        {classItem.subjects.map((subject, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between mt-2 px-4"
                          >
                            <span>{subject}</span>
                            <div className=" flex justify-center items-center gap-2">
                              <button className="bg-white border border-gray-300 px-2 rounded-full">
                                Total Exam Mark
                              </button>
                              <button className="">
                                <RiDeleteBin6Line />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
