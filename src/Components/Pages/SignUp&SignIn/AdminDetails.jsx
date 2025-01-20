import React, { useRef, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoIosArrowDropleft } from "react-icons/io";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import StateDistrictSelect from "./StatesDistricts";
import * as Yup from "yup";

function AdminDetails({
  onBackClick,
  adminDetailsData,
  setAdminDetailsData,
  formRef,
}) {
  const aadharRegExp = /^(?!0)\d{12}$/;
  const phoneRegExp = /^(?:[7-9]\d{9})$/;

  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const [startDate, setStartDate] = useState(null);
  const datePickerRef = useRef(null); // Use ref to control DatePicker

  const [photoPreview1, setPhotoPreview1] = useState(null); // Preview for first photo
  const [photoPreview2, setPhotoPreview2] = useState(null); // Preview for passport photo

  // Formik validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    gender: Yup.string().required("Gender is required"),

    dateOfBirth: Yup.date()
      .nullable() // Allows for null values initially
      .required("Date of Birth is required"), // Field is required

    // altPhone: Yup.string()
    //   .matches(
    //     phoneRegExp,
    //     "Number must exactly 10-digit starting with 7, 8, or 9"
    //   )
    //   .required("Phone number is required"),
    aadhaarNumber: Yup.string()
      .matches(
        aadharRegExp,
        "Number must be exactly 12 digits and cannot start with 0"
      )
      .required("Aadhar number is required"),
    address1: Yup.string().required("Address required"),
    uploadPhoto: Yup.mixed().required("Photo  required"),
    //townVillageCity: Yup.string().required("Town/village/city required"),
    district: Yup.string().required("District required"),
    state: Yup.string().required("State required"),
    country: Yup.string().required("Country required"),
    nationality: Yup.string().required("Nationality required"),
    religion: Yup.string().required("Religion required"),
    // pinCode: Yup.string()
    //   .matches(/^\d{6}$/, "Enter a valid Pin Code with 6 digits")
    //   .required("Pin Code required"),
    passportPhoto: Yup.mixed().required("Passport Photo  required"),
  });

  const handlePhotoChange1 = (event, setFieldValue) => {
    const file = event.target.files[0];

    // Check if the file exists
    if (file) {
      // File size check (250KB = 250 * 1024 bytes)
      const maxFileSize = 250 * 1024;
      if (file.size > maxFileSize) {
        alert("File size exceeds 250KB. Please upload a smaller file.");
        return;
      }

      setFieldValue("uploadPhoto", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview1(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoChange2 = (event, setFieldValue) => {
    const file = event.target.files[0];

    // Check if the file exists
    if (file) {
      // File size check (250KB = 250 * 1024 bytes)
      const maxFileSize = 250 * 1024;
      if (file.size > maxFileSize) {
        alert("File size exceeds 250KB. Please upload a smaller file.");
        return;
      }

      setFieldValue("passportPhoto", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview2(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (values) => {
    // console.log("Form submitted values:", values);
    setAdminDetailsData(values); // Save the form data
    onBackClick();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: `url('/black_background.svg')` }}
    >
      <div className="bg-pink-100 rounded-3xl p-4">
        <h1 className="text-center text-xl font-semibold mb-6">
          Admin Details
        </h1>
        <Formik
          innerRef={formRef} // Set Formik instance ref
          initialValues={adminDetailsData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true} // Prevent resetting form on switch
        //validateOnChange={true}
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-3 gap-3  ">
                <div>
                  <Field
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    className="w-full placeholder-black border border-[#5011DD]  rounded-3xl px-4 py-2"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="span"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <Field
                    name="middleName"
                    type="text"
                    placeholder="Middle Name"
                    className="w-full placeholder-black border border-[#5011DD]  rounded-3xl px-4 py-2"
                  />
                </div>
                <div>
                  <Field
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    className="w-full placeholder-black border border-[#5011DD] rounded-3xl px-4 py-2"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="span"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <Field
                    as="select"
                    name="gender"
                    className="w-full placeholder-black border border-[#5011DD] rounded-3xl px-4 py-2 bg-white"
                  >
                    <option value="" disabled>
                      Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="span"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="relative ">
                  <DatePicker
                    selected={values.dateOfBirth}
                    onChange={(date) => {
                      // Format the selected date to YYYY-MM-DD and update Formik state
                      const formattedDate = date.toISOString().slice(0, 10); // Extract date in YYYY-MM-DD format
                      setFieldValue('dateOfBirth', formattedDate); // Update Formik state with the formatted date
                      setStartDate(date); // Optional: Update local state for other uses
                    }}
                    // onChange={(date) => {
                    //   setFieldValue('dateOfBirth', date); // Update Formik state on date change
                    //   setStartDate(date); // Optional: Update local state for other uses
                    // }}
                    showYearDropdown // Enable year dropdown
                    showMonthDropdown // Enable month dropdown
                    dropdownMode="select" // Make dropdowns selectable
                    dateFormat="yyyy-MM-dd" // Customize the date format
                    placeholderText="Date of Birth"
                    ref={datePickerRef}
                    name="dateOfBirth"
                    className="w-full placeholder-black border border-[#5011DD] rounded-3xl px-4 py-2 cursor-pointer"
                  />
                  <FaCalendarAlt
                    className="absolute cursor-pointer right-2 top-3   text-[#5011DD]"
                    onClick={() => datePickerRef.current.setFocus()}
                  />
                  <ErrorMessage
                    name="dateOfBirth"
                    component="span"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <Field
                    type="text"
                    name="altPhone"
                    placeholder="Alternate Phone No."
                    className="w-full placeholder-black border border-[#5011DD] rounded-3xl px-4 py-2"
                  />
                  {/* <ErrorMessage
                    name="altPhone"
                    component="span"
                    className="text-red-500 text-sm"
                  /> */}
                </div>

                <div className="col-span-2">
                  <Field
                    type="text"
                    name="aadhaarNumber"
                    placeholder="Aadhaar Number"
                    className="w-full placeholder-black border border-[#5011DD] rounded-3xl px-4 py-2"
                  />
                  <ErrorMessage
                    name="aadhaarNumber"
                    component="span"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="relative col-span-1">
                  <input
                    type="file"
                    ref={fileInputRef1}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={(event) =>
                      handlePhotoChange1(event, setFieldValue)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef1.current.click()}
                    className="w-full placeholder-black bg-white border border-[#5011DD] rounded-3xl px-8 py-2 flex items-center justify-between"
                  >
                    Upload Photo <MdOutlineFileUpload />
                  </button>
                  <ErrorMessage
                    name="uploadPhoto"
                    component="span"
                    className="text-red-500 text-sm"
                  />
                  {photoPreview1 && (
                    <img
                      src={photoPreview1}
                      alt="Preview"
                      className="mt-2 w-20 h-20 rounded-full object-cover"
                    />
                  )}
                </div>
                <div className="col-span-2">
                  <Field
                    type="text"
                    name="address1"
                    placeholder="Address 1"
                    className="w-full placeholder-black border border-[#5011DD] rounded-3xl px-4 py-2"
                  />
                  <ErrorMessage
                    name="address1"
                    component="span"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="col-span-1">
                  <Field
                    type="text"
                    name="townVillageCity"
                    placeholder="Town / Village / City"
                    className="w-full placeholder-black border border-[#5011DD] rounded-3xl px-4 py-2"
                  />
                  <ErrorMessage
                    name="townVillageCity"
                    component="span"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Field
                    as="select"
                    name="country"
                    className="w-full placeholder-black border border-[#5011DD] rounded-3xl px-4 py-2 bg-white"
                  >
                    <option value="" disabled>
                      Country
                    </option>
                    <option value="india">India</option>
                  </Field>
                  <ErrorMessage
                    name="country"
                    component="span"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <StateDistrictSelect
                    setFieldValue={setFieldValue}
                    selectedState={values.state}
                    selectedDistrict={values.district}
                  />
                </div>

                <div>
                  <Field
                    type="text"
                    name="pinCode"
                    placeholder="Pin Code"
                    className="w-full placeholder-black border border-[#5011DD] rounded-3xl px-4 py-2"
                  />
                  <ErrorMessage
                    name="pinCode"
                    component="span"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Field
                    type="text"
                    name="nationality"
                    placeholder="Nationality"
                    className="w-full placeholder-black border border-[#5011DD] rounded-3xl px-4 py-2"
                  />
                  <ErrorMessage
                    name="nationality"
                    component="span"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <Field
                    as="select"
                    name="religion"
                    className="w-full bg-white border border-[#5011DD] rounded-3xl px-4 py-2"
                  >
                    <option value="" selected disabled>
                      Religion
                    </option>
                    <option value="Hindu">Hindu</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Christian">Christian</option>
                    <option value="Sikh">Sikh</option>
                    <option value="Buddhist">Buddhist</option>
                    <option value="Jains">Jains</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="religion"
                    component="span"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="relative">
                  <input
                    type="file"
                    ref={fileInputRef2}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={(event) =>
                      handlePhotoChange2(event, setFieldValue)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef2.current.click()}
                    className="w-full bg-white border border-[#5011DD] placeholder-black rounded-3xl px-8 py-2 flex items-center justify-between"
                  >
                    Passport Photo <MdOutlineFileUpload />
                  </button>
                  <ErrorMessage
                    name="passportPhoto"
                    component="span"
                    className="text-red-500 text-sm"
                  />
                  {photoPreview2 && (
                    <img
                      src={photoPreview2}
                      alt="Preview"
                      className="mt-2 w-20 h-20 rounded-full object-cover"
                    />
                  )}
                </div>
              </div>

              <button
                type="submit"
                onClick={onBackClick}
                className="mt-4 text-center"
              >
                <IoIosArrowDropleft size={24} className="cursor-pointer" />
              </button>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AdminDetails;