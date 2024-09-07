import React, { useState, useRef } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { MdBusinessCenter } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { formValidationSchema } from "./EmpValidations";

function AddEmployee() {
  // Select complimentry logic
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [district, SetDistrict] = useState("District");

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

  //upload logic
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Reset logic
    // const formRef = useRef(null);

    // const handleReset = () => {
    //   // Reset the form using the ref
    //   if (formRef.current) {
    //     formRef.current.reset();
    //   }
    // };

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
    sameAsPermanentAddress:false,
    


    dateOfJoining:"",
    nationality:"",
    religion:"",
    caste:"", 
    bloodGroup:"",
    bioData:"",
    educationalDetails:"",
    experience:"",
    mainSubject:"",
    complementarySubject:"",
    remarks:""
  };

 // Form submission logic
 const handleSubmit = (values, formikBag) => {
  console.log("Form Submitted");
  console.log("Form Data",values);
   // Safely log the form data (values)
  //  try {
  //   console.log("Form Data (JSON):", JSON.stringify(values, null, 2)); // Ensure only 'values' are stringified
  // } catch (error) {
  //   console.error("Error stringifying values:", error);
  // }


  // Perform any form submission logic here (e.g., API call)

  // Reset the form after submission using the formikBag.resetForm() method
  // formikBag.resetForm();
};



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
          {({ setFieldValue,isSubmitting, values,resetForm }) => (
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
                  <label className="block text-sm font-medium">
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
                  <label className="block text-sm font-medium">
                    Middle Name
                  </label>
                  <Field
                    name="employeeMiddleName"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium">Last Name</label>
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
                  <label className="block text-sm font-medium">Gender</label>
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
                  <label className="block text-sm font-medium">
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
                <div className="mb-4 relative">
                  <label className="block text-sm font-medium">
                    Employee Photo
                  </label>
                  <Field name="file">
                    {({ form }) => (
                      <>
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          className="rounded-3xl"
                          onChange={(event) => {
                            form.setFieldValue(
                              "file",
                              event.currentTarget.files[0]
                            );
                          }}
                        />
                        <button
                          type="button"
                          onClick={handleUploadClick}
                          className="w-full bg-white border border-gray-300 rounded-3xl px-4 p-2 flex flex-row items-start justify-between"
                        >
                          Upload Photo <MdOutlineFileUpload />
                        </button>

                        {/* ErrorMessage for file validation */}
                        <ErrorMessage
                          name="file"
                          component="p"
                          className="text-red-500 text-sm mt-1"
                        />
                      </>
                    )}
                  </Field>
                </div>
              </div>

              <div className="grid grid-cols-6  gap-4">
                {/* Aadhar Number */}
                <div className="mb-4 col-span-2">
                  <label className="block text-sm font-medium">
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
                  <label className="block text-sm font-medium">
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
                  <label className="block text-sm font-medium">
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
                  <label className="block text-sm font-medium">Email</label>
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
                  <label className="block text-sm font-medium">
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
                  <label className="block text-sm font-medium">
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
                  <label className="block text-sm font-medium">
                    Father's Middle Name
                  </label>
                  <Field
                    name="fatherMiddleName"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                </div>
                {/* Father's Last Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium">
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
                  <label className="block text-sm font-medium">
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
                  <label className="block text-sm font-medium">
                    Husband's Middle Name
                  </label>
                  <Field
                    name="husbandMiddleName"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium">
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
                  <label className="block text-sm font-medium">Address 1</label>
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
                  <label className="block text-sm font-medium">
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
                  <label className="block text-sm font-medium">District</label>
                  <Field
                    as="select"
                    name="district"
                    className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
                  >
                    <option value="" disabled selected>
                      District
                    </option>
                    <option value="teacher">Chennai</option>
                    <option value="peon">Jhapa</option>
                    <option value="">Lakhanau</option>
                    <option value="labAssistance">Morang</option>
                  </Field>
                  <ErrorMessage
                    name="district"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4 ">
                  <label className="block text-sm font-medium">State</label>
                  <Field
                    as="select"
                    name="state"
                    className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
                  >
                    <option value="" disabled selected>
                      State
                    </option>
                   <option value="bihar">Bihar</option>
                    <option value="bagmati">Bagmati</option>
                    <option value="koshi">Koshi</option>
                    <option value="terai">Terai</option>
                  </Field>
                  <ErrorMessage
                    name="state"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium">Country</label>
                  <Field
                    as="select"
                    name="country"
                    className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
                  >
                    <option value="" disabled selected>
                      Country
                    </option>
                    <option value="teacher">Nepal</option>
                    <option value="peon">India</option>
                    <option value="">China</option>
                    <option value="labAssistance">Bhutan</option>
                  </Field>
                  <ErrorMessage
                    name="country"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Zip Code</label>
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
                      if (isChecked) {
                        setFieldValue("currentAddress1", values.address1);
                        setFieldValue(
                          "currentTownVillageCity",
                          values.townVillageCity
                        );
                        setFieldValue("currentDistrict", values.district);
                        setFieldValue("currentState", values.state);
                        setFieldValue("currentCountry", values.country);
                        setFieldValue("currentZipCode", values.zipCode);
                      }
                      else {
                        // Clear current address fields when unchecked
                        setFieldValue("currentAddress1", "");
                        setFieldValue("currentTownVillageCity", "");
                        setFieldValue("currentDistrict", "");
                        setFieldValue("currentState", "");
                        setFieldValue("currentCountry", "");
                        setFieldValue("currentZipCode", "");
                      }
                    }}
                  />
                  <label className="text-sm">Same as Permanent Address</label>
                </div>
              </div>
              <hr className="border-gray-600" />

              <div className="grid grid-cols-7 gap-4 pt-4">
                <div className="mb-4 col-span-2">
                  <label className="block text-sm font-medium">Address 1</label>
                  <Field
                    name="currentAddress1"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                </div>

                <div className="mb-4 col-span-2">
                  <label className="block text-sm font-medium">
                    Town/Village/City
                  </label>
                  <Field
                    name="currentTownVillageCity"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">District</label>
                  <Field
                    as="select"
                    name="currentDistrict"
                    className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
                  >
                    <option value="" disabled selected>
                      District
                    </option>
                    <option value="teacher">Chennai</option>
                    <option value="peon">Jhapa</option>
                    <option value="">Lakhanau</option>
                    <option value="labAssistance">Morang</option>
                  </Field>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">State</label>
                  <Field
                    as="select"
                    name="currentState"
                    className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
                  >
                    <option value="" disabled selected>
                      State
                    </option>
                    <option value="bihar">Bihar</option>
                    <option value="bagmati">Bagmati</option>
                    <option value="koshi">Koshi</option>
                    <option value="terai">Terai</option>
                  </Field>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Country</label>
                  <Field
                    as="select"
                    name="currentCountry"
                    className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
                  >
                    <option value="" disabled selected>
                      Country
                    </option>
                    <option value="Nepal">Nepal</option>
                    <option value="India">India</option>
                    <option value="China">China</option>
                    <option value="Bhutan">Bhutan</option>
                  </Field>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Zip Code</label>
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
                  <label className="block text-sm font-medium">
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
                  <label className="block text-sm font-medium">
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
                  <label className="block text-sm font-medium">Religion</label>
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
                  <label className="block text-sm font-medium">Caste</label>
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
                  <label className="block text-sm font-medium">
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
                <div className="mb-4 relative">
                  <label className="block text-sm font-medium">
                    Upload Bio-Data
                  </label>
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
              <div className="grid grid-cols-6 gap-4">
                <div className="mb-4 col-span-2">
                  <label className="block text-sm font-medium">
                    Educationals Details
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
                  <label className="block text-sm font-medium">
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
                  <label className="block text-sm font-medium">
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
                  <label className="block text-sm font-medium">
                    Complementry Subjects
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
                <label htmlFor="">Remarks Notes</label>
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
