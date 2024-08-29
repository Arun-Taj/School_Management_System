import React from "react";
import { MdOutlineSettings } from "react-icons/md";

const AccountSetting = () => {
  return (
    <div className="p-8 bg-pink-100 h-full">
      <div className="flex gap-4 bg-white rounded-3xl p-2 ">
        <div className="flex items-center space-x-2">
          <MdOutlineSettings className="text-gray-700" />
          <span className="text-gray-700 font-medium">Profile</span>
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
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-center">
                Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full p-2 rounded-full border-gray-300 shadow-sm text-center"
                placeholder="password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-center">
                Phone Number
              </label>
              <input
                type="tel"
                className="mt-1 block w-full p-2 rounded-full border-gray-300 shadow-sm text-center"
                placeholder="phone no."
              />
            </div>
          </div>

          <div className="flex justify-center pt-10">

            <button className="p-2 px-6 bg-pink-500 text-white font-bold rounded-full shadow-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 ">
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
              <span className="font-semibold">newuser123</span>
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
