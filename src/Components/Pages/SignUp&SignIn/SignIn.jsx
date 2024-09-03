import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const SignInForm = () => {


const navigate=useNavigate();

const initialFormValues = {
  username: "",
  password: "",
  rememberMe:false
};
const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  


  const handleLogin = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const loggedUser = JSON.parse(localStorage.getItem("id")); // Ensure the key matches your registration key

    // Check if the entered username and password match the stored values
    if (loggedUser && formValues.username === loggedUser.username && formValues.password === loggedUser.password) {
      navigate("/");
    } else {
      // Set error messages for incorrect username/password
      setFormErrors({
        username: formValues.username===""? "User name is required!": formValues.username !== loggedUser.username ? "Incorrect username" : "",
        password: formValues.password===""? "Password is required!": formValues.password !== loggedUser.password ? "Incorrect password" : "",
      });
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUpClick = () => {
    navigate('/signup'); 
  };

  return (
    <div className="flex justify-center items-center bg-pink-100">
      <div className="flex bg-white shadow-2xl rounded-lg w-full max-w-5xl ">
        {/* Left Side */}
        <div className="w-1/2 p-8">
          <p className="pb-10">Logo</p>
          <h2 className="text-2xl font-semibold mb-2 text-center">
            Welcome back
          </h2>
          <p className="text-center text-sm pb-20">
            Simplify your workflow and boost your productivity with Demo App. Get started today.
          </p>
          <form onSubmit={handleLogin}>
            {/* Username */}
            <div className="mb-4 ">
              <input
                type="text"
                name="username"
                placeholder="User Name"
                value={formValues.username}
                onChange={handleChange}
                className="w-full border border-solid border-[#5011DD] p-2 rounded-full"
              />
              {formErrors.username && (
                <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
                className="w-full border border-solid border-[#5011DD] p-2  pr-10 rounded-full"
              />
              <span
                className="absolute right-2 top-1/2 transform -translate-y-1/2  cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
              )}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formValues.rememberMe}
                  onChange={handleChange}
                  className="mr-2 "
                />
                <label htmlFor="rememberMe" className="text-sm">
                  Remember Me
                </label>
              </div>
              <button className="text-sm text-blue-500">
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-pink-500 text-white p-2 rounded-full px-6 hover:bg-pink-600"
              >
                Log in
              </button>
            </div>
          </form>

          <p className="text-center mt-4 text-sm">
            Don't have an account?
            <button className="text-blue-500" onClick={handleSignUpClick}>
              Sign up
            </button>
          </p>
        </div>

        {/* Right Side */}
        <div className="w-1/2 bg-[#f5eae4] flex flex-col justify-center items-center p-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Start Managing Today
          </h2>
          <p className="text-center text-sm">
            Stop struggling with common tasks and focus on the real choke points, with our powerful School Management Platform.
          </p>
          <img
            src="src/assets/image.svg"
            alt="Manage Illustration"
            className="mt-6"
          />
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
