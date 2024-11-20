import React, { useState } from "react";

function TableReceipt() {
  const studentInfo = [
    { label: "Student Name", value: "Rahul Kumar Debnath" },
    { label: "Class", value: "08" },
    { label: "Father's Name", value: "Subham Kumar Debnath" },
    { label: "Roll No.", value: "205" },
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


  const [selectedMonths, setSelectedMonths] = useState([]);
  const [admissionFee, setAdmissionFee] = useState(1500);
  const [registrationFee, setRegistrationFee] = useState(1000);
  const [fine, setFine] = useState(0);
  const [transportFee, setTransportFee] = useState(250);
  const [lateFee, setLateFee] = useState(100);
  
  const feePerMonth = 700;
  const oldBalance = 2000;
  const concessionPercent = 5;
  const deposit = 2000;

  const handleMonthSelection = (month) => {
    setSelectedMonths((prevSelectedMonths) =>
      prevSelectedMonths.includes(month)
        ? prevSelectedMonths.filter((m) => m !== month)
        : [...prevSelectedMonths, month]
    );
  };

  const totalFees = selectedMonths.length > 0
    ? selectedMonths.length * feePerMonth + admissionFee + registrationFee + fine + transportFee + lateFee + oldBalance
    : 0;

  const concessionAmount = (totalFees * concessionPercent) / 100;
  const netFees = totalFees - concessionAmount;
  const balanceAmount = netFees - deposit;

  return (
    <div className="bg-pink-100">
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="grid grid-cols-2 gap-4">
          {studentInfo.map((info, index) => (
            <div key={index} className="text-center">
              <p className="font-bold">{info.label}</p>
              <div className="bg-gray-200 p-2 rounded-3xl border border-gray-300">
                <p>{info.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <h2 className="col-span-3 text-center font-bold">Month</h2>
          <div className="col-span-3 p-6 bg-white rounded-lg">
            <div className="overflow-x-auto">
              <div className="flex mt-4" style={{ minWidth: "800px" }}>
                {months.map((month, index) => (
                  <div key={index} className="p-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedMonths.includes(month)}
                        onChange={() => handleMonthSelection(month)}
                      />
                      {month}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-white py-4 rounded-lg shadow-md">
          <table className="w-full text-center">
            <thead>
              <tr>
                <th className="text-center py-2">Sl No.</th>
                <th className="text-center py-2">Fee Head</th>
                <th className="text-center py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#BCA8EA]">
                <td className="py-2">01</td>
                <td className="py-2">Monthly Fee</td>
                <td className="py-2">{selectedMonths.length * feePerMonth}</td>
              </tr>
              <tr className="bg-[#E3D6FF]">
                <td className="py-2">02</td>
                <td className="py-2">Admission Fee</td>
                <td className="py-2">
                  <input
                    type="number"
                    value={admissionFee}
                    onChange={(e) => setAdmissionFee(parseInt(e.target.value) || 0)}
                    className="text-center bg-transparent w-full focus:outline-none"
                  />
                </td>
              </tr>
              <tr className="bg-[#BCA8EA]">
                <td className="py-2">03</td>
                <td className="py-2">Registration Fee</td>
                <td className="py-2">
                  <input
                    type="number"
                    value={registrationFee}
                    onChange={(e) => setRegistrationFee(parseInt(e.target.value) || 0)}
                    className="text-center bg-transparent w-full focus:outline-none"
                  />
                </td>
              </tr>
              <tr className="bg-[#E3D6FF]">
                <td className="py-2">04</td>
                <td className="py-2">Fine</td>
                <td className="py-2">
                  <input
                    type="number"
                    value={fine}
                    onChange={(e) => setFine(parseInt(e.target.value) || 0)}
                    className="text-center bg-transparent w-full focus:outline-none"
                  />
                </td>
              </tr>
              <tr className="bg-[#BCA8EA]">
                <td className="py-2">05</td>
                <td className="py-2">Transport Fee</td>
                <td className="py-2">
                  <input
                    type="number"
                    value={transportFee}
                    onChange={(e) => setTransportFee(parseInt(e.target.value) || 0)}
                    className="text-center bg-transparent w-full focus:outline-none"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-white py-4 rounded-lg shadow-md">
          <table className="w-full text-center">
            <thead>
              <tr>
                <th className="text-center py-2">Sl No.</th>
                <th className="text-center py-2">Fee Head</th>
                <th className="text-center py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#E3D6FF]">
                <td className="py-2">06</td>
                <td className="py-2">Old Balance</td>
                <td className="py-2">{oldBalance}</td>
              </tr>
              <tr className="bg-[#BCA8EA]">
                <td className="py-2">07</td>
                <td className="py-2">Late Fee</td>
                <td className="py-2">
                  <input
                    type="number"
                    value={lateFee}
                    onChange={(e) => setLateFee(parseInt(e.target.value) || 0)}
                    className="text-center bg-transparent w-full focus:outline-none"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4 mb-8">
        <div className="text-center">
          <p className="text-sm">Total Fees</p>
          <div className="col-span-1 bg-gray-200 p-2 rounded-3xl text-center border border-gray-400">
            <p className="text-sm">{totalFees}</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm">Concession (%)</p>
          <div className="col-span-1 bg-gray-200 p-2 rounded-3xl text-center border border-gray-400">
            <p className="text-sm">{concessionPercent}</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm">Concession (Amount)</p>
          <div className="col-span-1 bg-gray-200 p-2 rounded-3xl text-center border border-gray-400">
            <p className="text-sm">{concessionAmount}</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm">Net Fees</p>
          <div className="col-span-1 bg-gray-200 p-2 rounded-3xl text-center border border-gray-400">
            <p className="text-sm">{netFees}</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm">Deposit</p>
          <div className="col-span-1 bg-gray-200 p-2 rounded-3xl text-center border border-gray-400">
            <p className="text-sm">{deposit}</p>
          </div>
        </div>
        <div className="col-span-2 text-center text-sm">
          <p>Payment Mode</p>
          <select className="bg-white p-2 rounded-3xl w-full border border-gray-400">
            <option>Cash</option>
            <option>Card</option>
            <option>Online</option>
          </select>
        </div>
        
      </div>
      <div className="grid grid-cols-6 gap-4 items-center mb-4">
        <div className="col-span-4">
          <p className="text-center">Remarks</p>
          <input
            type="text"
            placeholder="Remarks"
            className="w-full p-2 rounded-full border border-gray-300 focus:outline-none"
          />
        </div>
        <div className="col-span-1">
          <p className="text-center">Balance Amount</p>
          <div className="bg-gray-200 p-2 rounded-full text-center border border-gray-400">
            <p className="font-bold">{balanceAmount}</p>
          </div>
        </div>
        <div className="col-span-1 mt-4">
          <button className="bg-pink-500 text-white py-2 px-8 rounded-full hover:bg-pink-600">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default TableReceipt;
