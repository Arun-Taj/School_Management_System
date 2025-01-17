// import React from "react";
// import Table from "./ChartTable";
// import { MdAccountBalanceWallet } from "react-icons/md";

// const AddExpense = () => {
//   return (
//     <div className="bg-pink-100 p-8">
//       <div className="flex gap-4  bg-white  rounded-3xl p-2 ">
//         <div className="flex items-center space-x-2">
//           <MdAccountBalanceWallet className="text-gray-700 " />
//           <span className="text-gray-700 font-medium">Account</span>
//         </div>

//         {/* Vertical divider */}
//         <div className="border-l border-gray-700 h-6"></div>

//         {/* "Add New" text */}
//         <div>
//           <span className="text-gray-700 font-medium">Add Expense</span>
//         </div>
//       </div>
//       <div className="flex justify-center bg-pink-100">
//         <div className="w-1/2 mt-10 flex flex-col bg-white shadow-md rounded-2xl  items-center ">
//           <h3 className="mb-8 text-2xl font-semibold flex mt-10">Add Expense</h3>
//           <input
//             type="date"
//             className="p-2 px-4  rounded-3xl placeholder-black border border-blue-500 w-2/3"
//             placeholder="Income Head"
//           />

//           <select
//             name=""
//             id=""
//             className="p-2   px-4  rounded-3xl bg-white mt-4 border border-blue-500 w-2/3"
//           >
//             <option value="" disabled selected>
//               Expense Head
//             </option>
//             <option value="">Smart</option>
//             <option value="">Gentlement</option>
//             <option value="">Sporty</option>
//           </select>
//           <input
//             type="text"
//             className="p-2 px-4  mt-4 rounded-3xl placeholder-black border border-blue-500 w-2/3"
//             placeholder="Particulars(Option)"
//           />
//           <input
//             type="text"
//             className="p-2 px-4 mb-4 mt-4 rounded-3xl placeholder-black border border-blue-500 w-2/3"
//             placeholder="Amount"
//           />
//           <button className="mt-8 bg-pink-500 rounded-3xl text-white p-2 px-8 font-bold mb-12" type="submit">
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddExpense;


import React, { useState, useContext } from "react";
import { MdAccountBalanceWallet } from "react-icons/md";
import { AuthContext } from "../../../context/AuthContext";

const AddExpense = () => {
  const { api } = useContext(AuthContext); // Access API context

  // State for form fields
  const [expenseHeads, setExpenseHeads] = useState([]);
  const [selectedHead, setSelectedHead] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [particulars, setParticulars] = useState("");

  // Fetch expense heads on component mount
  React.useEffect(() => {
    const fetchExpenseHeads = async () => {
      try {
        const response = await api.get("/get_expense_heads/");
        setExpenseHeads(response.data); // Assume the server returns an array of heads
      } catch (error) {
        console.error("Error fetching expense heads:", error);
      }
    };

    fetchExpenseHeads();
  }, [api]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for submission
    const formData = {
      date,
      head: selectedHead,
      particulars,
      amount: parseFloat(amount), // Ensure amount is sent as a number
    };

    try {
      const response = await api.post("/add_income_expense/", formData);
      // console.log("Expense added successfully:", response.data);
      alert("Expense added successfully!");
      // Reset form fields
      setDate("");
      setSelectedHead("");
      setParticulars("");
      setAmount("");
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense. Please try again.");
    }
  };

  return (
    <div className="bg-pink-100 p-8">
      <div className="flex gap-4 bg-white rounded-3xl p-2">
        <div className="flex items-center space-x-2">
          <MdAccountBalanceWallet className="text-gray-700" />
          <span className="text-gray-700 font-medium">Account</span>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">Add Expense</span>
        </div>
      </div>
      <div className="flex justify-center bg-pink-100">
        <form
          className="w-1/2 mt-10 flex flex-col bg-white shadow-md rounded-2xl items-center"
          onSubmit={handleSubmit}
        >
          <h3 className="mb-8 text-2xl font-semibold flex mt-10">Add Expense</h3>

          {/* Date input */}
          <input
            type="date"
            className="p-2 px-4 rounded-3xl placeholder-black border border-blue-500 w-2/3"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          {/* Expense head dropdown */}
          <select
            className="p-2 px-4 rounded-3xl bg-white mt-4 border border-blue-500 w-2/3"
            value={selectedHead}
            onChange={(e) => setSelectedHead(e.target.value)}
            required
          >
            <option value="" disabled>
              Expense Head
            </option>
            {expenseHeads.map((head) => (
              <option key={head.id} value={head.id}>
                {head.head}
              </option>
            ))}
          </select>

          {/* Particulars input */}
          <input
            type="text"
            className="p-2 px-4 mt-4 rounded-3xl placeholder-black border border-blue-500 w-2/3"
            placeholder="Particulars (Optional)"
            value={particulars}
            onChange={(e) => setParticulars(e.target.value)}
          />

          {/* Amount input */}
          <input
            type="number"
            className="p-2 px-4 mb-4 mt-4 rounded-3xl placeholder-black border border-blue-500 w-2/3"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          {/* Submit button */}
          <button
            className="mt-8 bg-pink-500 rounded-3xl text-white p-2 px-8 font-bold mb-12"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;

