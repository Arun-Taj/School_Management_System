import React, { useRef, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoIosArrowDropright } from "react-icons/io";
import { Formik, Form, Field, ErrorMessage } from "formik";
import StateDistrictSelect from "./StatesDistricts";
import * as Yup from "yup";

const SchoolDetails = ({
  onAdminClick,
  schoolDetailsData,
  setSchoolDetailsData,
  formRef,
}) => {
  const fileInputRef = useRef(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleUploadClick = (event, setFieldValue) => {
    const file = event.target.files[0];

    // Check if the file exists
    if (file) {
      // File size check (250KB = 250 * 1024 bytes)
      const maxFileSize = 250 * 1024;
      if (file.size > maxFileSize) {
        alert("File size exceeds 250KB. Please upload a smaller file.");
        return;
      }

      setFieldValue("logo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validationSchema = Yup.object({
    schoolName: Yup.string().required("School name is required"),
    //logo: Yup.mixed().required("Logo is required"),
    schoolBoard: Yup.string().required("School Board is required"),
    address1: Yup.string().required("Address is required"),
    //city: Yup.string().required("City/Village/State is required"),
    district: Yup.string().required("District required"),
    state: Yup.string().required("State required"),
    country: Yup.string().required("Country required"),
    // pinCode: Yup.string()
    //   .matches(/^\d{6}$/, "Enter a valid Pin Code with 6 digits")
    //   .required("Pin Code required"),
  });

  const handleSubmit = (values) => {
    setSchoolDetailsData(values); // Save the form data
    onAdminClick(); // Switch to admin form without submission
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url('/black_background.svg')` }}
    >
      <div className="bg-pink-100 rounded-3xl p-6 w-full max-w-2xl py-16 mx-8">
        <h1 className="text-center text-xl font-semibold mb-6">
          School Details
        </h1>
        <Formik
          innerRef={formRef} // Set Formik instance ref
          initialValues={schoolDetailsData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true} // Prevent resetting form on switch
        //validateOnChange={true}  // Ensure the form updates parent state when fields change
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <Field
                    type="text"
                    name="schoolName"
                    placeholder="Name of School"
                    className="w-full placeholder-black border border-[#5011DD] rounded-3xl px-4 py-2 "
                  />
                  <ErrorMessage
                    name="schoolName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="relative col-span-1">
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={(event) =>
                      handleUploadClick(event, setFieldValue)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="w-full placeholder-black bg-white border border-[#5011DD] rounded-3xl px-8 py-2 flex items-center justify-between"
                  >
                    Upload Logo <MdOutlineFileUpload />
                  </button>
                  <ErrorMessage
                    name="logo"
                    component="span"
                    className="text-red-500 text-sm"
                  />
                  {photoPreview && (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="mt-2 w-20 h-20 rounded-full object-cover"
                      name="logo"
                    />
                  )}
                </div>
                <div className="col-span-2">
                  <Field
                    type="text"
                    name="tagLine"
                    placeholder="Tag line (optional)"
                    className="w-full placeholder-black border border-[#5011DD]  rounded-3xl px-4 py-2 "
                  />
                </div>
                <div className="col-span-1">
                  <Field
                    as="select"
                    name="schoolBoard"
                    className="w-full placeholder-black bg-white border border-[#5011DD]  rounded-3xl px-4 py-2"
                  >
                    <option value="" disabled>
                      School Board
                    </option>
                    <option value="CBSE">CBSE</option>

                    <option value="SEBA">SEBA</option>
                    <option value="AHSEC">AHSEC</option>
                    <option value="OTHERS">OTHERS</option>
                  </Field>
                  <ErrorMessage
                    name="schoolBoard"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <Field
                    type="text"
                    name="address1"
                    placeholder="Address 1"
                    className="w-full placeholder-black border border-[#5011DD]  rounded-3xl px-4 py-2 "
                  />
                  <ErrorMessage
                    name="address1"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="col-span-1">
                  <Field
                    type="text"
                    name="city"
                    placeholder="Town / Village / City"
                    className="w-full placeholder-black  border border-[#5011DD]  rounded-3xl px-4 py-2 "
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1">
                  <Field
                    as="select"
                    name="country"
                    className="w-full  bg-white border border-[#5011DD]  rounded-3xl px-4 py-2"
                  >
                    <option value="" disabled>
                      Country
                    </option>

                    <option value="india">India</option>
                  </Field>
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="col-span-2">
                  <StateDistrictSelect
                    setFieldValue={setFieldValue}
                    selectedState={values.state}
                    selectedDistrict={values.district}
                  />
                </div>

                <div className="col-span-1">
                  <Field
                    type="text"
                    name="pinCode"
                    placeholder="Pin Code"
                    className="w-full  border border-[#5011DD]  rounded-3xl px-4 py-2 placeholder-black"
                  />
                  <ErrorMessage
                    name="pinCode"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <button type="submit" onClick={onAdminClick}>
                <IoIosArrowDropright size={24} />
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SchoolDetails;
