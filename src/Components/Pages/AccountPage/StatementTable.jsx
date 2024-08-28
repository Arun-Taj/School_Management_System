import React from "react";
import { MdDelete } from "react-icons/md";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
const StatementTable = () => {
  const expenses = [
    { date: "14-05-2024", description: "Uniform", expense: 0, income: 5000 },
    { date: "14-05-2024", description: "Rent", expense: 10000, income: 0 },
    { date: "14-05-2024", description: "Stationary", expense: 1000, income: 0 },
    { date: "14-05-2024", description: "Books", expense: 0, income: 7000 },
    {
      date: "14-05-2024",
      description: "Fees Submission of Enrollment ID - 01240036",
      expense: 0,
      income: 5000,
    },
    {
      date: "14-05-2024",
      description: "Fees Submission of Enrollment ID - 01240179",
      expense: 0,
      income: 5000,
    },
  ];

  const totalExpense = expenses.reduce((acc, item) => acc + item.expense, 0);
  const totalIncome = expenses.reduce((acc, item) => acc + item.income, 0);
  const profitOrLoss = totalIncome - totalExpense;

  return (
    <div className="bg-white rounded-2xl shadow-lg">
      <table className="w-full text-left border-collapse">
        <thead className="">
          <tr className="">
            <th className="p-4 ">Date</th>
            <th className="p-2 ">Description</th>
            <th className="p-2 ">Expense</th>
            <th className="p-2 ">Income</th>
            <th className="p-2 ">Action</th>
          </tr>
        </thead>
        <tbody className="">
          {expenses.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-[#BCA8EA]" : "bg-[#E3D6FF]"}
            >
              <td className="p-3 pl-3 ">{item.date}</td>
              <td className="p-3 pl-3 ">{item.description}</td>
              <td className="p-3 pl-3   text-black">
                {item.expense ? item.expense.toLocaleString() : ""}
              </td>
              <td className="p-3 pl-3   text-black">
                {item.income ? item.income.toLocaleString() : ""}
              </td>
              <td className="p-3   pl-6">
                <button>
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="p-2 font-bold" colSpan="2">
              Total
            </td>
            <td className="p-2 text-red-500">
              {totalExpense.toLocaleString()}
            </td>
            <td className="p-2  text-green-500">
              {totalIncome.toLocaleString()}
            </td>
            <td className="p-2 "></td>
          </tr>
          <tr className="">
            <td className="p-2" colSpan="5">
              <div className=" border border-gray-500 p-2">
                <span className="font-bold">Profit / Loss - </span>
                <span
                  className={
                    profitOrLoss >= 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {profitOrLoss.toLocaleString()}
                </span>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      
    </div>
  );
};

export default StatementTable;
