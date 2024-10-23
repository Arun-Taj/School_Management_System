import React, { useState, useRef } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { MdBusinessCenter } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { formValidationSchema } from "./EmpValidations";
import DistrictStates from "./DistrictStates";
import statesDistricts from "../SignUp&SignIn/statesDistricts.json";
import axios from "axios";

function AddEmployee() {
  // Select complimentry logic
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // const [district, SetDistrict] = useState("district");

  const options = ["Python", "C++", "DSA"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    }
    setIsOpen(false);
  };

  const removeOption = (option) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== option));
  };

  const initialValues = {
    employeeFirstName: "",
    employeeMiddleName: "",
    employeeLastName: "",
    gender: "",
    dateOfBirth: "",
    photoUpload: "",
    aadharNumber: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
    email: "",
    selectRole: "",

    fatherFirstName: "",
    fatherMiddleName: "",
    fatherLastName: "",
    husbandFirstName: "",
    husbandMiddleName: "",
    husbandLastName: "",

    address1: "",
    townVillageCity: "",
    district: "",
    state: "",
    country: "",
    zipCode: "",

    currentAddress1: "",
    currentTownVillageCity: "",
    currentDistrict: "",
    currentState: "",
    currentCountry: "",
    currentZipCode: "",
    sameAsPermanentAddress: false,

    dateOfJoining: "",
    nationality: "",
    religion: "",
    caste: "",
    bloodGroup: "",
    bioData: "",
    educationalDetails: "",
    experience: "",
    mainSubject: "",
    complementarySubject: "",
    remarks: "",
  };

  const fileInputRef1 = useRef(null);
  const [fileName1, setFileName1] = useState(""); // To store the file name
  const [fileSizeError, setFileSizeError] = useState(""); // To store the error message for file size

  // Handle file upload with size limit check (250 KB)
  const handleUploadClick1 = (event, setFieldValue) => {
    const file1 = event.currentTarget.files[0]; // Get the selected file
    if (file1) {
      const fileSizeInKB = file1.size / 1024; // Convert file size to KB
      if (fileSizeInKB <= 250) {
        setFieldValue("photoUpload", file1); // Set file value for Formik
        setFileName1(file1.name); // Set file name to display
        setFileSizeError(""); // Clear any previous error
      } else {
        setFileSizeError("File size must be 250KB or less."); // Set error message
        setFileName1(""); // Clear the file name if it's too large
      }
    }
  };

  const fileInputRef2 = useRef(null);
  const [fileName2, setFileName2] = useState(""); // To store the file name
  const [fileSizeError2, setFileSizeError2] = useState(""); // To store the error message for file size

  // Handle file upload with size limit check (250 KB)
  const handleUploadClick2 = (event, setFieldValue) => {
    const file = event.currentTarget.files[0]; // Get the selected file
    if (file) {
      const fileSizeInKB = file.size / 1024; // Convert file size to KB
      if (fileSizeInKB <= 250) {
        setFieldValue("bioData", file); // Set file value for Formik
        setFileName2(file.name); // Set file name to display
        setFileSizeError2(""); // Clear any previous error
      } else {
        setFileSizeError2("File size must be 250KB or less."); // Set error message
        setFileName2(""); // Clear the file name if it's too large
      }
    }
  };

  const handleSubmit = (values, { resetForm }) => {
    // Log the form values
    console.log("Form Submitted successfully");
    console.log("Form Data", values);

    // Reset the form after successful submission
    resetForm();
    // Manually reset the file input
    if (fileInputRef1.current) {
      fileInputRef1.current.value = null; // Reset the file input field
    }

    // Clear the file name and any errors
    setFileName1("");
    setFileSizeError("");
  };

  function getStates(jsonData) {
    return jsonData.states.map((stateObj) => stateObj.state);
  }

  function getDistrictsByState(jsonData, stateName) {
    const stateObj = jsonData.states.find(
      (stateObj) => stateObj.state === stateName
    );
    return stateObj ? stateObj.districts : []; // Return districts or empty array if state not found
  }

  const [states, setStates] = useState(getStates(statesDistricts));
  const [districts, setDistricts] = useState([]);

  const [cstates, setcStates] = useState(getStates(statesDistricts));
  const [cdistricts, setcDistricts] = useState([]);

  // const [edistrict, seteDistrict] = useState(null);

  function prepareFormData(data) {
    const formData = new FormData();

    // Iterate over the data object
    for (let key in data) {
      if (data[key] instanceof File) {
        // If the value is a File, append it as a file
        formData.append(key, data[key]);
      } else if (typeof data[key] === "object" && data[key] !== null) {
        // Skip object fields if not a file (e.g., photoUpload and bioData)
        // Convert objects to string if necessary
        formData.append(key, JSON.stringify(data[key]));
      } else {
        // Append other key-value pairs as string data
        formData.append(key, data[key]);
      }
    }

    return formData;
  }
  // const token=localStorage.getItem('access_token');

  // // Create FormData from employeeData
  // //const FORMDATA= prepareFormData(employeeData);

  // // Example: How to send it to the backend (with Axios or Fetch)
  // // axios.post('/your-api-endpoint', formData);
  // axios.post('/your-api-endpoint', FORMDATA, {
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //     'Authorization': `Bearer ${token}`  // Replace with your actual token
  //   }
  // })
  // .then(response => {
  //   console.log('Success:', response);
  // })
  // .catch(error => {
  //   console.error('Error:', error);
  // });

  return (
    <div className="bg-pink-100 min-h-screen p-8">
      <div className="flex gap-4  bg-white  rounded-3xl p-2">
        <div className="flex items-center space-x-2">
          <MdBusinessCenter className="text-gray-700" />
          <span className="text-gray-700 font-medium">Employee</span>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">Add New</span>
        </div>
      </div>

      {/* Form Data */}
      <Formik
        initialValues={initialValues}
        validationSchema={formValidationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
      >
        {({ setFieldValue, values, setValues , resetForm }) => (
          <Form className=" ">
            <div className="my-8 text-center">
              <h2 className="text-3xl font-bold text-black">Employee Form</h2>
            </div>

            {/* Employee Information */}

            <section className="mb-8">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  1
                </span>
                <span>Basic Information</span>
              </h3>
              <hr className="border-gray-600" />
              <div className="grid grid-cols-6  gap-4 mt-6">
                <div className="mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    First Name
                  </label>
                  <Field
                    name="employeeFirstName"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                  <ErrorMessage
                    name="employeeFirstName"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Middle Name
                  </label>
                  <Field
                    name="employeeMiddleName"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                </div>

                <div className="mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Last Name
                  </label>
                  <Field
                    name="employeeLastName"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                  <ErrorMessage
                    name="employeeLastName"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Gender */}
                <div className="mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Gender
                  </label>
                  <Field
                    as="select"
                    name="gender"
                    className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
                  >
                    <option value=""> Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Date of Birth */}
                <div className="mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Date of Birth
                  </label>
                  <Field
                    type="date"
                    name="dateOfBirth"
                    className="mt-1 block w-full p-2 rounded-3xl"
                  />
                  <ErrorMessage
                    name="dateOfBirth"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Employee Photo */}
                <div className="relative mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Employee Photo
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef1}
                    style={{ display: "none" }}
                    accept="image/*" // Accept only image files
                    onChange={(event) =>
                      handleUploadClick1(event, setFieldValue)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef1.current.click()}
                    className="w-full bg-white border border-gray-300 rounded-3xl px-4 p-2 flex flex-row items-start justify-between"
                  >
                    <span
                      className="overflow-hidden text-ellipsis whitespace-nowrap"
                      style={{ maxWidth: "80%" }} // Adjust to control the space for the file name
                    >
                      {fileName1 ? fileName1 : "Upload Photo"}
                    </span>
                    <MdOutlineFileUpload />
                  </button>
                  {fileSizeError && (
                    <span className="text-red-500 text-sm">
                      {fileSizeError}
                    </span>
                  )}
                  <ErrorMessage
                    name="photoUpload"
                    component="span"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-6  gap-4">
                {/* Aadhar Number */}
                <div className="mb-4 col-span-2">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Aadhar Number
                  </label>
                  <Field
                    name="aadharNumber"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                  <ErrorMessage
                    name="aadharNumber"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Phone Number
                  </label>
                  <Field
                    name="phoneNumber"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Alternate Phone No.
                  </label>
                  <Field
                    name="alternatePhoneNumber"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                  <ErrorMessage
                    name="alternatePhoneNumber"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Employee Role
                  </label>
                  <Field
                    as="select"
                    name="selectRole"
                    className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
                  >
                    <option value="" disabled selected>
                      Select Role
                    </option>
                    <option value="teacher">Teacher</option>
                    <option value="peon">Peon</option>
                    <option value="finance">Finance Manager</option>
                    <option value="labAssistance">Lab Assistance</option>
                  </Field>
                  <ErrorMessage
                    name="selectRole"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
            </section>

            {/* Father & Husband Name */}
            <section className="mb-8">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  2
                </span>
                <span>Father / Husband Name</span>
              </h3>
              <hr className="border-gray-600" />
              <div className="grid grid-cols-6  gap-4 mt-6">
                {/* Father's First Name */}
                <div className="mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Father's First Name
                  </label>
                  <Field
                    name="fatherFirstName"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                  <ErrorMessage
                    name="fatherFirstName"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                {/* Father's Middle Name */}
                <div className="mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Father's Middle Name
                  </label>
                  <Field
                    name="fatherMiddleName"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                </div>
                {/* Father's Last Name */}
                <div className="mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Father's Last Name
                  </label>
                  <Field
                    name="fatherLastName"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                  <ErrorMessage
                    name="fatherLastName"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Husband's First Name
                  </label>
                  <Field
                    name="husbandFirstName"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                  <ErrorMessage
                    name="husbandFirstName"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Husband's Middle Name
                  </label>
                  <Field
                    name="husbandMiddleName"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                </div>

                <div className="mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Husband's Last Name
                  </label>
                  <Field
                    name="husbandLastName"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                  <ErrorMessage
                    name="husbandLastName"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
            </section>

            {/* Permanent Address */}
            <section className="mb-8">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  3
                </span>
                <span>Permanent Address</span>
              </h3>
              <hr className="border-gray-600" />
              <div className="grid grid-cols-7 gap-4 mt-6">
                <div className="mb-4 col-span-2">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Address 1
                  </label>
                  <Field
                    name="address1"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                  <ErrorMessage
                    name="address1"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4 col-span-2">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Town/Village/City
                  </label>
                  <Field
                    name="townVillageCity"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                  <ErrorMessage
                    name="townVillageCity"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Country
                  </label>
                  <Field
                    as="select"
                    name="country"
                    className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
                  >
                    <option value="" disabled selected>
                      Country
                    </option>
                    <option value="india">India</option>
                  </Field>
                  <ErrorMessage
                    name="country"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4 ">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    State
                  </label>
                  <Field
                    as="select"
                    name="state"
                    className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
                    onChange={(event) => {
                      const selectedState = event.target.value;
                      const filteredDistricts = getDistrictsByState(
                        statesDistricts,
                        selectedState
                      );
                      setFieldValue("state", selectedState); // Update state in Formik
                      setFieldValue("district", ""); // Clear district when state changes
                      setDistricts(filteredDistricts); // Update districts for the selected state
                    }}
                  >
                    <option value="" disabled selected>
                      State
                    </option>

                    {states.map((state, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="state"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    District
                  </label>
                  <Field
                    as="select"
                    name="district"
                    className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
                  >
                    <option value="" disabled selected>
                      District
                    </option>

                    {districts.map((district, index) => (
                      <option key={index} value={district}>
                        {district}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="district"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Pin Code
                  </label>
                  <Field
                    name="zipCode"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                  <ErrorMessage
                    name="zipCode"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
            </section>

            {/* Current Address */}
            <section className="mb-8">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold  flex items-center">
                  <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                    4
                  </span>
                  <span>Current Address</span>
                </h3>
                <div className="flex items-center mb-4 mt-6">
                  <Field
                    type="checkbox"
                    name="sameAsPermanentAddress"
                    className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded-3xl"
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      // setFieldValue("sameAsPermanentAddress", isChecked);
                  
                    //   if (isChecked) {
                    //     // Use batch update pattern with Formik's setFieldValue to ensure values are set correctly
                    //     // setFieldValue("currentAddress1", values.address1);
                    //     // setFieldValue("currentTownVillageCity", values.townVillageCity);
                    //     console.log(values.district);
                    //     setFieldValue("currentDistrict", values.district); // Correctly set the district
                    //     console.log(values.currentDistrict);
                        
                    //     // setFieldValue("currentState", values.state);
                    //     setFieldValue("currentCountry", values.country);
                    //     setFieldValue("currentZipCode", values.zipCode);
                    //   } else {
                    //     // Clear current address fields when unchecked
                    //     setFieldValue("currentAddress1", "");
                    //     setFieldValue("currentTownVillageCity", "");
                    //     setFieldValue("currentDistrict", ""); // Clear district when unchecked
                    //     setFieldValue("currentState", "");
                    //     setFieldValue("currentCountry", "");
                    //     setFieldValue("currentZipCode", "");
                    //   }
                    // 
                    
                    if (isChecked) {
                      // Batch update current address fields using setValues
                       const selectedState = values.state;
                      const filteredDistricts = getDistrictsByState(
                        statesDistricts,
                        selectedState
                      );
                     
                      setcDistricts(filteredDistricts); // Update districts for the selected state
                      setValues({
                        ...values,
                        sameAsPermanentAddress: true,
                        currentAddress1: values.address1,
                        currentTownVillageCity: values.townVillageCity,
                        currentCountry: values.country,
                        currentState: values.state,
                        currentDistrict: values.district,
                        currentZipCode: values.zipCode,
                      });
                    } else {
                      // Clear current address fields
                      setValues({
                        ...values,
                        sameAsPermanentAddress: false,
                        currentAddress1: '',
                        currentTownVillageCity: '',
                        currentState: '',
                        currentDistrict: '',
                        currentCountry: '',
                        currentZipCode: '',
                      });
                    }

                   
                  
                  
                  
                  }}
                    
                  />

                  <label className="text-sm">Same as Permanent Address</label>
                </div>
              </div>
              <hr className="border-gray-600" />

              <div className="grid grid-cols-7 gap-4 pt-4">
                <div className="mb-4 col-span-2">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Address 1
                  </label>
                  <Field
                    name="currentAddress1"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                </div>

                <div className="mb-4 col-span-2">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Town/Village/City
                  </label>
                  <Field
                    name="currentTownVillageCity"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                </div>
                <div className="mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Country
                  </label>
                  <Field
                    as="select"
                    name="currentCountry"
                    className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
                  >
                    <option value="" disabled selected>
                      Country
                    </option>
                    <option value="india">India</option>
                  </Field>
                </div>

                <div className="mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    State
                  </label>
                  <Field
                    as="select"
                    name="currentState"
                    className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
                    onChange={(event) => {
                      const selectedState = event.target.value;
                      const filteredDistricts = getDistrictsByState(
                        statesDistricts,
                        selectedState
                      );
                      setFieldValue("currentState", selectedState); // Update state in Formik
                      setFieldValue("currentDistrict", ""); // Clear district when state changes
                      setcDistricts(filteredDistricts); // Update districts for the selected state
                      console.log("changed state"); 
                      
                    }}
                  >
                    <option value="" disabled selected>
                      State
                    </option>
                    {cstates.map((state, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    ))}
                  </Field>
                </div>

                <div className="mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    District
                  </label>
                  <Field
                    as="select"
                    name="currentDistrict"
                    className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
                    
                  >
                    <option value="" disabled selected>
                      District
                    </option>
                   {cdistricts.map((district, index) => (
                      <option key={index} value={district}>
                        {district}
                      </option>
                    ))}
                  </Field>
                </div>

                <div className="mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Pin Code
                  </label>
                  <Field
                    name="currentZipCode"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                </div>
              </div>
            </section>

            {/* Other informations */}
            <section className="mb-8">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  5
                </span>
                <span>Other Information</span>
              </h3>{" "}
              <hr className="border-gray-600" />
              <div className="grid grid-cols-6  gap-4 mb-4 mt-6">
                <div className="mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Date of Joining
                  </label>
                  <Field
                    type="date"
                    name="dateOfJoining"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                  <ErrorMessage
                    name="dateOfJoining"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Nationality
                  </label>
                  <Field
                    name="nationality"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                  <ErrorMessage
                    name="nationality"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Religion
                  </label>
                  <Field
                    as="select"
                    name="religion"
                    className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
                  >
                    <option value="" disabled selected>
                      Religion
                    </option>
                    <option value="Class 1">Sikh</option>
                    <option value="Class 2">Hindu</option>
                    <option value="Class 3">Muslim</option>
                  </Field>
                </div>
                <div className="mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Caste
                  </label>
                  <Field
                    as="select"
                    name="caste"
                    className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
                  >
                    <option value="" disabled selected>
                      Caste
                    </option>
                    <option value="Class 1">Brahimin</option>
                    <option value="Class 2">Chettri</option>
                    <option value="Class 3">Muslim</option>
                  </Field>
                </div>{" "}
                <div className="mb-4 ">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Blood Group
                  </label>
                  <Field
                    as="select"
                    name="bloodGroup"
                    className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
                  >
                    <option value="" disabled selected>
                      BloodGroup
                    </option>
                    <option value="O+">O+</option>
                    <option value="A+">A+</option>
                    <option value="AB+">AB+</option>
                    <option value="O-">O-</option>
                  </Field>
                  <ErrorMessage
                    name="bloodGroup"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="relative mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Upload Biodata
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef2}
                    style={{ display: "none" }}
                    accept=".pdf, .doc, .docx" // Accept only document files (modify as needed)
                    onChange={(event) =>
                      handleUploadClick2(event, setFieldValue)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef2.current.click()}
                    className="w-full bg-white border border-gray-300 rounded-3xl px-4 p-2 flex flex-row items-start justify-between"
                  >
                    <span
                      className="overflow-hidden text-ellipsis whitespace-nowrap"
                      style={{ maxWidth: "80%" }} // Adjust to control the space for the file name
                    >
                      {fileName2 ? fileName2 : " Biodata"}
                    </span>
                    <MdOutlineFileUpload />
                  </button>
                  {fileSizeError2 && (
                    <span className="text-red-500 text-sm">
                      {fileSizeError2}
                    </span>
                  )}
                  <ErrorMessage
                    name="bioData"
                    component="span"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-4">
                <div className="mb-4 col-span-2">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Educational Qualification
                  </label>
                  <Field
                    name="educationalDetails"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                  <ErrorMessage
                    name="educationalDetails"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Experience
                  </label>
                  <Field
                    name="experience"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                  <ErrorMessage
                    name="experience"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4 ">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Main Subject
                  </label>
                  <Field
                    as="select"
                    name="mainSubject"
                    className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
                  >
                    <option value="" disabled selected>
                      Main Subject
                    </option>
                    <option value="Math">Maths</option>
                    <option value="Science">Science</option>
                    <option value="Social">Social</option>
                    <option value="English">English</option>
                  </Field>
                  <ErrorMessage
                    name="mainSubject"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Complementry subjects */}
                <div className="mb-4 col-span-2">
                  <label className="font-sans text-base font-bold leading-5 text-left">
                    Complimentary Subjects
                  </label>
                  <div className="relative">
                    <div
                      className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl cursor-pointer"
                      onClick={toggleDropdown}
                    >
                      <div className="flex flex-wrap">
                        {selectedOptions.length > 0 ? (
                          selectedOptions.map((option, index) => (
                            <div
                              key={index}
                              className="bg-blue-500 text-white px-2 py-1 rounded-full mr-2 mb-2 flex items-center"
                            >
                              {option}
                              <button
                                className="ml-2 text-white"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeOption(option);
                                }}
                              >
                                &times;
                              </button>
                            </div>
                          ))
                        ) : (
                          <span className="text-gray-400">
                            Select subjects...
                          </span>
                        )}
                      </div>
                    </div>
                    {isOpen && (
                      <ul className="absolute w-full bg-white border border-gray-300 rounded-3xl mt-1 max-h-48 overflow-y-auto z-10">
                        {options.map((option, index) => (
                          <li
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => selectOption(option)}
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
              <div className=" mb-4">
                <label
                  htmlFor=""
                  className="font-sans text-base font-bold leading-5 text-left"
                >
                  Remarks (note)
                </label>
                <Field
                  name="remarks"
                  placeholder="Details"
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                />
              </div>
            </section>

            <div className="flex flex-row justify-center gap-6 py-10">
              <div className="">
                <button
                  type="button"
                  onClick={resetForm}
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
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddEmployee;
