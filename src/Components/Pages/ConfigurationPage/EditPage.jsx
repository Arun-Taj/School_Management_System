import React, { useState } from "react";
import { FcSettings } from "react-icons/fc";

const EditPage = () => {
  const [subjects, setSubjects] = useState([{ subject: "", teacher: "" }]);

  const handleAddMore = () => {
    setSubjects([...subjects, { subject: "", teacher: "" }]);
  };

  const handleRemove = (index) => {
    const newSubjects = subjects.filter((_, subIndex) => subIndex !== index);
    setSubjects(newSubjects);
  };
  return (
    <div className="p-8 bg-pink-100 min-h-screen">
      <div className="flex gap-4  bg-white  rounded-3xl p-2 ">
        <div className="flex items-center space-x-2">
          <FcSettings className="text-gray-700 " />
          <span className="text-gray-700 font-medium">Configuration</span>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">Subjects</span>
        </div>
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">Assign Subjects</span>
        </div>
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">Edit</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center  mt-8">
        <div className="bg-white p-8 rounded-lg shadow-[4px_4px_4px_0px_#00000040] w-full max-w-md">
          <h2 className="text-center text-2xl font-bold mb-6">
            Update Subjects
          </h2>
          <input
            type="text"
            placeholder="Class 01"
            className="w-full border-2 border-purple-300 rounded-full py-2 px-4 mb-6 text-center focus:outline-none focus:border-purple-500"
          />

          {subjects.map((subject, index) => (
            <div key={index} className="flex justify-between mb-4">
              <select
                className="w-1/2 border-2 border-purple-300 rounded-full py-2 px-4 mr-2 focus:outline-none focus:border-purple-500 bg-white"
                value={subject.subject}
                onChange={(e) => {
                  const newSubjects = [...subjects];
                  newSubjects[index].subject = e.target.value;
                  setSubjects(newSubjects);
                }}
              >
                <option>Select Subject</option>
                <option>Math</option>
                <option>Science</option>
                <option>English</option>
              </select>
              <select
                className="w-1/2 border-2 border-purple-300 rounded-full py-2 px-4 ml-2 focus:outline-none focus:border-purple-500 bg-white"
                value={subject.teacher}
                onChange={(e) => {
                  const newSubjects = [...subjects];
                  newSubjects[index].teacher = e.target.value;
                  setSubjects(newSubjects);
                }}
              >
                <option>Select Teacher</option>
                <option>Teacher A</option>
                <option>Teacher B</option>
                <option>Teacher C</option>
              </select>
            </div>
          ))}

          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={handleAddMore}
              className="bg-blue-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Add More
            </button>
            <button
              onClick={() => handleRemove(subjects.length - 1)}
              className="bg-blue-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Remove
            </button>
          </div>

          <div className="flex justify-center">
            <button className="bg-pink-500 text-white py-2 px-8 rounded-full mt-12  focus:outline-none focus:ring-2 focus:ring-pink-600">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
