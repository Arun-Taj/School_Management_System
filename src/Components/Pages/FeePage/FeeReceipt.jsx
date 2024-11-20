import React, { useState, useEffect } from "react";
import { FaMoneyBill } from "react-icons/fa";
import SearchBar from "./SearchBar";
import TableReceipt from "./TableReceipt";

const FeeReceipt = () => {
  const [receiptNo, setReceiptNo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState(""); // For filter

  useEffect(() => {
    const generateReceiptNo = () => {
      const randomNo = Math.floor(100000 + Math.random() * 900000);
      setReceiptNo(randomNo);
    };
    generateReceiptNo();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilter = (filter) => {
    setFilterOption(filter);  // Store selected filter
  };

  const handleRefresh = () => {
    setSearchQuery("");  
    setFilterOption("");  // Reset filter
    setReceiptNo(Math.floor(100000 + Math.random() * 900000));  
  };

  return (
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
              className="rounded-3xl p-2 w-full md:w-44 border border-gray-400 bg-slate-100"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="font-bold">Date</label>
            <input type="date" className="rounded-3xl p-2 w-full md:w-44 border border-gray-400" />
          </div>
          <div className="flex flex-col items-center">
            <label className="font-bold">Enrollment ID</label>
            <input type="text" className="rounded-3xl p-2 w-full md:w-44 border border-gray-400" />
          </div>
        </div>
        <div className="mt-6">
          <SearchBar onSearch={handleSearch} onFilter={handleFilter} onRefresh={handleRefresh} />
        </div>
      </div>

      <TableReceipt searchQuery={searchQuery} filterOption={filterOption} />
    </div>
  );
};

export default FeeReceipt;
