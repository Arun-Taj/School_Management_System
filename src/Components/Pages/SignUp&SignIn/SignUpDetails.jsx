import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SchoolDetails from "./SchoolDetails";
import AdminDetails from "./AdminDetails";
import SignupForm from "./SignUp";

const SignUpDetails = () => {
  const [showAdminDetails, setShowAdminDetails] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Refs for each form's Formik instance
  const schoolDetailsRef = useRef(null);
  const adminDetailsRef = useRef(null);
  const signUpFormRef = useRef(null);

  // State to collect form data
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [schoolDetailsData, setSchoolDetailsData] = useState({
    schoolName: "",
    logo: "",
    tagLine: "",
    schoolBoard: "",
    address1: "",
    city: "",
    district: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const [adminDetailsData, setAdminDetailsData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    uploadPhoto: null,
    dateOfBirth:"",
    aadhaarNumber:"",
    address1:"",
    townVillageCity:"",
    district:"",
    state:"",
    country:"",
    pinCode:"",
    nationality:"",
    passportPhoto: null,
  });

  const navigate = useNavigate();  // Initialize navigate function

  const handleAdminClick = () => {
    setShowAdminDetails(true);  // Switch to Admin form
  };

  const handleBackToSchoolDetails = () => {
    setShowAdminDetails(false);  // Switch back to School form
  };

  const handleSubmit = async () => {
    // Validate each form
    const signUpFormValid = await signUpFormRef.current?.validateForm();
    const schoolDetailsValid = await schoolDetailsRef.current?.validateForm();
    const adminDetailsValid = await adminDetailsRef.current?.validateForm();

    // Check if all forms are valid
    if (
      Object.keys(signUpFormValid).length === 0 &&
      Object.keys(schoolDetailsValid).length === 0 &&
      Object.keys(adminDetailsValid).length === 0
    ) {
      console.log("All forms are valid!");
      // Ensure that formData is up-to-date
    const updatedFormData = signUpFormRef.current.values;
    setFormData(updatedFormData);  // Update formData state

      console.log("Signup Data: ", formData);

      const userData = {
        username: updatedFormData.username, // Ensure username is stored in lowercase
        password: updatedFormData.password,
      };
      console.log("Storing user data:", userData); // DEBUGGING: Check what is being stored
      localStorage.setItem("user", JSON.stringify(userData)); // Store in localStorage
    
      // Submit and redirect to home
      setFormSubmitted(true);
      navigate("/");
    } else {
      console.log("Please ensure all forms are correctly filled out.");
    }
  };

  return (
    <div className="flex space-x-4">
      <div className="w-1/2">
        <SignupForm 
          formData={formData}
          setFormData={setFormData}
          formRef={signUpFormRef}
          handleSubmit={handleSubmit} 
        />
      </div>
      <div className="w-1/2">
        {/* Render both forms but control visibility */}
        <div className={showAdminDetails ? 'hidden' : 'block'}>
          <SchoolDetails
            onAdminClick={handleAdminClick}
            schoolDetailsData={schoolDetailsData}
            setSchoolDetailsData={setSchoolDetailsData}
            formRef={schoolDetailsRef}
          />
        </div>
        <div className={showAdminDetails ? 'block' : 'hidden'}>
          <AdminDetails
            onBackClick={handleBackToSchoolDetails}
            adminDetailsData={adminDetailsData}
            setAdminDetailsData={setAdminDetailsData}
            formRef={adminDetailsRef}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpDetails;
