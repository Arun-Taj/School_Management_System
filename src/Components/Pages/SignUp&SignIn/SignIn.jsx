import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const navigate = useNavigate();

  const initialFormValues = {
    username: "",
    password: "",
    rememberMe: false,
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
    if (
      loggedUser &&
      formValues.username === loggedUser.username &&
      formValues.password === loggedUser.password
    ) {
      navigate("/dashboard");
    } else {
      // Set error messages for incorrect username/password
      setFormErrors({
        username:
          formValues.username === ""
            ? "User name is required!"
            : formValues.username !== loggedUser.username
            ? "Incorrect username"
            : "",
        password:
          formValues.password === ""
            ? "Password is required!"
            : formValues.password !== loggedUser.password
            ? "Incorrect password"
            : "",
      });
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div className=" flex min-h-screen ">
      <div className="flex justify-center bg-white  w-full ">
        {/* Left Side */}

        <div className="w-1/2 p-8 h-full">
          <div className="font-bold text-xl">Logo</div>
          <div className="flex justify-center pt-14">
            <div className="w-80">
              <h2 className="text-2xl font-semibold mb-2 text-center">
                Welcome back
              </h2>
              <p className="text-center text-sm pb-20">
                Simplify your workflow and boost your productivity with Demo
                App. Get started today.
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
                    className="w-full placeholder-black border border-solid border-[#5011DD] p-2 rounded-full"
                  />
                  {formErrors.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.username}
                    </p>
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
                    className="w-full placeholder-black border border-solid border-[#5011DD] p-2  pr-10 rounded-full"
                  />
                  <span
                    className="absolute right-2 top-3 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {formErrors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.password}
                    </p>
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
                      className="mr-2 cursor-pointer"
                    />
                    <label htmlFor="rememberMe" className="text-sm">
                      Remember Me
                    </label>
                  </div>
                  <button type="button" className="text-sm text-blue-500">
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
                <button
                  className="text-black font-bold px-2"
                  onClick={handleSignUpClick}
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/2 bg-[#f5eae4] pt-12 h-full">
          <div className="flex justify-center">
            <div className="w-[400px] ">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Start Managing Today
              </h2>
              <p className="text-center text-sm">
                Stop struggling with common tasks and focus on the real choke
                points, with our powerful School Management Platform.
              </p>
              <img
                src="src/assets/image.svg"
                alt="Manage Illustration"
                className="mt-6 opacity-100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
