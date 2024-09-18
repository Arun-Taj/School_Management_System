import React, { useState, useRef } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaUser } from "react-icons/fa";

function AdmissionForm() {
  const initialFormValues = {
    studentFirstName: "",
    studentMiddleName: "",
    studentLastName: "",
    gender: "",
    dateOfBirth: "",
    aadharNumber: "",
    motherTongue: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
    classOfAdmission: "",

    fatherFirstName: "",
    fatherMiddleName: "",
    fatherLastName: "",
    fatherAadharNumber: "",
    fatherOccupation: "",
    motherFirstName: "",
    motherMiddleName: "",
    motherLastName: "",
    motherAadharNumber: "",
    motherOccupation: "",

    guardianFirstName: "",
    guardianMiddleName: "",
    guardianLastName: "",
    guardianAadharNumber: "",
    guardianOccupation: "",
    relationWithGuardian: "",
    guardianPhoneNumber: "",
    sameAsFatherMother: false,

    pAddress1:"",
    ptownVillageCity:"",
    pdistrict:"",
    pstate:"",
    pcountry:"",
    pzipCode:"",

    sameAsPermanentAddress:"",
    cAddress1:"",
    ctownVillageCity:"",
    cdistrict:"",
    cstate:"",
    ccountry:"",
    czipCode:"",

    nationality:"",
    religion:"",
    caste:"",
    bloodGroup:"",
    personalIdentification:"",
    disease:"",
    lastAttendance:"",
    transferCertificate:"",
    remarks:"",
    
    
  };
const [formData,setFormData]=useState(initialFormValues)
  // State for managing errors
  const [errors, setErrors] = useState({});

  // Ref for file input
  const fileInputRef = useRef(null);

  // Handle change for form fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setFormData((prevFormData) => {
      // Update the current field value
      let updatedFormData = {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
  
      // Logic for copying permanent address to current address if checkbox is checked
      if (name === "sameAsPermanentAddress" && checked) {
        updatedFormData = {
          ...updatedFormData,
          cAddress1: prevFormData.pAddress1,
          ctownVillageCity: prevFormData.ptownVillageCity,
          cdistrict: prevFormData.pdistrict,
          cstate:prevFormData.pstate,
          ccountry:prevFormData.pcountry,
          czipCode:prevFormData.pzipCode,
        };
      }
  
      // If "sameAsPermanentAddress" is unchecked, clear the current address fields
      if (name === "sameAsPermanentAddress" && !checked) {
        updatedFormData = {
          ...updatedFormData,
          cAddress1: "",
          ctownVillageCity: "",
          cdistrict: "",
          cstate:"",
          ccountry:"",
          czipCode:"",
        };
      }
  
      return updatedFormData;
    });
  
    // Clear errors for the changed field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
  
  // Validate the form fields
  const validate = () => {
    const errors = {};

    // Validation for student details
    if (!formData.studentFirstName.trim()) {
      errors.studentFirstName = "First Name is required";
    }

    if (!formData.studentLastName.trim()) {
      errors.studentLastName = "Last Name is required";
    }

    if (!formData.gender) {
      errors.gender = "Gender is required";
    }

    if (!formData.dateOfBirth) {
      errors.dateOfBirth = "Date of Birth is required";
    }

    if (!formData.aadharNumber.trim()) {
      errors.aadharNumber = "Aadhar Number is required";
    } else if (!/^\d{12}$/.test(formData.aadharNumber)) {
      errors.aadharNumber = "Aadhar Number must be a 12-digit number";
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Phone Number must be a 10-digit number";
    }

    if (!formData.classOfAdmission.trim()) {
      errors.classOfAdmission = "Class of Admission is required";
    }

    // Validation for father details
    if (!formData.fatherFirstName.trim()) {
      errors.fatherFirstName = "Father's First Name is required";
    }

    if (!formData.fatherLastName.trim()) {
      errors.fatherLastName = "Father's Last Name is required";
    }

    if (!formData.fatherAadharNumber.trim()) {
      errors.fatherAadharNumber = "Father's Aadhar Number is required";
    } else if (!/^\d{12}$/.test(formData.fatherAadharNumber)) {
      errors.fatherAadharNumber =
        "Father's Aadhar Number must be a 12-digit number";
    }

    // Validation for mother details
    if (!formData.motherFirstName.trim()) {
      errors.motherFirstName = "Mother's First Name is required";
    }

    if (!formData.motherLastName.trim()) {
      errors.motherLastName = "Mother's Last Name is required";
    }

    if (!formData.motherAadharNumber.trim()) {
      errors.motherAadharNumber = "Mother's Aadhar Number is required";
    } else if (!/^\d{12}$/.test(formData.motherAadharNumber)) {
      errors.motherAadharNumber =
        "Mother's Aadhar Number must be a 12-digit number";
    }

    // Validation for guardian details (only if not same as father/mother)
    if (!formData.sameAsFatherMother) {
      if (!formData.guardianFirstName.trim()) {
        errors.guardianFirstName = "Guardian's First Name is required";
      }

      if (!formData.guardianLastName.trim()) {
        errors.guardianLastName = "Guardian's Last Name is required";
      }

      if (!formData.guardianAadharNumber.trim()) {
        errors.guardianAadharNumber = "Guardian's Aadhar Number is required";
      } else if (!/^\d{12}$/.test(formData.guardianAadharNumber)) {
        errors.guardianAadharNumber =
          "Guardian's Aadhar Number must be a 12-digit number";
      }

      if (!formData.relationWithGuardian.trim()) {
        errors.relationWithGuardian = "Relation with Guardian is required";
      }

      if (!formData.guardianPhoneNumber.trim()) {
        errors.guardianPhoneNumber = "Guardian's Phone Number is required";
      } else if (!/^\d{10}$/.test(formData.guardianPhoneNumber)) {
        errors.guardianPhoneNumber =
          "Guardian's Phone Number must be a 10-digit number";
      }
    }
    //validations for permanent address
    if(!formData.pAddress1){
      errors.pAddress1="Permanent Address is required";
    }
    if(!formData.ptownVillageCity){
      errors.ptownVillageCity="Mention town/village/city";
    }
    if(!formData.pdistrict){
      errors.pdistrict="Select district";
    }
    if(!formData.pstate){
      errors.pstate="Select State";

    }
    if(!formData.pcountry){
      errors.pcountry="Select Country";
    }
    if(!formData.pzipCode){
      errors.pzipCode="Mention zip code";
    }
    if(!formData.nationality){
      errors.nationality="Mention Nationality";
    }
    if(!formData.bloodGroup){
      errors.bloodGroup="Select Blood Group";
    }

    // Return validation result
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form submitted successfully!", formData);
      localStorage.setItem("formData", JSON.stringify(formData));

      // Reset the form data after submission
      setFormData(initialFormValues);

      setErrors({});
    } else {
      console.log("Form has errors. Please correct them and try again.");
    }
  };

  // Handle file upload click (optional based on file handling logic)
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  const handleReset=()=>{
    setFormData(initialFormValues);
  }

  return (
    <div className="bg-pink-100 min-h-screen p-8">
      <div className="flex gap-4  bg-white  rounded-3xl p-2">
        <div className="flex items-center space-x-2">
          <FaUser className="text-gray-700" />
          <span className="text-gray-700 font-medium">Students</span>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">Add New</span>
        </div>
      </div>

      <div className="my-8 text-center">
        <h2 className="text-3xl font-bold text-black">Admission Form</h2>
      </div>

      {/* Student Information */}
      <form onSubmit={handleSubmit} className=" ">
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              1
            </span>
            <span>Student Information</span>
          </h3>
          <hr className="border-gray-600" />
          <div className="grid grid-cols-6  gap-4 mt-6">
            {/* Student's First Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Student's First Name
              </label>
              <input
                type="text"
                name="studentFirstName"
                value={formData.studentFirstName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
              {errors.studentFirstName && (
                <p className="text-red-500 text-sm">
                  {errors.studentFirstName}
                </p>
              )}
            </div>

            {/* Student's Middle Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Student's Middle Name
              </label>
              <input
                type="text"
                name="studentMiddleName"
                value={formData.studentMiddleName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>

            {/* Student's Last Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Student's Last Name
              </label>
              <input
                type="text"
                name="studentLastName"
                value={formData.studentLastName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
              {errors.studentLastName && (
                <p className="text-red-500 text-sm">{errors.studentLastName}</p>
              )}
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
              >
                <option value=""> Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="mt-1 block w-full p-2  rounded-3xl"
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
              )}
            </div>

            {/* Student Photo */}
            <div className="mb-4 relative">
              <label className="block text-sm font-medium">Student Photo</label>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                className="rounded-3xl"
              />
              <button
                type="button"
                onClick={handleUploadClick}
                className="w-full bg-white border border-gray-300 rounded-3xl px-4 p-2 flex flex-row items-start justify-between"
              >
                Upload Photo <MdOutlineFileUpload />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-6  gap-4">
            {/* Aadhar Number */}
            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium">Aadhar Number</label>
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
              {errors.aadharNumber && (
                <p className="text-red-500 text-sm">{errors.aadharNumber}</p>
              )}
            </div>

            {/* Mother Tongue */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Mother Tongue</label>
              <input
                type="text"
                name="motherTongue"
                value={formData.motherTongue}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Alternate Phone No.
              </label>
              <input
                type="tel"
                name="alternatePhoneNumber"
                value={formData.alternatePhoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>
            {/* Class of Admission */}
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Class of Admission
              </label>
              <select
                name="classOfAdmission"
                value={formData.classOfAdmission}
                onChange={handleChange}
                className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
              >
                <option value="" disabled selected>
                  Select Class
                </option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
                <option value="Class 4">Class 4</option>
                <option value="Class 5">Class 5</option>
              </select>
              {errors.classOfAdmission && (
                <p className="text-red-500 text-sm">
                  {errors.classOfAdmission}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Father & Mother Information */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              2
            </span>
            <span>Father & Mother Information</span>
          </h3>
          <hr className="border-gray-600" />
          <div className="grid grid-cols-6  gap-4 mt-6">
            {/* Father's First Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Father's First Name
              </label>
              <input
                type="text"
                name="fatherFirstName"
                value={formData.fatherFirstName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
              {errors.fatherFirstName && (
                <p className="text-red-500 text-sm">{errors.fatherFirstName}</p>
              )}
            </div>
            {/* Father's Middle Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Father's Middle Name
              </label>
              <input
                type="text"
                name="fatherMiddleName"
                value={formData.fatherMiddleName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>
            {/* Father's Last Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Father's Last Name
              </label>
              <input
                type="text"
                name="fatherLastName"
                value={formData.fatherLastName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
              {errors.fatherLastName && (
                <p className="text-red-500 text-sm">{errors.fatherLastName}</p>
              )}
            </div>{" "}
            {/* Father's Aadhar Number */}
            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium">Aadhar Number</label>
              <input
                type="text"
                name="fatherAadharNumber"
                value={formData.fatherAadharNumber}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
              {errors.fatherAadharNumber && (
                <p className="text-red-500 text-sm">{errors.fatherAadharNumber}</p>
              )}
            </div>
            {/* Father's Occupation */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Occupation</label>
              <input
                type="text"
                name="fatherOccupation"
                value={formData.fatherOccupation}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
              
            </div>
          </div>

          <div className="grid grid-cols-6  gap-4">
            {/* Mother's First Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Mother's First Name
              </label>
              <input
                type="text"
                name="motherFirstName"
                value={formData.motherFirstName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
              {errors.motherFirstName && (
                <p className="text-red-500 text-sm">{errors.motherFirstName}</p>
              )}
            </div>
            {/* Mother's Middle Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Mother's Middle Name
              </label>
              <input
                type="text"
                name="motherMiddleName"
                value={formData.motherMiddleName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>
            {/* Mother's Last Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Mother's Last Name
              </label>
              <input
                type="text"
                name="motherLastName"
                value={formData.motherLastName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
              {errors.motherLastName && (
                <p className="text-red-500 text-sm">{errors.motherLastName}</p>
              )}
            </div>
            {/* Mother's Aadhar Number */}
            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium">Aadhar Number</label>
              <input
                type="text"
                name="motherAadharNumber"
                value={formData.motherAadharNumber}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
              {errors.motherAadharNumber && (
                <p className="text-red-500 text-sm">{errors.motherAadharNumber}</p>
              )}
            </div>
            {/* Mother's Occupation */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Occupation</label>
              <input
                type="text"
                name="motherOccupation"
                value={formData.motherOccupation}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>
          </div>
        </section>

        {/* Guardian Information */}
        <section className="mb-8">
          <div className="flex items-center justify-between mt-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                3
              </span>
              <span>Guardian Informations</span>
            </h3>
            
            {/* <div className="flex items-center mb-4">
              <input
                type="checkbox"
                name="sameAsFatherMother"
                checked={formData.sameAsFatherMother}
                onChange={handleChange}
                className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded-3xl"
              />
              {errors.sameAsFatherMother && (
                <p className="text-red-500 text-sm">{errors.sameAsFatherMother}</p>
              )}
              <label className="text-sm">
                Same as Father & Mother Information
              </label>
            </div> */}
          </div>
          <hr className="border-gray-600" />

          <div className="grid grid-cols-6 gap-4 mt-6">
            {/* Guardian's First Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Guardian's First Name
              </label>
              <input
                type="text"
                name="guardianFirstName"
                value={formData.guardianFirstName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
              {errors.guardianFirstName && (
                <p className="text-red-500 text-sm">{errors.guardianFirstName}</p>
              )}
            </div>
            

            {/* Guardian's Middle Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Guardian's Middle Name
              </label>
              <input
                type="text"
                name="guardianMiddleName"
                value={formData.guardianMiddleName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>

            {/* Guardian's Last Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Guardian's Last Name
              </label>
              <input
                type="text"
                name="guardianLastName"
                value={formData.guardianLastName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
              {errors.guardianLastName && (
                <p className="text-red-500 text-sm">{errors.guardianLastName}</p>
              )}
            </div>

            {/* Guardian's Aadhar Number */}
            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium">Aadhar Number</label>
              <input
                type="text"
                name="guardianAadharNumber"
                value={formData.guardianAadharNumber}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
              {errors.guardianAadharNumber && (
                <p className="text-red-500 text-sm">{errors.guardianAadharNumber}</p>
              )}
            </div>

            {/* Guardian's Occupation */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Occupation</label>
              <input
                type="text"
                name="guardianOccupation"
                value={formData.guardianOccupation}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-4  gap-4">
            {/* Relation with Local Guardian */}
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Relation with Local Guardian
              </label>
              <input
                type="text"
                name="relationWithGuardian"
                value={formData.relationWithGuardian}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
              {errors.relationWithGuardian && (
                <p className="text-red-500 text-sm">{errors.relationWithGuardian}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                name="guardianPhoneNumber"
                value={formData.guardianPhoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
              {errors.guardianPhoneNumber && (
                <p className="text-red-500 text-sm">{errors.guardianPhoneNumber}</p>
              )}
            </div>
          </div>
        </section>
        {/* Permanent Address */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              4
            </span>
            <span>Permanent Address</span>
          </h3>
          <hr className="border-gray-600" />
          <div className="grid grid-cols-7 gap-4 mt-6">
            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium">Address 1</label>
              <input
                type="text"
                name="pAddress1"
                value={formData.pAddress1}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
               {errors.pAddress1 && (
                <p className="text-red-500 text-sm">{errors.pAddress1}</p>
              )}
            </div>

            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium">
                Town/Village/City
              </label>
              <input
                type="text"
                name="ptownVillageCity"
                value={formData.ptownVillageCity}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
              {errors.ptownVillageCity && (
                <p className="text-red-500 text-sm">{errors.ptownVillageCity}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">District</label>
              <select
                
                name="pdistrict"
                value={formData.pdistrict}
                onChange={handleChange}
                className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
              >
                <option value="" disabled selected>
                  District
                </option>
                <option value="Class 1">Nepal</option>
                <option value="Class 2">India</option>
                <option value="Class 3">China</option>
              </select>
              {errors.pdistrict && (
                <p className="text-red-500 text-sm">{errors.pdistrict}</p>
              )}
            </div>

            <div className="mb-4 ">
              <label className="block text-sm font-medium">State</label>
              <select
                name="pstate"
                value={formData.pstate}
                onChange={handleChange}
                className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
              >
                <option value="" disabled selected>
                  State
                </option>
                <option value="Class 1">Nepal</option>
                <option value="Class 2">India</option>
                <option value="Class 3">China</option>
              </select>
              {errors.pstate && (
                <p className="text-red-500 text-sm">{errors.pstate}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Country</label>
              <select
                name="pcountry"
                value={formData.pcountry}
                onChange={handleChange}
                className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
              >
                <option value="" disabled selected>
                  Country
                </option>
                <option value="Class 1">Nepal</option>
                <option value="Class 2">India</option>
                <option value="Class 3">China</option>
              </select>
              {errors.pcountry && (
                <p className="text-red-500 text-sm">{errors.pcountry}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Pin Code</label>
              <input
                type="text"
                name="pzipCode"
                value={formData.pzipCode}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
              {errors.pzipCode && (
                <p className="text-red-500 text-sm">{errors.pzipCode}</p>
              )}
            </div>
          </div>
        </section>

        {/* Current Address */}
        <section className="mb-8">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                5
              </span>
              <span>Current Address</span>
            </h3>
            <div className="flex items-center mb-4 mt-6">
              <input
                type="checkbox"
                name="sameAsPermanentAddress"
                checked={formData.sameAsPermanentAddress}
                onChange={handleChange}
                className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded-3xl"
              />
              <label className="text-sm">Same as Permanent Address</label>
            </div>
          </div>
          <hr className="border-gray-600" />
          <div className="grid grid-cols-7 gap-4 mt-4">
            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium">Address 1</label>
              <input
              name="cAddress1"
                type="text"
                value={formData.cAddress1}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>

            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium">
                Town/Village/City
              </label>
              <input
              name="ctownVillageCity"
                type="text"
                value={formData.ctownVillageCity}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">District</label>
              <select
                name="cdistrict"
                value={formData.cdistrict}
                onChange={handleChange}
                className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
              >
                <option value="" disabled selected>
                  District
                </option>
                <option value="Class 1">Nepal</option>
                <option value="Class 2">India</option>
                <option value="Class 3">China</option>
              </select>
            </div>

            <div className="mb-4 ">
              <label className="block text-sm font-medium">State</label>
              <select
                name="cstate"
                value={formData.cstate}
                onChange={handleChange}
                className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
              >
                <option value="" disabled selected>
                  State
                </option>
                <option value="Class 1">Nepal</option>
                <option value="Class 2">India</option>
                <option value="Class 3">China</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Country</label>
              <select
                name="ccountry"
                value={formData.ccountry}
                onChange={handleChange}
                className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
              >
                <option value="" disabled selected>
                  Country
                </option>
                <option value="Class 1">Nepal</option>
                <option value="Class 2">India</option>
                <option value="Class 3">China</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Pin Code</label>
              <input
                type="text"
                name="czipCode"
                value={formData.czipCode}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>
          </div>
        </section>

        {/* Other informations */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              6
            </span>
            <span>Other Information</span>
          </h3>{" "}
          <hr className="border-gray-600" />
          <div className="grid grid-cols-6  gap-4 mb-4 mt-6">
            <div className="mb-4">
              <label className="block text-sm font-medium">Nationality</label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
              {errors.nationality && (
                <p className="text-red-500 text-sm">{errors.nationality}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Religion</label>
              <select
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
              >
                <option value="" disabled selected>
                  Religion
                </option>
                <option value="Class 1">Sikh</option>
                <option value="Class 2">Hindu</option>
                <option value="Class 3">Muslim</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Caste</label>
              <select
                name="caste"
                value={formData.caste}
                onChange={handleChange}
                className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
              >
                <option value="" disabled selected>
                  Caste
                </option>
                <option value="Class 1">Sikh</option>
                <option value="Class 2">Hindu</option>
                <option value="Class 3">Muslim</option>
              </select>
            </div>{" "}
            <div className="mb-4 ">
              <label className="block text-sm font-medium">Blood Group</label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
              > 
                <option value="" disabled selected>
                  Blood Group
                </option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="AB+">AB+</option>
              </select>
              {errors.bloodGroup && (
                <p className="text-red-500 text-sm">{errors.bloodGroup}</p>
              )}
            </div>
            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium">
                Personal Identification Marks
              </label>
              <input
                type="text"
                name="personalIdentification"
                value={formData.personalIdentification}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>
          </div>
          <div className=" mb-4">
            <label htmlFor="">
              Is the boy/girl suffering from any disease ? If so, give details
            </label>
            <input
              placeholder="Details"
              type="text"
              name="disease"
              value={formData.disease}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8 mb-4">
            <div>
              <label htmlFor="">Institution last attendence (if any)</label>
              <input
                placeholder="Details"
                type="text"
                name="lastAttendance"
                value={formData.lastAttendance}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>
            <div>
              <label htmlFor="">Transfer Certificate No. & Date (if any)</label>
              <input
                placeholder="Details"
                type="text"
                name="transferCertificate"
                value={formData.transferCertificate}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>
          </div>
          <div className=" mb-4">
            <label htmlFor="">Remarks (note)</label>
            <input
              placeholder="Details"
              type="text"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
            />
          </div>
        </section>

        <div className="flex flex-row justify-center gap-6 py-10">
          <div className="">
            <button
              type="button"
              onClick={handleReset}
              className="bg-pink-500 text-white font-semibold px-6 py-2 rounded-3xl shadow-md hover:bg-pink-600"
            >
              Reset
            </button>
          </div>
          <div className="">
            <button
              type="submit"
              className="bg-pink-500 text-white font-semibold px-6 py-2 rounded-3xl shadow-md hover:bg-pink-600"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdmissionForm;
