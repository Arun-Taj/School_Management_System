import React, { useContext, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext"


const EditDeleteExam = () => {
  const navigate = useNavigate();
  const {api}  = useContext(AuthContext);


  const [sessions, setSessions] = React.useState([]);
  const [selectedSession, setSelectedSession] = React.useState();
  const [exams, setExams] = React.useState([]);
  const [selectedExam, setSelectedExam] = React.useState();


  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get('/exam_sessions/');
        setSessions(response.data);
        setSelectedSession(response.data[0]);
        // console.log(response.data);
      } catch (error) {
        console.error('Error fetching sessions:', error);
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
        // console.error('Error fetching exams:', error);
      }
    }
    fetchExams();

  }, [api, selectedSession]);


  const handleDelete = async () => {
    try {
      
      const response = await api.delete(`/delete_exam/${selectedExam.id}/`);
      alert(response.data.message);
      setExams(exams.filter(exam => exam.id !== selectedExam.id));
      setSelectedExam(null);
    } catch (error) {
      alert(error.data);
    }
  }


  const handleEditClick = () => {
    localStorage.setItem("selectedExamId", JSON.stringify(selectedExam.id));
    navigate("/exam/updateExam/edit"); // Navigate to the edit page
  };
  return (
    <div className="p-8 bg-pink-100 min-h-full">
      <div className="flex gap-4  bg-white  rounded-3xl p-2 ">
        <div className="flex items-center space-x-2">
          <FaEdit className="text-gray-700 " />
          <span className="text-gray-700 font-medium">Exam </span>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">Edit or Delete Exam</span>
        </div>
      </div>

      <div className="flex flex-row justify-center pt-24">
        <span className=" text-center w-1/6">
          <p className="text-center font-bold">Select Session</p>
          <select
            name=""
            id=""
            value={selectedSession && selectedSession.id}
            onChange={(e) => setSelectedSession(sessions.find((session) => session.id === parseInt(e.target.value)))}
            className="p-2 bg-white rounded-full border border-gray-300 px-4 w-4/5"
          >
            {
              sessions.map((session) => (
                <option key={session.id} value={session.id}>
                  {session.name}
                </option>
              ))
            }
          </select>
        </span>
        <span className=" text-center w-2/4">
          <p className="text-center font-bold">Select Exam</p>
          <select name="" id="" className="p-2 bg-white rounded-full border border-gray-300 w-3/4 "
            value={selectedExam && selectedExam.id}
            onChange={(e) => setSelectedExam(exams.find((exam) => exam.id === parseInt(e.target.value)))}
          
          >
            {
              exams.length > 0 ?
              exams.map((exam) => (
                <option key={exam.id} value={exam.id}>
                  {exam.name}
                </option>
              )):
              <option>No exams found for this session</option>
            }
          </select>
        </span>
      </div>

            {
              exams.length > 0 &&
      <div className="flex flex-row gap-8 justify-center pt-24">
        <button type="button" className="bg-pink-500  p-2 px-8 rounded-full text-white" onClick={handleEditClick}>Edit</button>
        <button type="button" className="bg-pink-500 p-2 px-8 rounded-full text-white" onClick={handleDelete}>Delete</button>
      </div>
            }
    </div>
  );
};

export default EditDeleteExam;
