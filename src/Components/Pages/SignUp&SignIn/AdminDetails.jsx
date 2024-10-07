import React, { useRef, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoIosArrowDropleft } from "react-icons/io";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function AdminDetails({ onBackClick, adminDetailsData, setAdminDetailsData,formRef  }) {


  const aadharRegExp = /^\d{12}$/;
const phoneRegExp = /^\d{10}$/;

  

  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const [photoPreview1, setPhotoPreview1] = useState(null); // Preview for first photo
  const [photoPreview2, setPhotoPreview2] = useState(null); // Preview for passport photo

  // Formik validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    gender: Yup.string().required("Gender is required"),
    dateOfBirth: Yup.string().matches(
      /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/,
      "Date must be in MM/DD/YYYY format"
    )
    .required("DOB is required"),
    aadhaarNumber: Yup.string()
  .matches(/^[2-9]{1}[0-9]{11}$/, 'Aadhaar Number must be exactly 12 digits and cannot start with 0 or 1')
  .required('Aadhaar number is required'),
  phoneNumber: Yup.string()
  .matches(/^[6-9]{1}[0-9]{9}$/, 'Phone No must be exactly 10 digits and start with 6, 7, 8, or 9')
  .required('Phone number is required'),

    address1: Yup.string().required("Address required"),
    uploadPhoto: Yup.mixed().required("Photo is required"),
    townVillageCity: Yup.string().required("Town/village/city required"),
    district: Yup.string().required("District required"),
    state: Yup.string().required("State required"),
    country: Yup.string().required("Country required"),
    nationality: Yup.string().required("Nationality required"),
    pinCode: Yup.string()
      .matches(/^\d{5,6}$/, "Enter a valid Pin Code")
      .required("Pin Code required"),
    passportPhoto: Yup.mixed().required("Passport Photo is required"),
  });


  const handlePhotoChange1 = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
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
    if (file) {
      setFieldValue("passportPhoto", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview2(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (values) => {
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
          enableReinitialize={true}  // Prevent resetting form on switch
          //validateOnChange={true}
    
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-4" >
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
                <div>
                  <Field
                    type="text"
                    name="dateOfBirth"
                    placeholder="Date of Birth"
                    className="w-full placeholder-black border border-[#5011DD] rounded-3xl px-4 py-2"
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
                    name="phoneNumber"
                    placeholder="Phone No."
                    className="w-full placeholder-black border border-[#5011DD] rounded-3xl px-4 py-2"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="span"
                    className="text-red-500 text-sm"
                  />
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
                    name="district"
                    className="w-full placeholder-black border border-[#5011DD] rounded-3xl px-4 py-2 bg-white"
                  >
                    <option value="" disabled>
                      District
                    </option>
                    <option value="jhapa">Jhapa</option>
                    <option value="morang">Morang</option>
                    <option value="kathmandu">Kathmandu</option>
                    <option value="biratnagar">Biratnagar</option>
                    <option value="other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="district"
                    component="span"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <Field
                    as="select"
                    name="state"
                    className="w-full placeholder-black border border-[#5011DD]  rounded-3xl px-4 py-2 bg-white"
                  >
                    <option value="" disabled>
                      State
                    </option>
                    <option value="koshi">Koshi</option>
                    <option value="bagmati">Bagmati</option>
                    <option value="other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="state"
                    component="span"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <Field
                    as="select"
                    name="country"
                    className="w-full placeholder-black border border-[#5011DD] rounded-3xl px-4 py-2 bg-white"
                  >
                    <option value="" disabled>
                      Country
                    </option>
                    <option value="nepal">Nepal</option>
                    <option value="india">India</option>
                    <option value="other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="country"
                    component="span"
                    className="text-red-500 text-sm"
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
                    type="text"
                    name="religion"
                    placeholder="Religion"
                    className="w-full placeholder-black border border-[#5011DD] rounded-3xl px-4 py-2"
                  />
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
