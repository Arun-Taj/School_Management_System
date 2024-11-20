// src/context/UpdateContext.js
import React, { createContext, useState, useEffect } from "react";

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


  const onUpdate=(classId, updatedSubjects) => {
    // console.log("Here i am onUpdate")
    // console.log(classId,updatedSubjects)
    
    const updatedClasses = updateState.classes.map((cls) =>
      cls.id === classId ? { ...cls, subjects: updatedSubjects } : cls
    );
    // console.log(updatedClasses)
    localStorage.setItem("classes", JSON.stringify(updatedClasses));
  }




  return (
    <UpdateContext.Provider value={{updateState, setUpdateState, onUpdate}}>
      {children}
    </UpdateContext.Provider>
  );
};
