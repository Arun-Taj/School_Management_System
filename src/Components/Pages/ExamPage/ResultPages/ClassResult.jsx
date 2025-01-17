import React, { useContext, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";

const ClassResult = () => {
  const navigate = useNavigate();

  const { api } = useContext(AuthContext);

  const [sessions, setSessions] = React.useState(null);
  const [selectedSession, setSelectedSession] = React.useState(null);

  const [exams, setExams] = React.useState(null);
  const [selectedExam, setSelectedExam] = React.useState(null);

  const [classes, setClasses] = React.useState([]);
  const [selectedClass, setSelectedClass] = React.useState(null);

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
      } catch (error) {
        // alert("Exams not found");
        // console.error("Error fetching exams:", error);
      }
    };
    fetchExams();
  }, [api, selectedSession]);

  useEffect(() => {
    const getExamsClasses = async () => {
      try {
        const response = await api.get(
          `/get_exams_classes/${selectedExam.id}/`
        );
        // console.log(response.data);
        setClasses(response.data);
        setSelectedClass(response.data[0]);
        // localStorage.removeItem("get_exams_classes_id");
      } catch (error) {
        console.error(error);
      }
    };

    getExamsClasses();
  }, [selectedExam, api]);

  const handleResultClick = () => {
    localStorage.setItem(
      "class_result_info",
      JSON.stringify({
        exam_id: selectedExam.id,
        class_id: selectedClass.class_id,
        class_name: selectedClass.class_name,
      })
    );
    navigate("/exam/classResult"); // Navigate to the edit page
  };
  return (
    sessions &&
    exams &&
    classes && (
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
            <span className="text-gray-700">Class Wise Result</span>
          </div>
        </div>

        <h1 className="text-center font-bold text-xl pt-10">
          Class Wise Result (Bulk)
        </h1>
        <div className="flex flex-row justify-center gap-4 pt-10">
          <span className=" text-center ">
            <p className="text-center font-bold">Select Session</p>
            <select
              name=""
              id=""
              value={selectedSession && selectedSession.id}
              onChange={(e) => {
                setSelectedSession(
                  sessions.find((session) => session.id == e.target.value)
                );
                setClasses([]);
              }}
              className="p-2 bg-white rounded-full border border-gray-300 px-4 w-4/5"
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
          <span className=" text-center ">
            <p className="text-center font-bold">Select Class</p>
            <select
              name=""
              id=""
              value={selectedClass?.class_id}
              onChange={(e) =>
                setSelectedClass(
                  classes.find((cls) => cls.class_id == e.target.value)
                )
              }
              className="p-2 bg-white rounded-full border border-gray-300 w-64 "
            >
              {classes.length > 0 ? (
                classes.map((cls) => (
                  <option key={cls.class_id} value={cls.class_id}>
                    {cls.class_name}
                  </option>
                ))
              ) : (
                <option selected>class not available for this exam</option>
              )}
            </select>
          </span>
        </div>
        <div className="flex flex-row gap-8 justify-center pt-24">
          {classes.length > 0 && (
            <button
              type="button"
              className="bg-pink-500  p-2 px-8 rounded-full text-white"
              onClick={handleResultClick}
            >
              Search
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default ClassResult;
