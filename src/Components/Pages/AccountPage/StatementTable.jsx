import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

// Function to filter the data based on date
const filterExpenses = (expenses, filterType, fromDate, toDate) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  if (filterType === "thisMonth") {
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date.split("-").reverse().join("-"));
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });
  } else if (filterType === "range" && fromDate && toDate) {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date.split("-").reverse().join("-"));
      return expenseDate >= from && expenseDate <= to;
    });
  }

  return expenses;
};

const StatementTable = ({ filterType, fromDate, toDate }) => {
  const [expenses, setExpenses] = useState([
    { date: "14-05-2024", description: "Uniform", expense: 0, income: 5000 },
    { date: "20-05-2024", description: "Books", expense: 1500, income: 0 },
    { date: "01-06-2024", description: "Tuition Fee", expense: 2000, income: 0 },
    { date: "15-06-2024", description: "School Trip", expense: 800, income: 0 },
    { date: "25-06-2024", description: "Sports Equipment", expense: 1200, income: 0 },
    { date: "05-07-2024", description: "Scholarship", expense: 0, income: 3000 },
    { date: "10-07-2024", description: "Art Supplies", expense: 600, income: 0 },
    { date: "22-07-2024", description: "Music Lessons", expense: 500, income: 0 },
    { date: "01-08-2024", description: "Summer Camp", expense: 1000, income: 0 },
    { date: "15-08-2024", description: "Birthday Gift", expense: 300, income: 0 },
    { date: "30-08-2024", description: "Part-time Job", expense: 0, income: 2000 },
    { date: "05-09-2024", description: "School Supplies", expense: 400, income: 0 },
    { date: "18-09-2024", description: "Field Trip", expense: 700, income: 0 },
    { date: "10-10-2024", description: "Extracurricular Activities", expense: 500, income: 0 },
    { date: "25-10-2024", description: "Gift for Teacher", expense: 250, income: 0 }
  ]);

  // Filter the data based on filterType
  const filteredExpenses = filterExpenses(expenses, filterType, fromDate, toDate);

  // Total income and expense calculations
  const totalExpense = filteredExpenses.reduce((acc, item) => acc + item.expense, 0);
  const totalIncome = filteredExpenses.reduce((acc, item) => acc + item.income, 0);
  const profitOrLoss = totalIncome - totalExpense;

  // Function to delete a row
  const handleDelete = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="p-4">Date</th>
            <th className="p-2">Description</th>
            <th className="p-2">Expense</th>
            <th className="p-2">Income</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No data found
              </td>
            </tr>
          ) : (
            filteredExpenses.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-[#BCA8EA]" : "bg-[#E3D6FF]"}>
                <td className="p-3 pl-3">{item.date}</td>
                <td className="p-3 pl-3">{item.description}</td>
                <td className="p-3 pl-3 text-black">{item.expense ? item.expense.toLocaleString() : ""}</td>
                <td className="p-3 pl-3 text-black">{item.income ? item.income.toLocaleString() : ""}</td>
                <td className="p-3 pl-6">
                  <button onClick={() => handleDelete(index)} className=" text-white px-2 py-2 rounded-md transition duration-300 hover:bg-red-600 hover:shadow-lg hover:scale-105">
                    <MdDelete className="text-black"/>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <td className="p-2 font-bold" colSpan="2">
              Total
            </td>
            <td className="p-2 text-red-500">{totalExpense.toLocaleString()}</td>
            <td className="p-2 text-green-500">{totalIncome.toLocaleString()}</td>
            <td className="p-2"></td>
          </tr>
          <tr>
            <td className="p-2" colSpan="5">
              <div className="border border-gray-500 p-2">
                <span className="font-bold">Profit / Loss - </span>
                <span className={profitOrLoss >= 0 ? "text-green-500" : "text-red-500"}>
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
