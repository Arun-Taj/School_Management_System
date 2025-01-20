import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import MainDashboard from "../../DashBoard/MainDashBoard";
import Logo from "../../../assets/Logo.svg";

const SignInForm = () => {
  const navigate = useNavigate();
  const { login, auth, api } = useContext(AuthContext);



  const initialFormValues = {
    username: "",
    password: "",
    rememberMe: false,
  };
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);


  React.useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/dashboard"); //navigate 
    }

  }, [auth, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset any previous form errors
    setFormErrors({});
    // Check for empty username or password
    if (!formValues.username || !formValues.password) {
      setFormErrors({
        username: !formValues.username ? "Username is required" : "",
        password: !formValues.password ? "Password is required" : "",
      });
      return; // Stop execution if there are validation errors
    }

    // Try logging in with the provided credentials
    try {
      // Call the login function from context
      const loggedIn = await login(formValues.username, formValues.password);

      if (loggedIn) {
        // If login is successful, navigate to dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      // Handle errors returned by login
      setFormErrors({
        username: err.response?.data?.username || "",
        password: err.response?.data?.password || "Incorrect username or password",
      });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const handleForgotPassword = () => {
    const email = window.prompt("Enter your email address:");

    if (email && email.length > 0) {
      if (validateEmail(email)) {
        console.log("Email:", email);

        const sendToServer = async () => {
          try {
            const response = await api.post("/account/forgot_password/", { email: email });
            console.log(response.data);
            alert("Password reset link sent successfully!");
          } catch (error) {
            // console.log(error);
            alert("Failed to send password reset link.");
          }
        };
        sendToServer();


      } else {
        alert("Please enter a valid email address.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };


  return (
    <div className="flex min-h-screen ">
      <div className="flex justify-center align-middle bg-white w-full">
        {/* Left Side */}
        <div className="w-1/2  h-full flex flex-col justify-center">
          <div className="font-bold text-xl">
            <img src={Logo} alt="Logo" className="w-52 absolute top-4 left-4" />

          </div>
          <div className="flex justify-center ">
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
                <div className="mb-4">
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
                    className="w-full placeholder-black border border-solid border-[#5011DD] p-2 pr-10 rounded-full"
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
                  <button type="button" className="text-sm text-blue-500" onClick={handleForgotPassword}>
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
        <div className="w-1/2 bg-[#f5eae4] h-full flex flex-col justify-center">
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
                src="/image.svg"
                alt="Manage Illustration"
                className="mt-6 opacity-100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SignInForm;
