import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SchoolDetails from "./SchoolDetails";
import AdminDetails from "./AdminDetails";
import SignupForm from "./SignUp";

const baseUrl = import.meta.env.VITE_API_BASE_URL;


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
    phoneNumber: "",
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
    dateOfBirth:null,
    altPhone:"",
    aadhaarNumber:"",
    address1:"",
    townVillageCity:"",
    district:"",
    state:"",
    country:"",
    pinCode:"",
    nationality:"",
    religion:"",
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
     // Get the updated values from Formik refs
     const updatedFormData = signUpFormRef.current.values;
     const updatedSchoolDetailsData = schoolDetailsRef.current.values;
     const updatedAdminDetailsData = adminDetailsRef.current.values;
 
     // Update the state to ensure we have the latest values
     setFormData(updatedFormData);
     setSchoolDetailsData(updatedSchoolDetailsData);
     setAdminDetailsData(updatedAdminDetailsData);

    //  // Log the latest form data
    // console.log("Signup Data: ", updatedFormData);
    // console.log("School Details Data: ", updatedSchoolDetailsData);
    // console.log("Admin Details Data: ", updatedAdminDetailsData);




    signup(updatedFormData, updatedSchoolDetailsData, updatedAdminDetailsData);
      // Submit and redirect to home
      setFormSubmitted(true);
      navigate("/");
    } else {
      console.log("Please ensure all forms are correctly filled out.");
    }
  };


  const signup = async (updatedFormData, updatedSchoolDetailsData, updatedAdminDetailsData) => {


    // Create a FormData object to handle file and text data
      const signupFormData = new FormData();

      // Append text fields
      signupFormData.append("username", updatedFormData.username);
      signupFormData.append("email", updatedFormData.email);
      signupFormData.append("full_name", `${updatedAdminDetailsData.firstName} ${updatedAdminDetailsData.middleName} ${updatedAdminDetailsData.lastName}`);
      signupFormData.append("password", updatedFormData.password);
      signupFormData.append("gender", updatedAdminDetailsData.gender);
      signupFormData.append("dob", updatedAdminDetailsData.dateOfBirth);
      signupFormData.append("aadhar_no", updatedAdminDetailsData.aadhaarNumber);
      signupFormData.append("address", updatedAdminDetailsData.address1);
      signupFormData.append("town_village_city", updatedAdminDetailsData.townVillageCity);
      signupFormData.append("district", updatedAdminDetailsData.district);
      signupFormData.append("state", updatedAdminDetailsData.state);
      signupFormData.append("country", updatedAdminDetailsData.country);
      signupFormData.append("pincode", updatedAdminDetailsData.pinCode);
      signupFormData.append("nationality", updatedAdminDetailsData.nationality);
      signupFormData.append("religion", updatedAdminDetailsData.religion);
      signupFormData.append("phone_number", updatedFormData.phoneNumber);
      signupFormData.append("alt_phone_number", updatedAdminDetailsData.altPhone);


      // Append file fields (assuming updatedAdminDetailsData.uploadPhoto and updatedAdminDetailsData.passportPhoto are files)
      if (updatedAdminDetailsData.uploadPhoto) {
        signupFormData.append("photo", updatedAdminDetailsData.uploadPhoto);
      }
      if (updatedAdminDetailsData.passportPhoto) {
        signupFormData.append("passport_photo", updatedAdminDetailsData.passportPhoto);
      }
    // Call signup API
    const response = await fetch(`${baseUrl}/adminuser/`, {
      method: "POST",
      
      body: signupFormData,
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Signup successful", data);



      const schoolFormData = new FormData();
      // Append text fields
      schoolFormData.append("school_name", updatedSchoolDetailsData.schoolName);
      schoolFormData.append("tag_line", updatedSchoolDetailsData.tagLine);
      schoolFormData.append("school_board", updatedSchoolDetailsData.schoolBoard);
      schoolFormData.append("address", updatedSchoolDetailsData.address1);
      schoolFormData.append("town_village_city", updatedSchoolDetailsData.city);
      schoolFormData.append("district", updatedSchoolDetailsData.district);
      schoolFormData.append("state", updatedSchoolDetailsData.state);
      schoolFormData.append("country", updatedSchoolDetailsData.country);
      schoolFormData.append("pincode", updatedSchoolDetailsData.pinCode);
      schoolFormData.append("admin", parseInt(data.user.id));

      // Call school creation API
      const response = await fetch(`${baseUrl}/school/`, {
        method: "POST",
        
        body: schoolFormData,
      });

      const schoolData = await response.json();

      if (response.ok) {
        // console.log("Signup successful", schoolData);
        alert("Signup Successful");
      }else{
        console.log("School Creation failed", schoolData);
      }

      
    }
     else {
      // console.log("Signup failed", data);
      alert("User registration failed");
      
      // throw new Error("Signup failed");
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