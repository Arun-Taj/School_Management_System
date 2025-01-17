import React, { useState, useRef, useContext, useEffect } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaUser } from "react-icons/fa";

import { useNavigate, useLocation } from "react-router-dom";

function ViewStudent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location || {};
  const student = state?.student || {};
  const classes = state?.classes || {};

  return (
    <div className="bg-pink-100 min-h-screen p-8">
      <div className="flex gap-4    rounded-3xl p-2">
        <div className="flex items-center space-x-2">
          <FaUser className="text-gray-700" />
          <span className="text-gray-700 font-medium">Students</span>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">View</span>
        </div>
      </div>

      <div className="my-8 text-center">
        <h2 className="text-3xl font-bold text-black">Student Details</h2>
      </div>

      {/* Student Information */}
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
            <label className="font-sans text-base font-bold leading-5 text-left">
              Student's First Name
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.studentFirstName}
            </div>
          </div>

          {/* Student's Middle Name */}
          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Student's Middle Name
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.studentMiddleName}
            </div>
          </div>

          {/* Student's Last Name */}
          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Student's Last Name
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.studentLastName}
            </div>
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Gender
            </label>
            <div className="mt-1 block w-full p-2  border border-gray-300 rounded-3xl">
              {student.gender}
            </div>
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Date of Birth
            </label>
            <div className="mt-1 block w-full p-2  border border-gray-300 rounded-3xl">
              {student.dateOfBirth}
            </div>
          </div>

          {/* Student Photo */}
          <div className="mb-4 relative">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Student Photo
            </label>
            <div className="rounded-3xl">
              <img
                className="rounded-[50%] w-32 h-32 object-cover"
                src={student.photo}
                alt="no photo"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-6  gap-4">
          {/* Aadhar Number */}
          <div className="mb-4 col-span-2">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Aadhar Number
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.aadharNumber}
            </div>
          </div>

          {/* Mother Tongue */}
          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Mother Tongue
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.motherTongue}
            </div>
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Phone Number
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.phoneNumber}
            </div>
          </div>
          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Alternate Phone No.
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.alternatePhoneNumber}
            </div>
          </div>
          {/* Class of Admission */}
          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Class of Admission
            </label>
            <div className="mt-1 block w-full p-2  border border-gray-300 rounded-3xl">
              {classes.find((cls) => cls.id == student.classOfAdmission)?.name}
            </div>
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
            <label className="font-sans text-base font-bold leading-5 text-left">
              Father's First Name
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.fatherFirstName}
            </div>
          </div>
          {/* Father's Middle Name */}
          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Father's Middle Name
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.fatherMiddleName}
            </div>
          </div>
          {/* Father's Last Name */}
          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Father's Last Name
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.fatherLastName}
            </div>
          </div>{" "}
          {/* Father's Aadhar Number */}
          <div className="mb-4 col-span-2">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Aadhar Number
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.fatherAadharNumber}
            </div>
          </div>
          {/* Father's Occupation */}
          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Occupation
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.fatherOccupation}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-6  gap-4">
          {/* Mother's First Name */}
          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Mother's First Name
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.motherFirstName}
            </div>
          </div>
          {/* Mother's Middle Name */}
          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Mother's Middle Name
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.motherMiddleName}
            </div>
          </div>
          {/* Mother's Last Name */}
          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Mother's Last Name
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.motherLastName}
            </div>
          </div>
          {/* Mother's Aadhar Number */}
          <div className="mb-4 col-span-2">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Aadhar Number
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.motherAadharNumber}
            </div>
          </div>
          {/* Mother's Occupation */}
          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Occupation
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.motherOccupation}
            </div>
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
        </div>
        <hr className="border-gray-600" />

        <div className="grid grid-cols-6 gap-4 mt-6">
          {/* Guardian's First Name */}
          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Guardian's First Name
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.guardianFirstName}
            </div>{" "}
          </div>

          {/* Guardian's Middle Name */}
          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Guardian's Middle Name
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.guardianMiddleName}
            </div>
          </div>

          {/* Guardian's Last Name */}
          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Guardian's Last Name
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.guardianLastName}
            </div>
          </div>

          {/* Guardian's Aadhar Number */}
          <div className="mb-4 col-span-2">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Aadhar Number
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.guardianAadharNumber}
            </div>
          </div>

          {/* Guardian's Occupation */}
          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Occupation
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.guardianOccupation}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4  gap-4">
          {/* Relation with Local Guardian */}
          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Relation with Local Guardian
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.relationWithGuardian}
            </div>
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Phone Number
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.guardianPhoneNumber}
            </div>
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
            <label className="font-sans text-base font-bold leading-5 text-left">
              Address 1
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.pAddress1}
            </div>
          </div>

          <div className="mb-4 col-span-2">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Town/Village/City
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.ptownVillageCity}
            </div>
          </div>

          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Country
            </label>
            <div className="mt-1 block w-full p-2  border border-gray-300 rounded-3xl">
              {student.pcountry}
            </div>
          </div>

          <div className="mb-4 ">
            <label className="font-sans text-base font-bold leading-5 text-left">
              State
            </label>
            <div className="mt-1 block w-full p-2  border border-gray-300 rounded-3xl">
              {student.pstate}
            </div>
          </div>
          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              District
            </label>
            <div className="mt-1 block w-full p-2  border border-gray-300 rounded-3xl">
              {student.pdistrict}
            </div>
          </div>

          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Pin Code
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.pzipCode}
            </div>
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
            <div className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded-3xl" />
            <label className="text-sm">Same as Permanent Address</label>
          </div>
        </div>
        <hr className="border-gray-600" />
        <div className="grid grid-cols-7 gap-4 mt-4">
          <div className="mb-4 col-span-2">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Address 1
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.cAddress1}
            </div>
          </div>

          <div className="mb-4 col-span-2">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Town/Village/City
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.ctownVillageCity}
            </div>
          </div>

          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Country
            </label>
            <div className="mt-1 block w-full p-2  border border-gray-300 rounded-3xl">
              {student.ccountry}
            </div>
          </div>

          <div className="mb-4 ">
            <label className="font-sans text-base font-bold leading-5 text-left">
              State
            </label>
            <div className="mt-1 block w-full p-2  border border-gray-300 rounded-3xl">
              {student.cstate}
            </div>
          </div>
          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              District
            </label>
            <div className="mt-1 block w-full p-2  border border-gray-300 rounded-3xl">
              {student.cdistrict}
            </div>
          </div>

          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Pin Code
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.czipCode}
            </div>
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
            <label className="font-sans text-base font-bold leading-5 text-left">
              Nationality
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.nationality}
            </div>
          </div>
          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Religion
            </label>
            <div className="mt-1 block w-full p-2  border border-gray-300 rounded-3xl">
              {student.religion}
            </div>
          </div>
          <div className="mb-4">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Caste
            </label>
            <div className="mt-1 block w-full p-2  border border-gray-300 rounded-3xl">
              {student.caste}
            </div>
          </div>{" "}
          <div className="mb-4 ">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Blood Group
            </label>
            <div className="mt-1 block w-full p-2  border border-gray-300 rounded-3xl">
              {student.bloodGroup}
            </div>
          </div>
          <div className="mb-4 col-span-2">
            <label className="font-sans text-base font-bold leading-5 text-left">
              Personal Identification Marks
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.personalIdentification}
            </div>
          </div>
        </div>
        <div className=" mb-4">
          <label
            htmlFor=""
            className="font-sans text-base font-bold leading-5 text-left"
          >
            Is the boy/girl suffering from any disease ? If so, give details
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
            {student.disease}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8 mb-4">
          <div>
            <label
              htmlFor=""
              className="font-sans text-base font-bold leading-5 text-left"
            >
              Institution last attendence (if any)
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.lastAttendance}
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className="font-sans text-base font-bold leading-5 text-left"
            >
              Transfer Certificate No. & Date (if any)
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
              {student.transferCertificate}
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
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
            {student.remarks}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ViewStudent;
