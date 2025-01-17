
// export default AddIncome;
import React, { useContext, useState, useEffect } from "react";
import { MdAccountBalanceWallet } from "react-icons/md";
import { AuthContext } from "../../../context/AuthContext";

const AddIncome = () => {
  const { api } = useContext(AuthContext);

  const [incomeHeads, setIncomeHeads] = useState([]);
  const [selectedHead, setSelectedHead] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [particulars, setParticulars] = useState("");

  useEffect(() => {
    const getHeads = async () => {
      try {
        const response = await api.get("/get_income_heads/");
        setIncomeHeads(response.data);
      } catch (error) {
        console.error("Error fetching heads:", error);
      }
    };
    getHeads();
  }, [api]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedHead || !date || !amount) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = {
      head: selectedHead,
      date,
      amount,
      particulars,
    };

    // console.log("Form data:", formData);
    
    try {
      const response = await api.post("/add_income_expense/", formData);
      alert("Income added successfully!");
      setSelectedHead("");
      setDate("");
      setAmount("");
      setParticulars("");
    } catch (error) {
      console.error("Error adding income:", error);
      alert("Failed to add income.");
    }
  };

  return (
    <div className="bg-pink-100 p-8">
      <div className="flex gap-4 bg-white rounded-3xl p-2">
        <div className="flex items-center space-x-2">
          <MdAccountBalanceWallet className="text-gray-700" />
          <span className="text-gray-700 font-medium">Account</span>
        </div>

        <div className="border-l border-gray-700 h-6"></div>

        <div>
          <span className="text-gray-700 font-medium">Add Income</span>
        </div>
      </div>
      <div className="flex justify-center bg-pink-100">
        <div className="w-1/2 mt-10 flex flex-col bg-white shadow-md rounded-2xl items-center">
          <h3 className="mb-8 text-2xl font-semibold mt-10">Add Income</h3>
          <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
            <input
              type="date"
              className="p-2 px-4 rounded-3xl placeholder-black border border-blue-500 w-2/3 mb-4"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />

            <select
              className="p-2 px-4 rounded-3xl bg-white border border-blue-500 w-2/3 mb-4"
              value={selectedHead}
              onChange={(e) => setSelectedHead(e.target.value)}
              required
            >
              <option value="" disabled>
                Income Head
              </option>
              {incomeHeads.map((head) => (
                <option key={head.id} value={head.id}>
                  {head.head}
                </option>
              ))}
            </select>

            <input
              type="text"
              className="p-2 px-4 rounded-3xl placeholder-black border border-blue-500 w-2/3 mb-4"
              placeholder="Particulars (Optional)"
              value={particulars}
              onChange={(e) => setParticulars(e.target.value)}
            />

            <input
              type="number"
              className="p-2 px-4 rounded-3xl placeholder-black border border-blue-500 w-2/3 mb-4"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            <button
              type="submit"
              className="mt-8 bg-pink-500 rounded-3xl text-white p-2 px-8 font-bold mb-12"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddIncome;
