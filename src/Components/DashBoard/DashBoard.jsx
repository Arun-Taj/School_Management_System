import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex flex-col flex-1 p-6 bg-gray-100">
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="p-4 bg-white rounded shadow-lg">
          <h2>Total Students</h2>
          <p className="text-2xl font-bold">50</p>
        </div>
        <div className="p-4 bg-white rounded shadow-lg">
          <h2>Total Employees</h2>
          <p className="text-2xl font-bold">50</p>
        </div>
        <div className="p-4 bg-white rounded shadow-lg">
          <h2>Revenue</h2>
          <p className="text-2xl font-bold">₹7,800</p>
        </div>
        <div className="p-4 bg-white rounded shadow-lg">
          <h2>Expenses</h2>
          <p className="text-2xl font-bold">₹3,600</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded shadow-lg">
          <h2>Total Profit</h2>
          <p className="text-2xl font-bold">₹4,200</p>
        </div>
        <div className="p-4 bg-white rounded shadow-lg">
          <h2>Dues</h2>
          <p className="text-2xl font-bold">₹20,200</p>
        </div>
        <div className="p-4 bg-white rounded shadow-lg">
          <h2>Estimated Fee This Month</h2>
          <p className="text-2xl font-bold">₹35,000</p>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-white rounded shadow-lg">
        <h2>Class Wise Report</h2>
        <table className="min-w-full mt-4 text-left">
          <thead>
            <tr>
              <th>Class</th>
              <th>Present Today</th>
              <th>Absent Today</th>
              <th>On Leave</th>
              <th>Fees (Monthly)</th>
              <th>Paid Amount</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {/* Rows of data */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
