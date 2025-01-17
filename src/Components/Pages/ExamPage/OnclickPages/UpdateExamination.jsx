import React, { useState, useEffect, useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AuthContext } from "../../../../context/AuthContext";
import axios from "axios";
import { parse, set } from "date-fns";
import { get } from "react-hook-form";

const Edit = () => {
  const [selectedClasses, setSelectedClasses] = useState({});
  const currentYear = new Date().getFullYear();
  const selectedExamId = localStorage.getItem("selectedExamId");
  const [orgData, setOrgData] = useState(null);

  const [ExamDate, setExamDate] = useState({
    currentSession: "",
    currentSessionName: "",
    startingDate: `${currentYear}-01-01`,
    endingDate: `${currentYear}-12-31`,
    examName: "",
  });

  const { api } = useContext(AuthContext);
  const [examSessions, setExamSessions] = useState(null);
  const [defaultExamDate, setDefaultExamDate] = useState({});

  useEffect(() => {
    const loadExamSessionsFromServer = async () => {
      try {
        const response = await api.get("exam_sessions/");
        // console.log(response.data);
        setExamSessions(response.data);

        setExamDate((prev) => ({
          ...prev,
          currentSession: response.data[0].id,
          currentSessionName: response.data[0].name,
        }));

        setDefaultExamDate(ExamDate);
      } catch (error) {
        console.error("Error loading exam sessions:", error);
      }
    };
    loadExamSessionsFromServer();

    const getPrevExamData = async () => {
      try {
        const response = await api.get(`/get_exam_papers/${selectedExamId}/`);
        console.log(response.data);
        setOrgData(response.data);
      } catch (error) {
        console.error("Error fetching previous exam data:", error);
      }
    };
    getPrevExamData();
  }, [api]);

  const handleMarksChange = (markType, exam_paper_id, value) => {
    // Make a copy of the current state to avoid direct mutation
    const updatedOrgData = { ...orgData };

    // Loop through each class in the exam_papers
    for (const className in updatedOrgData.exam_papers) {
      // Find the paper by its exam_paper_id
      const paperIndex = updatedOrgData.exam_papers[className].findIndex(
        (paper) => paper.exam_paper_id === exam_paper_id
      );

      // If the paper is found, update the corresponding mark (total_marks or pass_marks)
      if (paperIndex !== -1) {
        updatedOrgData.exam_papers[className][paperIndex][markType] = value;
      }
    }

    // Update the state with the modified data
    setOrgData(updatedOrgData);
  };

  const handleSessionChange = (session_id) => {
    const session_name = examSessions.find(
      (session) => session.id == session_id
    ).name;

    const [startYear, endYear] = session_name.split("-").map(Number);

    setOrgData((prev) => ({
      ...prev,
      session: { id: parseInt(session_id), name: session_name },
    }));

    setExamDate((prev) => ({
      ...prev,
      currentSession: parseInt(session_id),
      currentSessionName: session_name,
      startingDate: `${startYear}-01-01`,
      endingDate: `${endYear}-12-31`,
    }));
  };

  const handleStartingDateChange = (date) => {
    console.log("changing starting date", date);

    setOrgData((prev) => ({
      ...prev,
      start_date: date,
    }));

    setExamDate((prev) => ({
      ...prev,
      startingDate: date,
    }));
  };

  const handleEndingDateChange = (date) => {
    console.log("changing ending date", date);

    setOrgData((prev) => ({
      ...prev,
      end_date: date,
    }));

    setExamDate((prev) => ({
      ...prev,
      endingDate: date,
    }));
  };

  const handleUpdateExam = () => {
    // console.log(orgData);
    const sendUpdatedDataToServer = async () => {
      try {
        const response = await api.post("/update_exam_papers/", orgData);
        // console.log(response.message);
        alert(response.data.message);
      } catch (error) {
        console.error("Error updating exam data:", error);
      }
    };

    sendUpdatedDataToServer();
  };

  const handleDeletePaper = (exam_paper_id) => {
    // Create a copy of the current state (orgData)
    const updatedOrgData = { ...orgData };

    // Loop through each class in the exam_papers
    for (const className in updatedOrgData.exam_papers) {
      // Filter the papers for the class and remove the one with the matching exam_paper_id
      updatedOrgData.exam_papers[className] = updatedOrgData.exam_papers[
        className
      ].filter((paper) => paper.exam_paper_id !== exam_paper_id);

      // If the class has no papers left, delete the class from the exam_papers object
      if (updatedOrgData.exam_papers[className].length === 0) {
        delete updatedOrgData.exam_papers[className];
      }
    }

    const deleteExamPaperFromDB = async () => {
      try {
        const response = await api.delete(
          `/delete_exam_paper/${exam_paper_id}/`
        );
        response.status === 204 && alert("Exam paper deleted successfully");
      } catch (error) {
        // console.error("Error deleting exam paper:", error);
        alert("Failed to delete exam paper");
      }
    };

    // Update the state with the modified data
    setOrgData(updatedOrgData);
    deleteExamPaperFromDB();
  };

  return examSessions && orgData ? (
    <div className="p-8 bg-pink-100 min-h-screen">
      <div className="flex gap-4 bg-white rounded-3xl p-2">
        <div className="flex items-center space-x-2">
          <FaEdit className="text-gray-700 " />
          <span className="text-gray-700 font-medium">Exam </span>
        </div>
        <div className="border-l border-gray-700 h-6"></div>
        <div>
          <span className="text-gray-700 font-medium">Update Exam</span>
        </div>
      </div>

      <div className="pt-10">
        <h1 className="text-center font-bold text-2xl">Update Examination</h1>
        <div className="flex flex-row pt-6 justify-around">
          <div className="space-y-6">
            <div className="flex flex-row gap-4">
              <span>
                <p className="text-center font-bold">Select Session</p>
                <select
                  value={orgData.session.id}
                  onChange={(e) => handleSessionChange(e.currentTarget.value)}
                  className="p-2 bg-white rounded-full border border-gray-300"
                >
                  {examSessions &&
                    examSessions.map((session) => (
                      <option key={session.id} value={session.id}>
                        {session.name}
                      </option>
                    ))}
                </select>
              </span>
              <span>
                <p className="text-center font-bold">Starting Date </p>
                <input
                  type="date"
                  value={orgData.start_date}
                  // min={`${ExamDate.currentSessionName.split("-")[0]}-01-01`}
                  // max={`${ExamDate.currentSessionName.split("-")[0]}-12-31`}
                  onChange={(e) =>
                    handleStartingDateChange(e.currentTarget.value)
                  }
                  className="p-2 border border-gray-300 rounded-full"
                />
              </span>
              <span>
                <p className="text-center font-bold">Ending Date</p>
                <input
                  type="date"
                  value={orgData.end_date}
                  // min={`${ExamDate.currentSessionName.split("-")[1]}-01-01`}
                  // max={`${ExamDate.currentSessionName.split("-")[1]}-12-31`}
                  onChange={(e) =>
                    handleEndingDateChange(e.currentTarget.value)
                  }
                  className="p-2 border border-gray-300 rounded-full"
                />
              </span>
            </div>
            <div className="pt-8">
              <p className="text-center font-bold">Examination Name</p>
              <input
                type="text"
                value={orgData.exam_name}
                onChange={(e) => {
                  setOrgData((prev) => ({
                    ...prev,
                    exam_name: e.target.value,
                  }));
                }}
                className="p-2 rounded-full w-full border border-gray-300"
                placeholder="Name the exam"
              />
            </div>
            <div className="flex justify-center items-center pt-10">
              <button
                onClick={handleUpdateExam}
                className="bg-pink-500 rounded-full p-2 px-6 border border-gray-300 font-bold"
              >
                Update
              </button>
            </div>
          </div>
          <div className="w-fit ">
            <div className="bg-white py-4 rounded-lg shadow-xl">
              <h2 className="text-xl font-bold text-center">Classes</h2>
              <div className="mt-4">
                {orgData &&
                  Object.entries(orgData.exam_papers).map(
                    ([class_name, papers]) => (
                      <div key={class_name} className="mb-2">
                        <div className="flex items-center justify-between p-2 border-b border-purple-200 px-4">
                          <span>{class_name}</span>
                        </div>

                        <div className="bg-[#E3D6FF] p-2">
                          {papers.map((paper, idx) => (
                            <div
                              key={paper.exam_paper_id}
                              className="flex items-center justify-between p-1"
                            >
                              <span>{paper.subject_name}</span>
                              <div className="flex gap-2 pl-3">
                                <input
                                  type="number"
                                  min="0"
                                  value={paper.total_marks}
                                  placeholder="Total Marks"
                                  onChange={(e) =>
                                    handleMarksChange(
                                      "total_marks",
                                      paper.exam_paper_id,
                                      e.target.value
                                    )
                                  }
                                  className="bg-white border border-gray-300 px-2 rounded-full w-24"
                                />
                                <input
                                  type="number"
                                  min="0"
                                  placeholder="Pass Marks"
                                  value={paper.pass_marks}
                                  onChange={(e) =>
                                    handleMarksChange(
                                      "pass_marks",
                                      paper.exam_paper_id,
                                      e.target.value
                                    )
                                  }
                                  className="bg-white border border-gray-300 px-2 rounded-full w-24"
                                />
                                <button
                                  onClick={() =>
                                    handleDeletePaper(paper.exam_paper_id)
                                  }
                                  className="hover:text-red-700"
                                >
                                  <RiDeleteBin6Line />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>loading...</div>
  );
};

export default Edit;
