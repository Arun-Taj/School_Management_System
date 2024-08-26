import React, { useRef, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";   

function SchoolDetails() {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
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
        <form className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 ">
              <input
                type="text"
                placeholder="Name of School"
                className="w-full border border-gray-300 rounded-3xl px-4 py-2 placeholder-black"
              />
            </div>
            <div className="col-span-1 relative">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                className="rounded-3xl"
              />
              <button
                type="button"
                onClick={handleUploadClick}
                className="w-full bg-white border border-gray-300 rounded-3xl px-4 p-2 flex flex-row items-start justify-between"
              >
                Upload Logo <MdOutlineFileUpload />
              </button>
            </div>
            <div className="col-span-2">
              <input
                type="text"
                placeholder="Tag line (optional)"
                className="w-full border border-gray-300 rounded-3xl px-4 py-2 placeholder-black    "
              />
            </div>
            <div className="col-span-1">
              <select className="w-full bg-white border border-gray-300 rounded-3xl px-4 py-2 ">
                <option disabled selected>
                   School Board
                </option>
                <option value="cbse">CBSE</option>
                <option value="icse">ICSE</option>
                <option value="state">State Board</option>
                <option value="ib">IB</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="col-span-2">
              <input
                type="text"
                placeholder="Address 1"
                className="w-full border border-gray-300 rounded-3xl px-4 py-2 placeholder-black"
              />
            </div>
            <div className="col-span-1">
              <input
                type="text"
                placeholder="Town / Village / City"
                className="w-full border border-gray-300 rounded-3xl px-4 py-2 placeholder-black"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
          <select className="w-full bg-white border border-gray-300 rounded-3xl px-4 py-2 ">
                <option value="" disabled selected>
                 District
                </option>
                <option value="jhapa">Jhapa</option>
                <option value="morang">Morang</option>
                <option value="kathmandu">Kathmandu</option>
                <option value="biratnagar">Biratnagar</option>
                <option value="other">Other</option>
              </select>

              <select className="w-full bg-white border border-gray-300 rounded-3xl px-4 py-2 ">
                <option value="" disabled selected>
                  State
                </option>
                <option value="koshi">Koshi</option>
                <option value="bagmati">Bagmati</option>
               
                <option value="other">Other</option>
              </select>

            <select className="w-full bg-white border border-gray-300 rounded-3xl px-4 py-2 ">
                <option value="" disabled selected>
                  Country
                </option>
                <option value="Nepal">Nepal</option>
                <option value="india">India</option>
               
                <option value="other">Other</option>
              </select>
            <input
              type="text"
              placeholder="Pin Code"
              className="col-span-1 border border-gray-300 rounded-3xl px-4 py-2 placeholder-black"
            />
          </div>
          <IoIosArrowDropright size={24}/>
        </form>
      </div>
    </div>
  );
}

export default SchoolDetails;