import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const SignInForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const errors = {};
    const usernameRegex = /^.{3,}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!formData.username) {
      errors.username = "Username is required.";
    } else if (!usernameRegex.test(formData.username)) {
      errors.username = "Username must be at least 3 characters long.";
    }

    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (!passwordRegex.test(formData.password)) {
      errors.password =
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Handle form submission
      console.log("Form submitted successfully!");

      // Clear form data after successful submission
      setFormData({
        username: "",
        password: "",
        rememberMe: false,
      });
      setFormErrors({});
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex bg-white shadow-md rounded-lg w-full max-w-4xl">
        {/* Left Side */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-semibold mb-2 text-center">
            Welcome back
          </h2>
          <p className="text-center text-sm mb-8">
            Simplify your workflow and boost your productivity with Demo App. Get started today.
          </p>
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-4">
              <input
                type="text"
                name="username"
                placeholder="User Name"
                value={formData.username}
                onChange={handleChange}
                className="w-full border border-solid border-[#5011DD] p-2 rounded-lg"
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
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-solid border-[#5011DD] p-2 rounded-lg pr-10"
              />
              <span
                className="absolute right-2 top-2 cursor-pointer"
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
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="rememberMe" className="text-sm">
                  Remember Me
                </label>
              </div>
              <a href="#" className="text-sm text-blue-500">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-pink-500 text-white p-2 rounded-lg hover:bg-pink-600 w-full"
              >
                Log in
              </button>
            </div>
          </form>

          <p className="text-center mt-4 text-sm">
            Don't have an account?
            <a href="#" className="text-blue-500">
              Sign up
            </a>
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
