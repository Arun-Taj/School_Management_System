import React from "react";

function TableReceipt() {
  const studentInfo = [
    { label: "Student Name", value: "Rahul Kumar Debnath" },
    { label: "Class", value: "08" },
    { label: "Father's Name", value: "Subham Kumar Debnath" },
    { label: "Roll No.", value: "205" },
  ];

  const feeDetailsLeft = [
    { id: "01", head: "Monthly Fee", amount: "700" },
    { id: "02", head: "Admission Fee", amount: "1500" },
    { id: "03", head: "Registration Fee", amount: "00" },
    { id: "04", head: "Fine", amount: "00" },
    { id: "05", head: "Transport Fee", amount: "250" },
  ];

  const feeDetailsRight = [
    { id: "06", head: "Old Balance", amount: "7000" },
    { id: "07", head: "Late Fee", amount: "00" },
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const feeSummary = [
    { label: "Total Fees", value: "3150" },
    { label: "Concession (%)", value: "05" },
    { label: "Concession (Amount)", value: "00" },
    { label: "Net Fees", value: "2992" },
    { label: "Deposit", value: "2000" },
  ];

  return (
    <div className=" bg-pink-100 ">
      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* Student Information */}
        <div className="grid grid-cols-2 gap-4">
          {studentInfo.map((info, index) => (
            <div key={index} className="text-center">
              <p className="font-bold">{info.label}</p>
              <div className="bg-gray-200 p-2 rounded-3xl border border-gray-300">
                <p className="">{info.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Month Selection */}
        <div className="grid grid-cols-3 gap-4 ">
          <h2 className=" col-span-3 text-center font-bold  ">Month</h2>
          <div className="col-span-3 p-6 bg-white rounded-lg">
            {/* Container for horizontal scrolling */}
            <div className="overflow-x-auto">
              {/* Flex container to allow horizontal layout */}
              <div className="flex mt-4" style={{ minWidth: "800px"}}>
              
                {/* Adjust minWidth based on your design */}
                {months.map((month, index) => (
                  <div key={index} className="p-3">
                    {" "}
                    {/* Each month takes 1/4 of the width */}
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> {month}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fee Table */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {[feeDetailsLeft, feeDetailsRight].map((fees, index) => (
          <div key={index} className="bg-white py-4 rounded-lg shadow-md ">
            <table className="w-full text-center">
              <thead>
                <tr>
                  <th className="text-center py-2">Sl No.</th>
                  <th className="text-center py-2">Fee Head</th>
                  <th className="text-center py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((fee, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-[#BCA8EA]" : "bg-[#E3D6FF]"}
                  >
                    <td className="py-2">{fee.id}</td>
                    <td className="py-2">{fee.head}</td>
                    <div
                      className={`${
                        idx % 2 === 0 ? "bg-[#cbc1e4]" : "bg-[#fbfafc]"
                      } rounded-3xl my-1 flex justify-center mr-2`}
                    >
                      <td className="py-2 ">{fee.amount}</td>
                    </div>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Fee Summary */}
      <div className="grid grid-cols-7 gap-4 mb-8">
        {feeSummary.map((summary, index) => (
          <div key={index} className="text-center">
            <p className="text-sm">{summary.label}</p>
            <div className="col-span-1 bg-gray-200 p-2 rounded-3xl text-center border border-gray-400">
              <p className="text-sm ">{summary.value}</p>
            </div>
          </div>
        ))}
        <div className="col-span-2   text-center text-sm">
          <p>Payment Mode</p>
          <select className=" bg-white p-2 rounded-3xl text-cente w-full border border-gray-400">
            <option>Cash</option>
            <option>Card</option>
            <option>Online</option>
          </select>
        </div>
      </div>

      {/* Payment Mode & Other Information */}
      <div className="grid grid-cols-6 gap-4 items-center mb-">
        <div className="col-span-4">
          <p className="text-center">Remarks</p>
          <input
            type="text"
            placeholder="Remarks"
            className="w-full p-2 rounded-full border border-gray-300 focus:outline-none"
          />
        </div>
        <div className="col-span-1 ">
          <p className="text-center">Balance Amount</p>
          <div className="bg-gray-200 p-2 rounded-full text-center border border-gray-400">
            <p className="font-bold">992</p>
          </div>
          
        </div>
        <div className="col-span-1 mt-4">
          <button className="bg-pink-500 text-white py-2 px-8 rounded-full hover:bg-pink-600">
            Submit
          </button>
        </div>
      </div>

      {/* Submit Button */}
    </div>
  );
}

export default TableReceipt;
