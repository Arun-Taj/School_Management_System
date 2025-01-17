import React, { useState, useRef, useContext, useEffect } from "react";
import { MdBusinessCenter } from "react-icons/md";
import { AuthContext } from "../../../context/AuthContext";
import { useLocation } from "react-router-dom";

function ViewEmployee() {
  const { api } = useContext(AuthContext);
  const [roles, setRoles] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const location = useLocation(); // Get location object
  const { state } = location || {}; // Destructure state from location safely

  const employee = state?.employee || {};
  // console.log(employee);

  useEffect(() => {
    const getRoles = async () => {
      try {
        const response = await api.get("/get_roles/");

        if (response.data.length > 0) {
          setRoles(response.data);
        } else {
          alert("Please request admin to add roles first, then try again");
          navigate("/employees/allEmployees");
        }
      } catch (error) {
        alert("Something went wrong");
        // console.error("Error fetching roles:", error);
      }
    };

    getRoles();

    const getSubjects = async () => {
      try {
        const response = await api.get("/get_subjects_for_config/");

        if (response.data.length > 0) {
          setSubjects(response.data);
        } else {
          alert("Please add subjects first, then try again");
          navigate("/config/createSub");
        }
      } catch (error) {
        alert("Something went wrong");
        // console.error("Error fetching subjects:", error);
      }
    };

    getSubjects();
  }, [api]);

  return (
    employee && (
      <div className="bg-pink-100 min-h-screen p-8">
        <div className="flex gap-4    rounded-3xl p-2">
          <div className="flex items-center space-x-2">
            <MdBusinessCenter className="text-gray-700" />
            <span className="text-gray-700 font-medium">Employee</span>
          </div>

          {/* Vertical divider */}
          <div className="border-l border-gray-700 h-6"></div>

          {/* "Add New" text */}
          <div>
            <span className="text-gray-700 font-medium">View</span>
          </div>
        </div>

        <div className=" ">
          <div className="my-8 text-center">
            <h2 className="text-3xl font-bold text-black">Employee Details</h2>
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
                <div
                  name="employeeFirstName"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                >
                  {employee.employeeFirstName}
                </div>
              </div>

              <div className="mb-4">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Middle Name
                </label>
                <div
                  name="employeeMiddleName"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                >
                  {employee.employeeMiddleName}
                </div>
              </div>

              <div className="mb-4">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Last Name
                </label>
                <div
                  name="employeeLastName"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                >
                  {employee.employeeLastName}
                </div>
              </div>

              {/* Gender */}
              <div className="mb-4">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Gender
                </label>
                <div
                  name="gender"
                  className="mt-1 block w-full p-2  border border-gray-300 rounded-3xl"
                >
                  {employee.gender}
                </div>
              </div>

              {/* Date of Birth */}
              <div className="mb-4">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Date of Birth
                </label>
                <div
                  type="date"
                  name="dateOfBirth"
                  className="mt-1 block w-full p-2 rounded-3xl"
                >
                  {employee.dateOfBirth}
                </div>
              </div>

              {/* Employee Photo */}
              <div className="relative mb-4">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Employee Photo
                </label>
                <img
                  src={employee.photoUpload}
                  alt="no photo"
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-6  gap-4">
              {/* Aadhar Number */}
              <div className="mb-4 col-span-2">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Aadhar Number
                </label>
                <div
                  name="aadharNumber"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                >
                  {employee.aadharNumber}
                </div>
              </div>

              <div className="mb-4">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Phone Number
                </label>
                <div
                  name="phoneNumber"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                >
                  {employee.phoneNumber}
                </div>
              </div>

              {/* Phone Number */}
              <div className="mb-4">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Alternate Phone No.
                </label>
                <div
                  name="alternatePhoneNumber"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                >
                  {employee.alternatePhoneNumber}
                </div>
              </div>
              <div className="mb-4">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Email
                </label>
                <div
                  name="email"
                  type="email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                >
                  {employee.email}
                </div>
              </div>

              <div className="mb-4">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Employee Role
                </label>
                <div
                  name="selectRole"
                  className="mt-1 block w-full p-2  border border-gray-300 rounded-3xl"
                >
                  {roles &&
                    roles.find((role) => role.id == employee.selectRole)?.name}
                </div>
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
                <div
                  name="fatherFirstName"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                >
                  {employee.fatherFirstName}
                </div>
              </div>
              {/* Father's Middle Name */}
              <div className="mb-4">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Father's Middle Name
                </label>
                <div
                  name="fatherMiddleName"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                >
                  {employee.fatherMiddleName}
                </div>
              </div>
              {/* Father's Last Name */}
              <div className="mb-4">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Father's Last Name
                </label>
                <div
                  name="fatherLastName"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                >
                  {employee.fatherLastName}
                </div>
              </div>

              <div className="mb-4">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Husband's First Name
                </label>
                <div
                  name="husbandFirstName"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                >
                  {employee.husbandFirstName}
                </div>
              </div>

              <div className="mb-4">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Husband's Middle Name
                </label>
                <div
                  name="husbandMiddleName"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                >
                  {employee.husbandMiddleName}
                </div>
              </div>

              <div className="mb-4">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Husband's Last Name
                </label>
                <div
                  name="husbandLastName"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                >
                  {employee.husbandLastName}
                </div>
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
                <div
                  name="address1"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                >
                  {employee.address1}
                </div>
              </div>

              <div className="mb-4 col-span-2">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Town/Village/City
                </label>
                <div
                  name="townVillageCity"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                >
                  {employee.townVillageCity}
                </div>
              </div>
              <div className="mb-4">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Country
                </label>
                <div
                  name="country"
                  className="mt-1 block w-full p-2  border border-gray-300 rounded-3xl"
                >
                  {employee.country}
                </div>
              </div>
              <div className="mb-4 ">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  State
                </label>
                <div
                  name="state"
                  className="mt-1 block w-full p-2  border border-gray-300 rounded-3xl"
                >
                  {employee.state}
                </div>
              </div>

              <div className="mb-4">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  District
                </label>
                <div
                  name="district"
                  className="mt-1 block w-full p-2  border border-gray-300 rounded-3xl"
                >
                  {employee.district}
                </div>
              </div>

              <div className="mb-4">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Pin Code
                </label>
                <div
                  name="zipCode"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                >
                  {employee.zipCode}
                </div>
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
            </div>
            <hr className="border-gray-600" />

            <div className="grid grid-cols-7 gap-4 pt-4">
              <div className="mb-4 col-span-2">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Address 1
                </label>
                <div
                  name="currentAddress1"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                >
                  {employee.currentAddress1}
                </div>
              </div>

              <div className="mb-4 col-span-2">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Town/Village/City
                </label>
                <div
                  name="currentTownVillageCity"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                >
                  {employee.currentTownVillageCity}
                </div>
              </div>
              <div className="mb-4">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Country
                </label>
                <div
                  name="currentCountry"
                  className="mt-1 block w-full p-2  border border-gray-300 rounded-3xl"
                >
                  {employee.currentCountry}
                </div>
              </div>

              <div className="mb-4">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  State
                </label>
                <div
                  name="currentState"
                  className="mt-1 block w-full p-2  border border-gray-300 rounded-3xl"
                >
                  {employee.currentState}
                </div>
              </div>

              <div className="mb-4">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  District
                </label>
                <div
                  name="currentDistrict"
                  className="mt-1 block w-full p-2  border border-gray-300 rounded-3xl"
                >
                  {employee.currentDistrict}
                </div>
              </div>

              <div className="mb-4">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Pin Code
                </label>
                <div
                  name="currentZipCode"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
                >
                  {employee.currentZipCode}
                </div>
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
                <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
                  {employee.dateOfJoining}
                </div>
              </div>
              <div className="mb-4">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Nationality
                </label>
                <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
                  {employee.nationality}
                </div>
              </div>
              <div className="mb-4">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Religion
                </label>
                <div className="mt-1 block w-full p-2  border border-gray-300 rounded-3xl">
                  {employee.religion}
                </div>
              </div>
              <div className="mb-4">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Caste
                </label>
                <div
                  name="caste"
                  className="mt-1 block w-full p-2  border border-gray-300 rounded-3xl"
                >
                  {employee.caste}
                </div>
              </div>{" "}
              <div className="mb-4 ">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Blood Group
                </label>
                <div
                  name="bloodGroup"
                  className="mt-1 block w-full p-2  border border-gray-300 rounded-3xl"
                >
                  {employee.bloodGroup}
                </div>
              </div>
              <div className="relative mb-4">
                {employee.bioData ? (
                  <a
                    href={employee.bioData}
                    target="_blank"
                    className="text-blue-600 font-semibold cursor-pointer hover:underline"
                  >
                    View Biodata
                  </a>
                ) : (
                  <div className="text-dark-600 font-semibold cursor-pointer">
                    Biodata Not provided
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-6 gap-4">
              <div className="mb-4 col-span-2">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Educational Qualification
                </label>
                <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
                  {employee.educationalDetails ?? "Not provided"}
                </div>
              </div>

              <div className="mb-4">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Experience
                </label>
                <div className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl">
                  {employee.experience ?? "Not provided"}
                </div>
              </div>

              <div className="mb-4 ">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Main Subject
                </label>
                <div className="mt-1 block w-full p-2  border border-gray-300 rounded-3xl">
                  {employee.mainSubject
                    ? subjects &&
                      subjects.find(
                        (subject) => subject.id == employee.mainSubject
                      )?.name
                    : "Not provided"}
                </div>
              </div>

              {/* Complementry subjects */}
              <div className="mb-4 col-span-2">
                <label className="font-sans text-base font-bold leading-5 text-left">
                  Complimentary Subjects
                </label>
                <div className="mt-1 block w-full p-2  border border-gray-300 rounded-3xl">
                  {employee.complementarySubjects
                    ? subjects &&
                      subjects
                        .filter((subject) =>
                          employee.complementarySubjects.includes(subject.id)
                        )
                        .map((subject) => subject.name)
                        .join(", ")
                    : "Not provided"}
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
                {employee.remarks ?? "Not provided"}
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  );
}

export default ViewEmployee;
