import React from "react";
import { MdOutlineSettings } from "react-icons/md";
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useEffect, useState } from "react";

const AccountSetting = () => {

  const { api } = useContext(AuthContext);
  const [accountDetails, setAccountDetails] = useState(null);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await api.get("/account/details/");
        // console.log(response.data);

        setAccountDetails(response.data);
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    };
    fetchAccountDetails();
  }, [api]);

  const handleUpdate = async () => {
    // console.log(accountDetails);

    try {
      const response = await api.post("/account/update/", accountDetails);
      // console.log(response.data);
      alert("Account details updated successfully!");
      setPasswordErrors([]);
      setNewPassword("");

    } catch (error) {
      try {
        error.response.data.errors.length > 0 && setPasswordErrors(error.response.data.errors);

      } catch (typeError) {
        alert("Something went wrong");

      }


    }
  };

  return (
    <div className="p-8 bg-pink-100 h-full">
      <div className="flex gap-4 bg-white rounded-3xl p-2 ">
        <div className="flex items-center space-x-2">
          <MdOutlineSettings className="text-gray-700" />
          <span className="text-gray-700 font-medium">Account Setting</span>
        </div>
      </div>

      <div className="flex justify-center gap-8 pt-10">
        {/* Left side form */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div >
              <label className="block text-sm font-medium text-gray-700 text-center">
                User Name
              </label>
              <input
                type="text"
                className="mt-1 p-2 w-72 rounded-full border-gray-300 shadow-sm text-center"
                placeholder="user name"
                value={accountDetails?.username}
                onChange={(e) => setAccountDetails({ ...accountDetails, username: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-center">
                Email
              </label>
              <input
                type="email"
                className="mt-1 block w-full p-2 rounded-full border-gray-300 shadow-sm text-center"
                placeholder="email"
                value={accountDetails?.email}
                onChange={(e) => setAccountDetails({ ...accountDetails, email: e.target.value })}

              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-center">
                Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full p-2 rounded-full border-gray-300 shadow-sm text-center"
                placeholder="set new password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setAccountDetails({ ...accountDetails, password: e.target.value });
                }
                }
              />
              <div className="text-red-500 max-w-xs">{passwordErrors.map((error, index) => <li key={index} className="mt-2">{error}</li>)}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-center">
                Phone Number
              </label>
              <input
                type="tel"
                className="mt-1 block w-full p-2 rounded-full border-gray-300 shadow-sm text-center"
                placeholder="phone no."
                value={accountDetails?.phone}
                onChange={(e) => setAccountDetails({ ...accountDetails, phone: e.target.value })}

              />
            </div>
          </div>

          <div className="flex justify-center pt-10">

            <button className="p-2 px-6 bg-pink-500 text-white font-bold rounded-full shadow-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 "
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>

        </div>

        {/* Right side account details */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-800">Account Details</h2>
          <div className="mt-4 space-y-2">
            <div>
              <span className="text-gray-500">User Name: </span>
              <span className="font-semibold">{accountDetails?.username}</span>
            </div>
            <div>
              <span className="text-gray-500">Password: </span>
              <span className="font-semibold">********</span>
            </div>
            <div>
              <span className="text-gray-500">Subscription: </span>
              <span className="font-semibold">Demo</span>
            </div>
            <div>
              <span className="text-gray-500">Expiry: </span>
              <span className="font-semibold">00-00-0000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
