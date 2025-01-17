import React, { useContext, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const UpdateMarks = () => {
  const navigate = useNavigate();

  const { api } = useContext(AuthContext);

  const [sessions, setSessions] = React.useState(null);
  const [selectedSession, setSelectedSession] = React.useState(null);

  const [exams, setExams] = React.useState(null);
  const [selectedExam, setSelectedExam] = React.useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get("/exam_sessions/");
        setSessions(response.data);
        setSelectedSession(response.data[0]);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };
    fetchSessions();
  }, [api]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await api.get(`/get_exams/${selectedSession.id}/`);
        setExams(response.data);
        setSelectedExam(response.data[0]);
        // console.log(response.data);
      } catch (error) {
        // alert("Exams not found");
        // console.error("Error fetching exams:", error);
      }
    };
    fetchExams();
  }, [api, selectedSession]);

  const handleSearchClick = () => {
    localStorage.setItem(
      "get_exams_classes_id",
      JSON.stringify(selectedExam.id)
    );
    navigate("/exam/search"); // Navigate to the edit page
  };

  return sessions && exams ? (
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
          <span className="text-gray-700 font-medium">
            Add/Update Exam Marks
          </span>
        </div>
      </div>

      <div className="flex flex-row justify-center pt-24">
        <span className=" text-center w-1/6">
          <p className="text-center font-bold">Select Session</p>
          <select
            name=""
            id=""
            value={selectedSession && selectedSession.id}
            onChange={(e) =>
              setSelectedSession(
                sessions.find((session) => session.id == e.target.value)
              )
            }
            className="p-2 bg-white rounded-full border border-gray-300 px-4 w-4/5"
          >
            {sessions.map((session) => (
              <option key={session.id} value={session.id}>
                {session.name}
              </option>
            ))}
          </select>
        </span>
        <span className=" text-center w-2/4">
          <p className="text-center font-bold">Select Exam</p>
          <select
            name=""
            id=""
            value={selectedExam?.id}
            onChange={(e) =>
              setSelectedExam(exams.find((exam) => exam.id == e.target.value))
            }
            className="p-2 bg-white rounded-full border border-gray-300 w-3/4 "
          >
            {exams.length > 0 ? (
              exams.map((exam) => (
                <option key={exam.id} value={exam.id}>
                  {exam.name}
                </option>
              ))
            ) : (
              <option>No exams found for this session</option>
            )}
          </select>
        </span>
      </div>
      <div className="flex flex-row gap-8 justify-center pt-24">
        <button
          type="button"
          className="bg-pink-500  p-2 px-8 rounded-full text-white"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default UpdateMarks;
