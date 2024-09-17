import React, { useRef } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoIosArrowDropright } from "react-icons/io";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SchoolDetails = ({ onAdminClick }) => {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const initialValues = {
    schoolName: "",
    logo: "",
    tagLine: "",
    schoolBoard: "",
    address1: "",
    city: "",
    district: "",
    state: "",
    country: "",
    pinCode: "",
  };

  const validationSchema = Yup.object({
    schoolName: Yup.string().required("School name is required"),
    logo: Yup.mixed().required("Logo is required"),
    schoolBoard: Yup.string().required("School Board is required"),
    address1: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    district: Yup.string().required("District required"),
    state: Yup.string().required("State required"),
    country: Yup.string().required("Country required"),
    pinCode: Yup.string()
      .matches(/^\d{5,6}$/, "Enter a valid Pin Code")
      .required("Pin Code required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
    onAdminClick();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url('src/assets/black background.svg')` }}
    >
      <div className="bg-pink-100 rounded-3xl p-6 w-full max-w-2xl py-32 mx-8">
        <h1 className="text-center text-xl font-semibold mb-6">
          School Details
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <Field
                    type="text"
                    name="schoolName"
                    placeholder="Name of School"
                    className="w-full border border-gray-300 rounded-3xl px-4 py-2 placeholder-black"
                  />
                  <ErrorMessage
                    name="schoolName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="col-span-1 relative">
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(event) =>
                      setFieldValue("logo", event.target.files[0])
                    }
                  />
                  <button
                    type="button"
                    onClick={handleUploadClick}
                    className="w-full bg-white border border-gray-300 rounded-3xl px-4 p-2 flex flex-row items-start justify-between"
                  >
                    Upload Logo <MdOutlineFileUpload />
                  </button>
                  <ErrorMessage
                    name="logo"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <Field
                    type="text"
                    name="tagLine"
                    placeholder="Tag line (optional)"
                    className="w-full border border-gray-300 rounded-3xl px-4 py-2 placeholder-black"
                  />
                </div>
                <div className="col-span-1">
                  <Field
                    as="select"
                    name="schoolBoard"
                    className="w-full bg-white border border-gray-300 rounded-3xl px-4 py-2"
                  >
                    <option value="" disabled>
                      School Board
                    </option>
                    <option value="cbse">CBSE</option>
                    <option value="icse">ICSE</option>
                    <option value="state">State Board</option>
                    <option value="ib">IB</option>
                    <option value="other">Other</option>
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
                    className="w-full border border-gray-300 rounded-3xl px-4 py-2 placeholder-black"
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
                    className="w-full border border-gray-300 rounded-3xl px-4 py-2 placeholder-black"
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
                    name="district"
                    className="w-full bg-white border border-gray-300 rounded-3xl px-4 py-2"
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
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="col-span-1">
                  <Field
                    as="select"
                    name="state"
                    className="w-full bg-white border border-gray-300 rounded-3xl px-4 py-2"
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
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="col-span-1">
                  <Field
                    as="select"
                    name="country"
                    className="w-full bg-white border border-gray-300 rounded-3xl px-4 py-2"
                  >
                    <option value="" disabled>
                      Country
                    </option>
                    <option value="Nepal">Nepal</option>
                    <option value="india">India</option>
                    <option value="other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="col-span-1">
                  <Field
                    type="text"
                    name="pinCode"
                    placeholder="Pin Code"
                    className="w-full border border-gray-300 rounded-3xl px-4 py-2 placeholder-black"
                  />
                  <ErrorMessage
                    name="pinCode"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <button type="submit">
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
