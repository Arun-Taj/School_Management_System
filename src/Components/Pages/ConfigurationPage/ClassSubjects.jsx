import React, {useContext} from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UpdateContext } from "../../../context/UpdateContext";

const ClassSubjects = ({ classes }) => {
  const navigate = useNavigate();

  const {updateState, setUpdateState} = useContext(UpdateContext);

  const subjectList = JSON.parse(localStorage.getItem("subjects_for_config"))


  const teacherList = JSON.parse(localStorage.getItem("teachers_for_config"))

  const getSubjectName = (subjectId) =>
    subjectList.find((subject) => subject.id === parseInt(subjectId))?.name;

  const getTeacherName = (teacherId) =>
    teacherList.find((teacher) => teacher.id === parseInt(teacherId))?.name;

  const editClick = (classId) => {
    // onUpdate( 1, updatedSubjects)
    const classDetails = classes.find((cls) => cls.id === classId);
   
    setUpdateState({
      classId: classDetails.id,
      className: classDetails.name,
      subjects: classDetails.subjects,
      classes
    })
    navigate(`/config/assignSubject/edit`);
  };

  return (
    <div className="py-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-center text-xl font-bold mb-4">
        Classes With Subjects
      </h2>
      <div className="h-96 overflow-y-auto">
        {classes.map((classItem, index) => (
          <div
            key={classItem.id}
            className={`w-full ${
              index % 2 === 0 ? "bg-[#BCA8EA]" : "bg-[#E3D6FF]"
            }`}
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex-1 flex flex-col justify-center items-center">
                <h3 className="text-lg font-bold">{classItem.name}</h3>
                <div className="w-1/4 h-0.5 bg-black mt-2"></div>
              </div>
              <button
                className="flex justify-end pr-2 text-gray-600"
                onClick={() => editClick(classItem.id)}
              >
                <FaEdit />
              </button>
            </div>
            <div className="grid grid-cols-3 px-2">
              {classItem.subjects.map((subject, subIndex) => (
                <div key={subIndex} className="p-2 text-center">
                  <p className="font-bold">
                    {getSubjectName(subject.subjectId)}
                  </p>
                  <p className="text-sm">{getTeacherName(subject.teacherId)}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassSubjects;
