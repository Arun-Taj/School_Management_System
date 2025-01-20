// src/context/UpdateContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Create AuthContext
export const UpdateContext = createContext();

// Provide UpdateContext to the app
export const UpdateContextProvider = ({ children }) => {

  const [updateState, setUpdateState] = useState(
    {

      classId: null,
      className: null,
      subjects: null,
      classes: null
    }
  );

  const { api } = useContext(AuthContext)


  const onUpdate = (classId, updatedSubjects) => {
    // console.log("Here i am onUpdate")
    // console.log(classId, updatedSubjects)
    const updateSubjects = async () => {
      try {
        const response = await api.post("/update_class_subjects/", { subjects: updatedSubjects, class_id: classId })
        // const response = await api.post("/update_class_subjects/", updateSubjects)
        // console.log("Response from server:", response.data);
      } catch (error) {
        console.error("Error posting data:", error);
      }

    }

    updateSubjects()




    const updatedClasses = updateState.classes.map((cls) =>
      cls.id === classId ? { ...cls, subjects: updatedSubjects } : cls
    );
    // console.log(updatedClasses)
    localStorage.setItem("classes", JSON.stringify(updatedClasses));
  }




  return (
    <UpdateContext.Provider value={{ updateState, setUpdateState, onUpdate }}>
      {children}
    </UpdateContext.Provider>
  );
};
