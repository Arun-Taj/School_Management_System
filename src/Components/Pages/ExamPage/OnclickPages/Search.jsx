import React, { useContext, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";

const Search = () => {
  const { api } = useContext(AuthContext);

  const exam_id = localStorage.getItem("get_exams_classes_id");

  const [classes, setClasses] = React.useState([]);
  const [selectedClass, setSelectedClass] = React.useState(null);

  const [studentEnrNo, setStudentEnrNo] = React.useState("");

  useEffect(() => {
    const getExamsClasses = async () => {
      try {
        const response = await api.get(`/get_exams_classes/${exam_id}/`);
        // console.log(response.data);
        setClasses(response.data);
        setSelectedClass(response.data[0]);
        // localStorage.removeItem("get_exams_classes_id");
      } catch (error) {
        console.error(error);
      }
    };

    getExamsClasses();
  }, []);

  const navigate = useNavigate();
  const AddWholeClsDataClick = () => {
    localStorage.setItem("selectedClassId", JSON.stringify(selectedClass));
    navigate("/exam/search/addWholeClsData");
  };
  const AddSingleStdDataClick = () => {
    if (studentEnrNo === "") {
      alert("Please enter student Registration Number eg.ENR-EE45D3C93C");
    } else {
      localStorage.removeItem("studentEnrNo");
      localStorage.setItem("studentEnrNo", JSON.stringify(studentEnrNo));

      navigate("/exam/search/addSinglestdData");
    }
  };

  return (
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
        <div className="border-l border-gray-700 h-6"></div>
        <div>
          <span className="text-gray-700 font-medium">Search</span>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center pt-8">
        <p className="text-center font-bold text-xl">
          Add Data As a Whole Class
        </p>
        <div className="flex flex-col justify-center items-center mb-10 mt-10">
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
        </div>
        {classes.length > 0 && (
          <button
            type="button"
            className="flex justify-center bg-pink-500 rounded-full p-2 px-8 "
            onClick={AddWholeClsDataClick}
          >
            Search
          </button>
        )}
      </div>
      <div className="flex flex-col justify-center items-center pt-10">
        <p className="text-center font-bold text-xl">
          Add Data As a Single Student
        </p>
        <div className="flex flex-col justify-center items-center mb-10 mt-10">
          <p className="text-center font-bold">Enter Registration No.</p>
          <input
            type="text"
            value={studentEnrNo}
            onChange={(e) => setStudentEnrNo(e.target.value)}
            className="p-2 rounded-full w-64 border border-gray-300"
          />
        </div>
        <button
          type="button"
          className="flex justify-center bg-pink-500 rounded-full p-2 px-8 "
          onClick={AddSingleStdDataClick}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
