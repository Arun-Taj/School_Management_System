import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FcSettings } from "react-icons/fc";
import { UpdateContext } from "../../../context/UpdateContext";
import { sub } from "date-fns";

const EditPage = () => {
  const { updateState, onUpdate } = useContext(UpdateContext);
  const navigate = useNavigate();




  const subjectList = JSON.parse(localStorage.getItem("subjects_for_config"))


  const teacherList = JSON.parse(localStorage.getItem("teachers_for_config"))

  const [subjects, setSubjects] = useState(updateState.subjects || []);

  const handleAddMore = () => {
    setSubjects([...subjects, { subjectId: "", teacherId: "" }]);
  };

  const handleRemove = (index) => {
    // console.log("removing", subjects[index]);

    const newSubjects = subjects.filter((_, subIndex) => subIndex !== index);
    setSubjects(newSubjects);
  };

  const handleUpdate = () => {
    if (onUpdate) {
      // console.log(subjects);

      onUpdate(updateState.classId, subjects);
    }
    navigate(-1); // Navigate back
  };

  const selectedSubjectIds = subjects.map((subject) => subject.subjectId);

  return (
    <div className="p-8 bg-pink-100 min-h-screen">
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
        <div className="border-l border-gray-700 h-6"></div>
        <div>
          <span className="text-gray-700 font-medium">Edit</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-8">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-center text-2xl font-bold mb-6">Update Subjects</h2>

          <select
            value={updateState.classId}
            disabled
            className="p-3 px-4 mb-4 rounded-3xl bg-gray-200 border border-blue-500 w-96"
          >
            <option value={updateState.classId}>{updateState.className}</option>
          </select>

          {subjects.map((subject, index) => (
            <div key={index} className="flex justify-between mb-4">
              <select
                className="w-1/2 border-2 border-purple-300 rounded-full py-2 px-4 mr-2 bg-white"
                value={subject.subjectId || ""}
                onChange={(e) => {
                  const newSubjects = [...subjects];
                  newSubjects[index].subjectId = parseInt(e.target.value, 10);
                  setSubjects(newSubjects);
                }}
              >
                <option value="">Select Subject</option>
                {subjectList
                  .filter(
                    (sub) =>
                      !selectedSubjectIds.includes(sub.id) || sub.id === subject.subjectId
                  )
                  .map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
              </select>

              <select
                className="w-1/2 border-2 border-purple-300 rounded-full py-2 px-4 bg-white"
                value={subject.teacherId || ""}
                onChange={(e) => {
                  const newSubjects = [...subjects];
                  newSubjects[index].teacherId = parseInt(e.target.value, 10);
                  setSubjects(newSubjects);
                }}
              >
                <option value="">Select Teacher</option>
                {teacherList.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>

              <button
                onClick={() => handleRemove(index)}
                className="text-red-500 ml-2"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex gap-4 justify-center mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={handleAddMore}
            >
              Add More
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
