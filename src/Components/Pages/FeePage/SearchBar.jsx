import React, { useState } from "react";
import { IoSearch, IoFilterSharp } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";

const SearchBar = ({ onSearch, onRefresh, onFilter }) => {
  const [inputValue, setInputValue] = useState("");
  const [showFilter, setShowFilter] = useState(false); // Control visibility of filter dropdown
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onSearch(e.target.value); // Call the parent search handler
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    onFilter(e.target.value); // Pass selected filter to parent
    setShowFilter(false); // Hide filter dropdown after selection
  };

  const handleRefresh = () => {
    setInputValue("");
    setSelectedFilter(""); // Reset filter
    onSearch(""); // Clear search results
    onFilter(""); // Reset filter in parent
    onRefresh(); // Call the parent refresh handler
  };

  const toggleFilterDropdown = () => {
    setShowFilter(!showFilter); // Toggle visibility of filter dropdown
  };

  return (
    <div className="flex flex-row gap-4 justify-end items-center py-10">
      <div className="flex items-center bg-white rounded-full border border-gray-400">
        {/* Filter Icon */} 
        <IoFilterSharp
          className="text-gray-600 ml-4 cursor-pointer"
          size={24}
          onClick={toggleFilterDropdown} // Toggle filter dropdown visibility
        />
        {/* Conditionally Render Filter Dropdown */}
        {showFilter && (
          <div className="absolute bg-white border border-gray-300 rounded-lg shadow-lg mt-2">
            <select
              value={selectedFilter}
              onChange={handleFilterChange}
              className="px-2 py-2 bg-transparent text-gray-600 focus:outline-none"
            >
              <option value="">Filter By</option>
              <option value="class">Class</option>
              <option value="monthlyFee">Monthly Fee</option>
              <option value="transportFee">Transport Fee</option>
            </select>
          </div>
        )}
        <div className="border-l border-gray-700 h-6 ml-4"></div>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={handleInputChange}
          className="flex-grow px-4 py-2 text-gray-600 placeholder-gray-500 bg-transparent focus:outline-none text-center"
        />
        <IoSearch className="text-gray-600 mr-4 cursor-pointer transition-colors duration-300 hover:text-blue-500" size={24} />

       
        

        
      </div>

      {/* Refresh Button */}
      <div
        className="border border-[#BCA8EA] p-2 bg-white rounded-full cursor-pointer transition-transform duration-100 ease-in-out transform hover:scale-110 hover:bg-[#F0E8FF] hover:shadow-lg"
        onClick={handleRefresh}
      >
        <FiRefreshCcw />
      </div>
    </div>
  );
};

export default SearchBar;
