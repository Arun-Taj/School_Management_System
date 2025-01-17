import React, { useState, useEffect, useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import {AuthContext} from '../../../context/AuthContext';
import axios from "axios";
import { parse } from "date-fns";

const CreateExam = () => {
  const [selectedClasses, setSelectedClasses] = useState({});
  const currentYear = new Date().getFullYear();

  const [ExamDate, setExamDate] = useState({
    currentSession: "",
    currentSessionName: "",
    startingDate: `${currentYear}-01-01`,
    endingDate: `${currentYear}-12-31`,
    examName: "",
  });

  const {api}  = useContext(AuthContext)
  const [examSessions, setExamSessions] = useState([]);
  const [defaultExamDate, setDefaultExamDate] = useState({});


  
  const [classesData, setClassesData] = useState([]);

  useEffect(() => {
    const loadExamSessionsFromServer = async () => {
      try {
        const response = await api.get('exam_sessions/')
        // console.log(response.data);
        setExamSessions(response.data);
        
        setExamDate((prev) => ({
          ...prev,
          currentSession: response.data[0].id,
          currentSessionName: response.data[0].name
        }))

        setDefaultExamDate(ExamDate);
        
      } catch (error) {
        console.error('Error loading exam sessions:', error);
      }
    }
    loadExamSessionsFromServer();

    const loadClassesSubjectsFromServer = async () => {
      try {
        const response = await api.get('/get_class_subjects/')
        // console.log(response.data);
        setClassesData(response.data);
      } catch (error) {
        console.error('Error loading classes and subjects:', error);
      }
    }
    loadClassesSubjectsFromServer();


  }, [api]);


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

  const handleSessionChange = (session_id) => {
    
    const session_name = examSessions.find((session) => session.id == session_id).name;
    
    const [startYear, endYear] = session_name.split("-").map(Number);

    setExamDate((prev) => ({
      ...prev,
      currentSession: parseInt(session_id) ,
      currentSessionName: session_name,
      startingDate: `${startYear}-01-01`,
      endingDate: `${endYear}-12-31`,
    }));
  };

  const handleStartingDateChange = (date) => {
    console.log("changing starting date", date);
    
    setExamDate((prev) => ({
      ...prev,
      startingDate: date,
    }));
  };

  const handleEndingDateChange = (date) => {
    console.log("changing ending date", date);
    setExamDate((prev) => ({
      ...prev,
      endingDate: date,
    }));
  };

 
  const handleCreateExam = () => {
    // Check if exam name is empty
    if (ExamDate.examName.trim() === "") {
      alert("Please enter a name for the exam.");
      return;
    }
  
    // Check if any classes are selected
    if (Object.keys(selectedClasses).length === 0) {
      alert("Please select at least one class.");
      return;
    }
  
    const userConfirmed = window.confirm(
      "Are you sure want to create this new exam? Are all details correct?"
    );
  
    if (userConfirmed) {
      const payload = {
        ...ExamDate,
        classes: Object.entries(selectedClasses)
          .filter(([_, subjects]) => subjects)
          .map(([classId, subjects]) => {
            // Validate that each subject has totalMarks and passMarks
            const subjectsWithValidation = Object.entries(subjects).map(
              ([subjectId, marks]) => {
                // Check if totalMarks or passMarks are undefined
                if (marks?.totalMarks === undefined || marks?.passMarks === undefined) {
                  alert(`Total Marks or Pass Marks are missing for Subject ID: ${subjectId}`);
                  return null; // return null to skip this subject
                }
  
                return {
                  subjectId: parseInt(subjectId),
                  totalMarks: marks.totalMarks,
                  passMarks: marks.passMarks,
                };
              }
            ).filter(subject => subject !== null); // Remove null subjects
  
            // If no subjects are valid, alert and return early to stop further processing
            if (subjectsWithValidation.length === 0) {
              alert("No valid subjects found in this class.");
              return null; // return null to skip this class
            }
  
            return {
              classId: parseInt(classId),
              subjects: subjectsWithValidation,
            };
          })
          .filter(classData => classData !== null), // Remove null classes
      };
  
      // If payload is invalid (null classes or subjects), stop execution
      if (payload.classes.length === 0) {
        return; // Early return if no valid classes
      }
  
      // Simulate sending data to the database
      console.log("Payload:", payload);



      const configureExamPapers = async () => {
        try {
          const response = await api.post('configure_exam_papers/', payload);
          // console.log(response.data.message);
          alert(response.data.message);
        } catch (error) {
          alert('Failed to configure exam.');
        }
      }

      configureExamPapers();
  
      // Reset the exam date to default after successful submission
      setExamDate(defaultExamDate);
    } else {
      alert("Exam creation cancelled.");
    }
  };
  

  const handleDeleteSubject = (classId, subjectId) => {
  
    classesData.forEach((classItem) => {
      if (classItem.class.id === classId) {
        classItem.subjects = classItem.subjects.filter(
          (subject) => subject.id !== subjectId
        );
      }

    }
    );
    console.log(classesData);
    setClassesData([...classesData]);
  };
  
  
  return examSessions && (
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
                  onChange={(e) => handleSessionChange(e.currentTarget.value)}
                  className="p-2 bg-white rounded-full border border-gray-300"
                >
                  {
                   examSessions && examSessions.map((session) => (
                    <option key={session.id} value={session.id}>{session.name}</option>
                   ))
                  }
                  
                </select>
              </span>
              <span>
                <p className="text-center font-bold">Starting Date</p>
                <input
                  type="date"
                  value={ExamDate.startingDate}
                  // min={`${ExamDate.currentSessionName.split("-")[0]}-01-01`}
                  // max={`${ExamDate.currentSessionName.split("-")[0]}-12-31`}
                  onChange={(e) => handleStartingDateChange(e.currentTarget.value)}
                  className="p-2 border border-gray-300 rounded-full"
                />
              </span>
              <span>
                <p className="text-center font-bold">Ending Date</p>
                <input
                  type="date"
                  value={ExamDate.endingDate}
                  // min={`${ExamDate.currentSessionName.split("-")[1]}-01-01`}
                  // max={`${ExamDate.currentSessionName.split("-")[1]}-12-31`}
                  onChange={(e) => handleEndingDateChange(e.currentTarget.value)}
                  className="p-2 border border-gray-300 rounded-full"
                />
              </span>
            </div>
            <div className="pt-8">
              <p className="text-center font-bold">Examination Name</p>
              <input
                type="text"
                value={ExamDate.examName}
                onChange={(e) =>{
                 
                  setExamDate((prev) => ({
                    ...prev,
                    examName: e.target.value,
                  }))
                }}
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
