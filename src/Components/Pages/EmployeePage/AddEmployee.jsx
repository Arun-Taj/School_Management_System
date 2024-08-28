import React, { useState, useRef } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { MdBusinessCenter } from "react-icons/md";
function AddEmployee() {

  // Select complimentry logic
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

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
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

// Reset logic
const formRef = useRef(null);

  const handleReset = () => {
    // Reset the form using the ref
    if (formRef.current) {
      formRef.current.reset();
    }
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
    const { studentFirstName, studentLastName, gender, dateOfBirth, aadharNumber, phoneNumber, email, classOfAdmission } = formData;

    if (!studentFirstName) newErrors.studentFirstName = 'First Name is required.';
    if (!studentLastName) newErrors.studentLastName = 'Last Name is required.';
    if (!gender) newErrors.gender = 'Gender is required.';
    if (!dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required.';
    if (!aadharNumber) newErrors.aadharNumber = 'Aadhar Number is required.';
    if (!phoneNumber) newErrors.phoneNumber = 'Phone Number is required.';
    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid.';
    }
    if (!classOfAdmission) newErrors.classOfAdmission = 'Employee Role is required.';


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
      setErrors({});
    }
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
      <form onSubmit={handleSubmit} ref={formRef} className="max-w-5xl mx-auto  ">
        <div className="my-8 text-center">
          <h2 className="text-3xl font-bold text-black">Employee Form</h2>
        </div>

        {/* Employee Information */}

        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              1
            </span>
            <span>
              Basic Information
              
            </span>
          </h3><hr className="border-gray-600" />
          <div className="grid grid-cols-6  gap-4 mt-6">
            <div className="mb-4">
              <label className="block text-sm font-medium">First Name</label>
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

            <div className="mb-4">
              <label className="block text-sm font-medium">Middle Name</label>
              <input
                type="text"
                name="studentMiddleName"
                value={formData.studentMiddleName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Last Name</label>
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
              <label className="block text-sm font-medium">
                Employee Photo
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

            
            <div className="mb-4">
              <label className="block text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                name="number"
               
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Alternate Phone No.
              </label>
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
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium">Employee Role</label>
              <select
                name="classOfAdmission"
                value={formData.classOfAdmission}
                onChange={handleChange}
                className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
              >
                <option value="" disabled selected>
                  Select Role
                </option>
                <option value="teacher">Teacher</option>
                <option value="peon">Peon</option>
                <option value="finance">Finance Manager</option>
                <option value="labAssistance">Lab Assistance</option>
              </select>
              {errors.classOfAdmission && (
                <p className="text-red-500 text-sm">
                  {errors.classOfAdmission}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Father & Husband Name */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              2
            </span>
            <span>
              Father / Husband Name
              
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
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">
                Husband's First Name
              </label>
              <input
                type="text"
                name="fatherAadharNumber"
                value={formData.fatherAadharNumber}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">
                Husband's Second Name
              </label>
              <input
                type="text"
                name="fatherOccupation"
                value={formData.fatherOccupation}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">
                Husband's Last Name
              </label>
              <input
                type="text"
                name="lastName"
                
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
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
            <h3 className="text-lg font-semibold  flex items-center">
              <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                4
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
          </div>
          <hr className="border-gray-600"/>


          <div className="grid grid-cols-7 gap-4 pt-4">
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
              5
            </span>
            <span>
              Other Information
             
            </span>
          </h3> <hr className="border-gray-600" />
          <div className="grid grid-cols-6  gap-4 mb-4 mt-6">
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Date of Joining
              </label>
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
            <div className="mb-4">
              <label className="block text-sm font-medium">Nationality</label>
              <input
                type="text"
                name="Nationality"
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
              <input
                type="text"
                placeholder="Details"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Experience</label>
              <input
                type="text"
                placeholder="Details"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>

            <div className="mb-4 ">
              <label className="block text-sm font-medium">Main Subject</label>
              <select
                name="mainSubject"
                className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-3xl"
              >
                <option value="" disabled selected>
                  Subject
                </option>
                <option value="Class 1">English</option>
                <option value="Class 2">Maths</option>
                <option value="Class 3">Science</option>
              </select>
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
                      <span className="text-gray-400">Select subjects...</span>
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

export default AddEmployee;
