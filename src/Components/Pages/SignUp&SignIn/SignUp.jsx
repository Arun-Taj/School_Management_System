import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
//import axios from "axios";
import Logo from "../../../assets/Logo.svg";

const SignupForm = ({ formData, setFormData, formRef, handleSubmit }) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const phoneRegExp = /^(?:[7-9]\d{9})$/;
  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(
        phoneRegExp,
        "Number must exactly 10-digit starting with 7, 8, or 9"
      )
      .required("Phone number is required"),
    username: Yup.string()
      .min(3, "Username must be at least 3 characters long")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
    terms: Yup.bool().oneOf([true], "You must accept the terms and conditions"),
  });

  return (
    <div className="justify-center items-center min-h-screen flex flex-row">
      <div className="bg-white rounded-3xl p-8 w-full max-w-lg">
        <div className="absolute top-4 left-4">
          <img src={Logo} alt="" className="w-44 h-auto" />
        </div>
        <h2 className="text-2xl font-semibold mb-6 text-center pt-20">
          Register your account
        </h2>
        <Formik
          innerRef={formRef}
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setFormData(values);
            handleSubmit();
          }}
        >
          {() => (
            <Form className="space-y-4">
              {/* Email and Phone */}
              <div className="flex space-x-4">
                <div className="w-full mb-4">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full placeholder-black border border-solid border-[#5011DD] p-2 rounded-3xl"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="w-full mb-4">
                  <Field
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className="w-full placeholder-black border border-solid border-[#5011DD] p-2 rounded-3xl"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              {/* Username */}
              <div className="mb-4">
                <Field
                  type="text"
                  name="username"
                  placeholder="Choose User Name"
                  className="w-full placeholder-black border border-solid border-[#5011DD] p-2 rounded-3xl"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Password and Confirm Password */}
              <div className="relative mb-4">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Choose Password"
                  className="w-full placeholder-black border border-solid border-[#5011DD] p-2 rounded-3xl pr-10"
                />
                <span
                  className="absolute right-2 top-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="relative mb-4">
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full placeholder-black border border-solid border-[#5011DD] p-2 rounded-3xl pr-10"
                />
                <span
                  className="absolute right-2 top-3 cursor-pointer"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Accept Terms */}
              <div className="flex items-center mb-4">
                <Field
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="mr-2 cursor-pointer"
                />
                <label htmlFor="terms" className="text-sm">
                  Accept our
                  <a href="#" className="text-black font-bold px-1">
                    Terms & Condition
                  </a>
                </label>
              </div>
              <ErrorMessage
                name="terms"
                component="div"
                className="text-red-500 text-sm"
              />

              {/* Submit Button */}
              <div className="flex justify-center py-8">
                <button
                  type="submit"
                  className="bg-pink-500 text-white p-2 rounded-3xl text-center px-6 hover:bg-pink-600"
                >
                  Sign up
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <p className="text-center mt-4 text-sm">
          Already have an account?
          <button
            type="button"
            className="text-black font-bold px-2"
            onClick={() => navigate("/")}
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
