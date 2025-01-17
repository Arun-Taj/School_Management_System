import React, { useState, useEffect, useContext } from "react";
import { FaMoneyBill } from "react-icons/fa";
import SearchBar from "./SearchBar";
import TableReceipt from "./TableReceipt";
import { AuthContext } from "../../../context/AuthContext";
import { get } from "jquery";
import { IoSearch } from "react-icons/io5";

const FeeReceipt = () => {
  const [receiptNo, setReceiptNo] = useState("");
  const [date, setDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState(""); // For filter
  const [enrNo, setEnrNo] = useState("");
  const [student_for_receipt, setStudent_for_receipt] = useState({});

  const { api } = useContext(AuthContext);

  const get_new_receipt_no = async () => {
    try {
      const response = await api.get("/get_new_receipt_no/");

      setReceiptNo(response.data);
    } catch (error) {
      console.error("Error fetching months:", error);
    }
  };
  useEffect(() => {
    get_new_receipt_no();
  }, []);

  const get_student_for_receipt = async () => {
    if (enrNo === "") {
      alert("Please enter a valid enrollment number.");
      return;
    }

    try {
      const response = await api.get(`/get_student_for_receipt/${enrNo}/`);
      setStudent_for_receipt(response.data);
    } catch (error) {
      alert("Please enter a valid enrollment number.");
      return;
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilter = (filter) => {
    setFilterOption(filter); // Store selected filter
  };

  const handleRefresh = () => {
    setSearchQuery("");
    setFilterOption(""); // Reset filter
    setReceiptNo(Math.floor(100000 + Math.random() * 900000));
  };

  return (
    student_for_receipt && (
      <div className="bg-pink-100 p-8">
        <div className="flex gap-4 bg-white rounded-3xl p-2">
          <div className="flex items-center space-x-2">
            <FaMoneyBill className="text-gray-700" />
            <span className="text-gray-700 font-medium">Fees</span>
          </div>
          <div className="border-l border-gray-700 h-6"></div>
          <div>
            <span className="text-gray-700 font-medium">Fee Receipt</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-row p-2 gap-4 items-center">
            <div className="flex flex-col items-center">
              <label className="font-bold">Receipt No.</label>
              <input
                type="text"
                value={receiptNo}
                readOnly
                className="rounded-3xl p-2 w-full md:w-44 border border-gray-400 bg-slate-100 cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="font-bold">Date</label>
              <input
                type="date"
                value={date.toISOString().split("T")[0]}
                onChange={(e) => setDate(new Date(e.target.value))}
                className="rounded-3xl p-2 w-full md:w-44 border border-gray-400"
              />
            </div>
            <div className="flex  items-center">
              <div className="flex flex-col items-center">
                <label className="font-bold">Enrollment ID</label>
                <input
                  type="text"
                  value={enrNo}
                  onChange={(e) => setEnrNo(e.target.value.trim())}
                  className="rounded-3xl p-2 w-full md:w-44 border border-gray-400"
                />
              </div>

              <IoSearch
                className="text-gray-600 mr-4 cursor-pointer transition-colors duration-300 hover:text-blue-500"
                size={24}
                onClick={get_student_for_receipt}
              />
            </div>
          </div>
          {/* <div className="mt-6">
          <SearchBar
            onSearch={handleSearch}
            onFilter={handleFilter}
            onRefresh={handleRefresh}
          />
        </div> */}
        </div>

        <TableReceipt
          searchQuery={searchQuery}
          filterOption={filterOption}
          student_for_receipt={student_for_receipt}
          receiptNo={receiptNo}
          date={date}
          get_new_receipt_no={get_new_receipt_no}
        />
      </div>
    )
  );
};

export default FeeReceipt;
