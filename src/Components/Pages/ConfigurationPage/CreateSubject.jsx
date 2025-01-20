import React, { useState, useContext } from "react";
import { FcSettings } from "react-icons/fc";
import { FaRegTrashAlt } from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext";

const CreateSubject = () => {
  const { api } = useContext(AuthContext);

  const [subjects, setSubjects] = useState([]);

  const getSubjects = () => {
    //load subjects from database
    api
      .get("/subject/")
      .then((response) => {
        setSubjects(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  React.useEffect(() => {
    getSubjects()
  }, [api]);

  const [newSubject, setNewSubject] = useState(""); // State to hold the new subject input

  const handleCreateSubject = () => {
    if (newSubject.trim() !== "") {
      const subject = {
        subjectName: newSubject,
        subjectID: null,
      };
      // console.log(subject);

      setSubjects((prevSubjects) => [...prevSubjects, subject]);
      setNewSubject(""); // Clear the input after adding

      // save subject to database
      const formData = new FormData();
      formData.append("subjectName", subject.subjectName);
      api
        .post("/subject/", formData)
        .then((response) => {
          // console.log(response.data);
          console.log("Subject created successfully");

        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDeleteSubject = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete? All data related to this subject will be deleted."
    );
    if (confirmDelete) {
      const updatedSubjects = subjects.filter((_, i) => i !== index);
      setSubjects(updatedSubjects); // Update the subjects state

      const subjectToDelete = subjects[index];
      // console.log(subjectToDelete);
      api
        .delete(`/subject/${subjectToDelete.id}/`)
        .then((response) => {
          // console.log(response.data);
          console.log("Subject deleted successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="p-8 min-h-screen bg-pink-100">
      <div className="flex gap-4 bg-white rounded-3xl p-2 ">
        <div className="flex items-center space-x-2">
          <FcSettings className="text-gray-700 " />
          <span className="text-gray-700 font-medium">Configuration</span>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">Subjects</span>
        </div>
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">Create Subjects</span>
        </div>
      </div>

      <div className="flex justify-center gap-8 pt-8">
        <div className="bg-white rounded-lg shadow-[4px_4px_4px_0px_#00000040] w-1/2 flex justify-center flex-col">
          <span className="space-y-4 p-2 pb-6 pt-6 mx-6">
            <p className="text-2xl font-sans font-bold text-center pb-6">
              Create New Subject
            </p>
            <input
              type="text"
              placeholder="Name of the subject"
              className="p-2 pl-4 w-full rounded-full border border-gray-300"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)} // Update newSubject state
            />
          </span>
          <div className="py-10 flex justify-center items-center">
            <button
              className="p-2 bg-pink-400 rounded-full px-6 text-white"
              onClick={handleCreateSubject} // Call create function on click
            >
              Create
            </button>
          </div>
        </div>
        <div className="shadow-[4px_4px_4px_0px_#00000040] rounded-lg">
          <table className="border-collapse bg-white rounded-lg">
            <thead>
              <tr>
                <th className="p-2 py-4 px-4">Name of Subject</th>
                <th className="p-2 py-4 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-[#BCA8EA]" : "bg-[#E3D6FF]"
                    }`}
                >
                  <td className="py-2 px-4">{subject.subjectName}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      className="hover:text-red-700"
                      onClick={() => handleDeleteSubject(index)} // Call delete function on click
                    >
                      <FaRegTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateSubject;
