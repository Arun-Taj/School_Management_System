import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const CreateExam = () => {
  const [selectedClasses, setSelectedClasses] = useState({});
  const [ExamDate, setExamDate] = useState({
    currentSession: "",
    startingDate: "",
    endingDate: "",
    examName: "",
  });

  const classesData = [
    
    {
      class: { id: 1, name: "Class 1" },
      subjects: [
        { id: 1, name: "English" },
        { id: 2, name: "Social Science" },
        { id: 3, name: "Math" },
      ],
    },
    {
      class: { id: 2, name: "Class 2" },
      subjects: [
        { id: 4, name: "English" },
        { id: 5, name: "Science" },
        { id: 6, name: "Math" },
        { id: 7, name: "Computer" },
      ],
    },
    {
      class: { id: 3, name: "Class 3" },
      subjects: [
        { id: 8, name: "English" },
        { id: 9, name: "Social Science" },
        { id: 10, name: "Math" },
        { id: 11, name: "Science" },
        { id: 12, name: "Arts" },
      ],
    },
  ];

  const handleClassToggle = (classId) => {
    setSelectedClasses((prev) => ({
      ...prev,
      [classId]: prev[classId]
        ? undefined
        : classesData
            .find((cls) => cls.class.id === classId)
            .subjects.reduce((acc, subject) => ({ ...acc, [subject.id]: "" }), {}),
    }));
  };

  const handleSelectAllClasses = (isSelected) => {
    const allClassesSelected = {};
    classesData.forEach((classItem) => {
      allClassesSelected[classItem.class.id] = isSelected
        ? classItem.subjects.reduce((acc, subject) => ({ ...acc, [subject.id]: "" }), {})
        : undefined;
    });
    setSelectedClasses(allClassesSelected);
  };

  const isAllSelected = Object.values(selectedClasses).every(
    (isSelected) => isSelected
  );

  const handleMarksChange = (classId, subjectId, value,type) => {
    setSelectedClasses((prev) => ({
      ...prev,
      [classId]: {
        ...prev[classId],
        [subjectId]: {
          ...prev[classId][subjectId],
          [type]:value, 
        },
      },
    }));
  };

    const handleSessionChange = (session) => {
      const [startYear, endYear] = session.split("-").map(Number);

      setExamDate((prev) => ({
        ...prev,
        currentSession: session,
        startingDate: `${startYear}-01-01`,
        endingDate: `${endYear}-12-31`,
      }));
    };

  const handleStartingDateChange = (date) => {
    setExamDate((prev) => ({
      ...prev,
      startingDate: date,
    }));
  };

  const handleEndingDateChange = (date) => {
    setExamDate((prev) => ({
      ...prev,
      endingDate: date,
    }));
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const session = `${currentYear}-${currentYear + 1}`;
    handleSessionChange(session);
  }, []);

  const handleCreateExam = () => {
    const userConfirmed = window.confirm(
      "Are you sure want to create this new exam? Are all details correct?"
    );

    if (userConfirmed) {
      // Prepare the payload
      const payload = {
        ...ExamDate,
        classes: Object.entries(selectedClasses)
          .filter(([_, subjects]) => subjects)
          .map(([classId, subjects]) => ({
            classId,
            subjects: Object.entries(subjects).map(([subjectId,marks]) => ({
              subjectId,
              totalMarks: marks?.totalMarks,
              passMarks: marks?.passMarks,
            })),
          })),
      };

      // Simulate sending data to the database
      console.log("Exam created with data:", payload);

      alert("Exam created successfully!");
      // Reset the selected classes and exam data
    setSelectedClasses({});
     // Calculate the default session based on the current year
     const currentYear = new Date().getFullYear();
     const defaultSession = `${currentYear}-${currentYear + 1}`;
     const defaultStartingDate = `${currentYear}-01-01`;
     const defaultEndingDate = `${currentYear + 1}-12-31`;
    setExamDate({
      currentSession: defaultSession, // Reset session to default
      startingDate: defaultStartingDate, // Reset starting date to default
      endingDate: defaultEndingDate, // Reset ending date to default
      examName: "", // Reset exam name
    });
    } else {
      alert("Exam creation cancelled.");
    }
  };
  const handleDeleteSubject = (classId, subjectId) => {
    setSelectedClasses((prev) => {
      // Clone the current class subjects to modify them
      const updatedSubjects = { ...prev[classId] };
  
      // Remove the specific subject
      delete updatedSubjects[subjectId];
  
      // If no subjects remain in the class, remove the class; otherwise, update it
      return {
        ...prev,
        [classId]: Object.keys(updatedSubjects).length > 0 ? updatedSubjects : undefined,
      };
    });
  };
  
  
  return (
    <div className="p-8 bg-pink-100 min-h-screen">
      <div className="flex gap-4 bg-white rounded-3xl p-2">
        <div className="flex items-center space-x-2">
          <FaEdit className="text-gray-700 " />
          <span className="text-gray-700 font-medium">Exam </span>
        </div>
        <div className="border-l border-gray-700 h-6"></div>
        <div>
          <span className="text-gray-700 font-medium">Create New Exam</span>
        </div>
      </div>

      <div className="pt-10">
        <h1 className="text-center font-bold text-2xl">Add New Examination</h1>
        <div className="flex flex-row pt-6 justify-around">
          <div className="space-y-6">
            <div className="flex flex-row gap-4">
              <span>
                <p className="text-center font-bold">Select Session</p>
                <select
                  value={ExamDate.currentSession}
                  onChange={(e) => handleSessionChange(e.target.value)}
                  className="p-2 bg-white rounded-full border border-gray-300"
                >
                  <option value="2020-2021">2020-2021</option>
                  <option value="2021-2022">2021-2022</option>
                  <option value="2022-2023">2022-2023</option>
                  <option value="2023-2024">2023-2024</option>
                  <option value="2024-2025">2024-2025</option>
                  <option value="2025-2026">2025-2026</option>
                  <option value="2026-2027">2026-2027</option>
                </select>
              </span>
              <span>
                <p className="text-center font-bold">Starting Date</p>
                <input
                  type="date"
                  value={ExamDate.startingDate}
                  min={`${ExamDate.currentSession.split("-")[0]}-01-01`}
                  max={`${ExamDate.currentSession.split("-")[0]}-12-31`}
                  onChange={(e) => handleStartingDateChange(e.target.value)}
                  className="p-2 border border-gray-300 rounded-full"
                />
              </span>
              <span>
                <p className="text-center font-bold">Ending Date</p>
                <input
                  type="date"
                  value={ExamDate.endingDate}
                  min={`${ExamDate.currentSession.split("-")[1]}-01-01`}
                  max={`${ExamDate.currentSession.split("-")[1]}-12-31`}
                  onChange={(e) => handleEndingDateChange(e.target.value)}
                  className="p-2 border border-gray-300 rounded-full"
                />
              </span>
            </div>
            <div className="pt-8">
              <p className="text-center font-bold">Examination Name</p>
              <input
                type="text"
                value={ExamDate.examName}
                onChange={(e) =>
                  setExamDate((prev) => ({
                    ...prev,
                    examName: e.target.value,
                  }))
                }
                className="p-2 rounded-full w-full border border-gray-300"
                placeholder="Name the exam"
              />
            </div>
            <div className="flex justify-center items-center pt-10">
              <button
                onClick={handleCreateExam}
                className="bg-pink-500 rounded-full p-2 px-6 border border-gray-300 font-bold"
              >
                Create
              </button>
            </div>
          </div>
          <div className="w-fit ">
            <div className="bg-white py-4 rounded-lg shadow-xl">
              <h2 className="text-xl font-bold text-center">Classes</h2>
              <div className="mt-4">
                <div className="flex items-center justify-between p-2 bg-[#BCA8EA] px-4">
                  <span>Select All Class</span>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleSelectAllClasses(e.target.checked)
                    }
                    checked={
                      isAllSelected &&
                      Object.keys(selectedClasses).length > 0
                    }
                  />
                </div>

                {classesData.map((classItem, index) => (
                  <div key={classItem.class.id} className="mb-2 ">
                    <div className="flex items-center justify-between p-2 border-b border-purple-200 px-4">
                      <span>{classItem.class.name}</span>
                      <input
                        type="checkbox"
                        onChange={() => handleClassToggle(classItem.class.id)}
                        checked={!!selectedClasses[classItem.class.id]}
                      />
                    </div>

                    {selectedClasses[classItem.class.id] && (
                      <div className="bg-[#E3D6FF] p-2">
                        {classItem.subjects.map((subject, idx) => (
                          <div
                          key={subject.id}
                            className="flex items-center justify-between p-1"
                          >
                            <span>{subject.name}</span>
                            <div className="flex gap-2 pl-3">

                            
                            <input
                              type="number"
                              min="0"
                              placeholder="Total Marks"
                              onChange={(e) =>
                                handleMarksChange(
                                  classItem.class.id,
                                  subject.id,
                                  e.target.value,
                                  "totalMarks"
                                )
                              }
                              value={
                                selectedClasses[classItem.class.id]?.[subject.id]
                                    ?.totalMarks || ""
                              }
                              className="bg-white border border-gray-300 px-2 rounded-full w-24"
                            />
                            <input
                              type="number"
                              min="0"
                              placeholder="Pass Marks"
                              onChange={(e) =>
                                handleMarksChange(
                                  classItem.class.id,
                                  subject.id,
                                  e.target.value,
                                  "passMarks"
                                )
                              }
                              value={
                                selectedClasses[classItem.class.id]?.[subject.id]
                                    ?.passMarks || ""
                              }
                              className="bg-white border border-gray-300 px-2 rounded-full w-24"
                            />
                            <button
                            onClick={() =>
                              handleDeleteSubject(classItem.class.id, subject.id)
                            }
                            className="hover:text-red-700"
                          >
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
