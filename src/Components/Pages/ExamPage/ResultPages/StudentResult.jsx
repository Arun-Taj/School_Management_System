import React, { useContext, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";

const StudentResult = () => {
  const navigate = useNavigate();

  const { api } = useContext(AuthContext);

  const [sessions, setSessions] = React.useState(null);
  const [selectedSession, setSelectedSession] = React.useState(null);

  const [exams, setExams] = React.useState(null);
  const [selectedExam, setSelectedExam] = React.useState(null);

  const [searchKey, setSearchKey] = React.useState("");

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

  const handleResultClick = () => {
    localStorage.setItem(
      "student_result_info",
      JSON.stringify({
        exam_id: selectedExam.id,
        search_key: searchKey,
      })
    );

    navigate("/exam/studentResult"); // Navigate to the edit page
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
          <span className="text-gray-700 font-medium">Result</span>
        </div>
        <div className="border-l border-gray-700 h-6"></div>
        <div>
          <span className="text-gray-700">Student Wise Result</span>
        </div>
      </div>

      <div className="felx flex-col ">
        <h1 className="text-center font-bold text-xl pt-10">
          Student Wise Result (Single)
        </h1>
        <div className="flex flex-row justify-center pt-8 gap-4">
          <span className=" text-center ">
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
              className="p-2 bg-white rounded-full border border-gray-300"
            >
              {sessions.map((session) => (
                <option key={session.id} value={session.id}>
                  {session.name}
                </option>
              ))}
            </select>
          </span>
          <span className=" text-center ">
            <p className="text-center font-bold">Select Exam</p>
            <select
              name=""
              id=""
              value={selectedExam?.id}
              onChange={(e) =>
                setSelectedExam(exams.find((exam) => exam.id == e.target.value))
              }
              className="p-2 bg-white rounded-full border border-gray-300  "
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
        <div className="flex flex-row gap-4 justify-center items-center py-10  ">
          <div className="w-96 ">
            <div className="flex items-center  bg-white rounded-full ">
              {/* Left Side: Three-Line Menu Icon */}
              <IoFilterSharp
                className="text-gray-600 ml-4 cursor-pointer"
                size={24}
              />

              {/* Vertical Line Divider */}
              <div className="w-px h-6 bg-gray-600 mx-4"></div>

              {/* Input Field */}
              <input
                type="text"
                placeholder="Search"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                className="flex-grow px-4 py-2 text-black placeholder-gray-500 bg-transparent focus:outline-none items-center text-center"
              />

              {/* Right Side: Search Icon */}
              <IoSearch
                className="text-gray-600 mr-4 cursor-pointer"
                size={24}
                onClick={handleResultClick}
              />
            </div>
          </div>
          {/* <div className="border border-[#BCA8EA] p-2 bg-white rounded-full">
            <FiRefreshCcw />
          </div> */}
        </div>
      </div>
      <div className="flex justify-center pt-8">
        <button
          type="button"
          className="bg-pink-500  p-2 px-8 rounded-full text-white"
          onClick={handleResultClick}
        >
          Search
        </button>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default StudentResult;
