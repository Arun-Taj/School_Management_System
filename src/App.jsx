import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/DashBoard/Sidebar';
import Dashboard from './Components/DashBoard/DashBoard';
import Students from './Components/Pages/Students';  // Create these pages as necessary
import Employees from './Components/Pages/Employees';  // Create these pages as necessary
import Accounts from './Components/Pages/Accounts';  // Create these pages as necessary
import Attendance from './Components/Pages/Attendance';  // Create these pages as necessary
import Exam from './Components/Pages/Exam';  // Create these pages as necessary
import Configuration from './Components/Pages/Configuration';
import Navbar from './Components/DashBoard/Navbar';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />  {/* Include the Navbar here */}
          <div className="flex-1 p-6 bg-gray-100">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/exam" element={<Exam />} />
              <Route path="/config" element={<Configuration />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
