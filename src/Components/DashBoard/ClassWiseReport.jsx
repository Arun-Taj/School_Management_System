import React from 'react';

const ClassWiseReport = () => {
  const data = [
    { class: 1, present: 35, absent: 15, leave: 5, fees: "15,000", paid: "9,000", balance: "6,000" },
    { class: 2, present: 35, absent: 15, leave: 5, fees: "15,000", paid: "9,000", balance: "6,000" },
    { class: 3, present: 35, absent: 15, leave: 5, fees: "15,000", paid: "9,000", balance: "6,000" },
    { class: 4, present: 35, absent: 15, leave: 5, fees: "15,000", paid: "9,000", balance: "6,000" },
    { class: 5, present: 35, absent: 15, leave: 5, fees: "15,000", paid: "9,000", balance: "6,000" },
    { class: 6, present: 35, absent: 15, leave: 5, fees: "15,000", paid: "9,000", balance: "6,000" },
    { class: 7, present: 35, absent: 15, leave: 5, fees: "15,000", paid: "9,000", balance: "6,000" },
    { class: 8, present: 35, absent: 15, leave: 5, fees: "15,000", paid: "9,000", balance: "6,000" },
    { class: 9, present: 35, absent: 15, leave: 5, fees: "15,000", paid: "9,000", balance: "6,000" },
    { class: 10, present: 35, absent: 15, leave: 5, fees: "15,000", paid: "9,000", balance: "6,000" },
    { class: 11, present: 35, absent: 15, leave: 5, fees: "15,000", paid: "9,000", balance: "6,000" },
    { class: 12, present: 35, absent: 15, leave: 5, fees: "15,000", paid: "9,000", balance: "6,000" },
  ];

  return (
    <div className="container mx-auto p-4 bg-white rounded shadow-lg">
      <h1 className="text-center text-xl font-bold mb-4">Class Wise Report</h1>
      <div className="overflow-x-auto">
        <table className="">
          
            <tr className="">
              <th className="py-2 px-4 ">Present Today</th>
              <th className="py-2 px-4 ">Absent Today</th>
              <th className="py-2 px-4 ">On Leave</th>
              <th className="py-2 px-4 ">Fees (Monthly)</th>
              <th className="py-2 px-4 ">Paid Amount</th>
              <th className="py-2 px-4 ">Balance</th>
              <th className="py-2 px-4 ">Class</th>
            </tr>
        
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.class}
                className={`text-center ${index % 2 === 0 ? 'bg-[#BDA8EA]' : 'bg-[#E3D6FF]'}`}
              >
                <td className="py-2 px-4 ">{row.class}</td>
                <td className="py-2 px-4 ">{row.present}</td>
                <td className="py-2 px-4 ">{row.absent}</td>
                <td className="py-2 px-4 ">{row.leave}</td>
                <td className="py-2 px-4 ">{row.fees}</td>
                <td className="py-2 px-4 ">{row.paid}</td>
                <td className="py-2 px-4 ">{row.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassWiseReport;
