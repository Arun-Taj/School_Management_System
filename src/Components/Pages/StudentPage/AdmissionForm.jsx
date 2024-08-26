import React, { useState, useRef } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaUser } from "react-icons/fa";
function AdmissionForm() {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  const [formData, setFormData] = useState({
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
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.studentFirstName)
      newErrors.studentFirstName = "First Name is required";
    if (!formData.studentLastName)
      newErrors.studentLastName = "Last Name is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of Birth is required";
    if (!formData.aadharNumber)
      newErrors.aadharNumber = "Aadhar Number is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";
    if (!formData.classOfAdmission)
      newErrors.classOfAdmission = "Class of Admission is required";
    // Add more validation as needed

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Submit form data
      console.log("Form submitted successfully", formData);
    }
  };

  return (
    <div className="bg-pink-100 min-h-screen py-2 px-2">
      <div className="flex gap-4  bg-white mx-8 rounded-3xl p-2 mb-8 mt-4">
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

      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto  ">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-black">Admission Form</h2>
        </div>

        {/* Student Information */}

        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              1
            </span>
            <span>
              Student Information
              
            </span>
          </h3><hr className="border-gray-600" />
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
              <label className="block text-sm font-medium">Sent Photo</label>
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
                <option value="" disabled selected>Select Class</option>
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
            <span>
              Father & Mother Information
              
            </span>
          </h3><hr className="border-gray-600" />
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
                name="MotherFirstName"
                value={formData.motherFirstName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>
            {/* Mother's Middle Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Mother's Middle Name
              </label>
              <input
                type="text"
                name="MotherMiddleName"
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
                name="MotherLastName"
                value={formData.motherLastName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>
            {/* Mother's Aadhar Number */}
            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium">Aadhar Number</label>
              <input
                type="text"
                name="MotherAadharNumber"
                value={formData.motherAadharNumber}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>
            {/* Mother's Occupation */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Occupation</label>
              <input
                type="text"
                name="MotherOccupation"
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
              <span>
                Guardian Informations
                
              </span>
            </h3><hr className="border-gray-600" />
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                name="sameAsFatherMother"
                checked={formData.sameAsFatherMother}
                onChange={handleChange}
                className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded-3xl"
              />
              <label className="text-sm">
                Same as Father & Mother Information
              </label>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4">
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
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>
          </div>
        </section>
        {/* Permanent Address */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              4
            </span>
            <span>
              Permanent Address
              
            </span>
          </h3><hr className="border-gray-600" />
          <div className="grid grid-cols-7 gap-4 mt-6">
            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium">Address 1</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>

            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium">
                Town/Village/City
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">District</label>
              <select
                name="selectCountry"
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
                name="selectCountry"
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
                name="selectCountry"
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
              <label className="block text-sm font-medium">Zip Code</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
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
              <span>
                Current Address
                
              </span>
            </h3>
            <div className="flex items-center mb-4 mt-6">
              <input
                type="checkbox"
                name="sameAsFatherMother"
                checked={formData.sameAsFatherMother}
                onChange={handleChange}
                className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded-3xl"
              />
              <label className="text-sm">Same as Permanent Address</label>
            </div>
          </div><hr className="border-gray-600" />
          <div className="grid grid-cols-7 gap-4 mt-4">
            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium">Address 1</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>

            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium">
                Town/Village/City
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">District</label>
              <select
                name="selectCountry"
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
                name="selectCountry"
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
                name="selectCountry"
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
              <label className="block text-sm font-medium">Zip Code</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>
          </div>
        </section>

        {/* Other informations */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              2
            </span>
            <span>
              Other Information
             
            </span>
          </h3> <hr className="border-gray-600" />
          <div className="grid grid-cols-6  gap-4 mb-4 mt-6">
            <div className="mb-4">
              <label className="block text-sm font-medium">Nationality</label>
              <input
                type="text"
                name="fatherFirstName"
                value={formData.fatherFirstName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Religion</label>
              <select
                name="selectReligion"
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
                name="selectCaste"
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
                name="selecBlood"
                className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
              >
                <option value="">O+</option>
                <option value="Class 1">O-</option>
                <option value="Class 2">A+</option>
                <option value="Class 3">AB+</option>
              </select>
            </div>
            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium">
                Personal Identification Marks
              </label>
              <input
                type="text"
                name="fatherOccupation"
                value={formData.fatherOccupation}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>
          </div>
          <div className=" mb-4">
            <label htmlFor="">
              Is the boy/girl suffering from any disease ? If so give details
            </label>
            <input
              placeholder="Details"
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8 mb-4">
            <div>
              <label htmlFor="">Institution last attendence (if any)</label>
              <input
                placeholder="Details"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>
            <div>
              <label htmlFor="">Transfer Certificate No. & Date (if any)</label>
              <input
                placeholder="Details"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>
          </div>
          <div className=" mb-4">
            <label htmlFor="">Remarks Notes</label>
            <input
              placeholder="Details"
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
            />
          </div>
        </section>

        <div className="flex flex-row justify-center gap-6 py-10">
          <div className="">
            <button
              type="submit"
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
