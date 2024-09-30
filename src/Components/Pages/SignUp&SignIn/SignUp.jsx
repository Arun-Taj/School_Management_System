import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const SignupForm = () => {


  const navigate=useNavigate();
  // const handleClick=()=>{
  //   navigate("/")
  // }
  const logInClick=()=>{
    navigate('/')
  }

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/; // Updated regex for exactly 10 digits
    const usernameRegex = /^.{3,}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;

    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format.";
    }

    if (!formData.phone) {
      errors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Phone number must be exactly 10 digits.";
    }

    if (!formData.username) {
      errors.username = "Username is required.";
    } else if (!usernameRegex.test(formData.username)) {
      errors.username = "Username must be at least 3 characters long.";
    }

    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (!passwordRegex.test(formData.password)) {
      errors.password =
        "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.terms) {
      errors.terms = "You must accept the terms and conditions.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Handle form submission
      console.log("Form submitted successfully!");

      localStorage.setItem("id",JSON.stringify(formData));
      
      setFormErrors({});
      navigate("/")
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="justify-center items-center min-h-screen  flex flex-row ">
      
      <div className="bg-white rounded-3xl p-8 w-full max-w-lg">
        <div>Logo</div>
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Register your account
        </h2> 
        <form onSubmit={handleSubmit}>
          {/* Email and Phone */}
          <div className="flex space-x-4">
            <div className="w-full mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full placeholder-black border  border-solid border-[#5011DD] p-2 rounded-3xl"
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>
            <div className="w-full mb-4">
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full placeholder-black border border-solid border-[#5011DD] p-2 rounded-3xl"
              />
              {formErrors.phone && (
                <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
              )}
            </div>
          </div>

          {/* Username */}
          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Choose User Name"
              value={formData.username}
              onChange={handleChange}
              className="w-full placeholder-black border border-solid border-[#5011DD] p-2 rounded-3xl"
            />
            {formErrors.username && (
              <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>
            )}
          </div>

          {/* Password and Confirm Password */}
          <div className=" relative mb-4  ">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Choose Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full placeholder-black border border-solid border-[#5011DD] p-2 rounded-3xl pr-10"
            />
            <span
              className="absolute right-2 top-3 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {formErrors.password && (
              <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
            )}
          </div>

          <div className="relative mb-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full placeholder-black border border-solid border-[#5011DD] p-2 rounded-3xl pr-10"
            />
            <span
              className="absolute right-2 top-3 cursor-pointer"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {formErrors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.confirmPassword}
              </p>
            )}
          </div>

          {/* Accept Terms */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              className="mr-2 cursor-pointer"
            />
            <label htmlFor="terms" className="text-sm">
              Accept our
              <a href="#" className="text-black font-bold px-1">
                Terms & Condition
              </a>
            </label>
          </div>
          {formErrors.terms && (
            <p className="text-red-500 text-sm mt-1">{formErrors.terms}</p>
          )}

          {/* Submit Button */}
          <div className="flex justify-center  py-8">
             <button
            type="submit"
            className=" bg-pink-500 text-white p-2 rounded-3xl text-center px-6 hover:bg-pink-600"
          >
            Sign up
          </button>
          </div>
         
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?
          <button type="button" className="text-black font-bold px-2" onClick={logInClick}>
            Log in
          </button>
        </p>
      </div>
     
    </div>
  );
};

export default SignupForm;
