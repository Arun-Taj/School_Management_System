import React, { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { FaEye } from "react-icons/fa6";
import { MdChevronRight } from "react-icons/md";
import { MdChevronLeft } from "react-icons/md";
import { AuthContext } from "../../../../context/AuthContext";
import { set, sub } from "date-fns";

const AddSingleStdData = () => {
  const { api } = useContext(AuthContext);

  const selected_class = JSON.parse(localStorage.getItem("selectedClassId"));
  const selected_exam_id = JSON.parse(
    localStorage.getItem("get_exams_classes_id")
  );
  const studentEnrNo = JSON.parse(localStorage.getItem("studentEnrNo"));

  const [data, setData] = useState([]);
  let [headers, setHeaders] = useState([]);

  useEffect(() => {
    const getSubjectsForHeadersOfExam = async () => {
      try {
        const response = await api.get(
          `/get_subjects_for_this_exam/${selected_exam_id}/${selected_class.class_id}/`
        );
        // console.log(response.data);
        setHeaders((prevHeaders) => [
          "Enrollment ID",
          "Student Name",
          "Father's Name",
          ...response.data.map((data) => data.subject_name),
          "Action",
        ]);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    getSubjectsForHeadersOfExam();

    const get_student_by_enr_no = async () => {
      try {
        const response = await api.get(
          `/get_student_by_enr_no/${selected_exam_id}/${selected_class.class_id}/${studentEnrNo}/`
        );
        console.log(response.data);
        setData(response.data);
        // setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    get_student_by_enr_no();
  }, []);

  const [editingIndex, setEditingIndex] = useState(-1);

  const handleEditClick = (index) => {
    setEditingIndex(index);
  };

  const handleInputChange = (subject, value) => {};

  const handleSaveClick = (index) => {
    // console.log("saving", data[index]);

    const updateMarks = async () => {
      try {
        const response = await api.post(`/update_marks/`, data[index]);
        // console.log(response.data);
      } catch (error) {
        console.error("Error updating marks:", error);
      }
    };
    updateMarks();
    setEditingIndex(-1);
  };
  const handleSubmit = () => {
    // console.log(data);

    alert("Data submitted successfully!");
  };

  return (
    <div className="p-8 bg-pink-100 min-h-screen ">
      <div className="flex gap-4 bg-white rounded-3xl p-2">
        <div className="flex items-center space-x-2">
          <FaEdit className="text-gray-700" />
          <span className="text-gray-700 font-medium">Exam</span>
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
        <div className="border-l border-gray-700 h-6"></div>
        <div>
          <span className="text-gray-700 font-medium">
            Add Single Student Data
          </span>
        </div>
      </div>

      <p className="flex flex-col items-center justify-center font-bold pt-10 text-2xl pb-6 text-center">
        <small>Insert/Update Marks</small>
      </p>
      <div className="w-screen">
        <div className=" bg-white py-4  rounded-lg shadow-lg">
          <div className="overflow-x-auto">
            <div className="max-h-[400px] overflow-y-auto ">
              <table className=" text-center border-collapse">
                <thead className="sticky top-0">
                  <tr className="bg-white">
                    {headers.map((header, index) => (
                      <th
                        key={index}
                        className="p-2 whitespace-nowrap min-w-[150px]"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="">
                  {data.map((student, index) => (
                    <tr
                      key={index}
                      className={index % 2 ? "bg-[#BCA8EA]" : "bg-[#E3D6FF]"}
                    >
                      <td className="p-2 min-w-[150px]">{student.enr_no}</td>
                      <td className="p-2 min-w-[250px]">
                        {student.student_name}
                      </td>
                      <td className="p-2 min-w-[250px]">
                        {student.father_name}
                      </td>
                      {/* <td className="p-2 min-w-[30px]">{record.rollNo}</td> */}
                      {student.marks.map((subject, i) => (
                        <td
                          key={i}
                          className={`p-2 ${
                            editingIndex === index
                              ? "min-w-[50px]"
                              : "min-w-[50px]"
                          }`}
                          style={i > 2 ? { whiteSpace: "nowrap" } : {}}
                        >
                          {editingIndex === index ? (
                            <input
                              type="number"
                              value={subject.marks}
                              onChange={(e) => {
                                if (e.target.value > subject.paper_full_marks) {
                                  alert(
                                    `Marks cannot be greater than full marks i.e. ${subject.paper_full_marks}`
                                  );
                                } else if (e.target.value < 0) {
                                  alert("Marks cannot be negative");
                                } else {
                                  const updatedMarks = data.map(
                                    (studentData) => {
                                      if (
                                        studentData.student_id ===
                                        student.student_id
                                      ) {
                                        // Replace 'studentId' with the actual ID of the student being updated
                                        return {
                                          ...studentData,
                                          marks: studentData.marks.map(
                                            (subjectData) => {
                                              if (
                                                subjectData.paper_id ===
                                                subject.paper_id
                                              ) {
                                                // Replace 'subjectId' with the actual ID of the subject being updated
                                                return {
                                                  ...subjectData,
                                                  marks: e.target.value,
                                                };
                                              }
                                              return subjectData;
                                            }
                                          ),
                                        };
                                      }
                                      return studentData;
                                    }
                                  );

                                  setData(updatedMarks);
                                } // Assuming setData is the state setter function
                              }}
                              className="w-14 rounded-full pl-1"
                            />
                          ) : (
                            subject.marks
                          )}
                        </td>
                      ))}
                      <td className="p-2 min-w-[200px]">
                        {editingIndex === index ? (
                          <button
                            onClick={() => handleSaveClick(index)}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEditClick(index)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSingleStdData;
