import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/DashBoard/Sidebar';
import Dashboard from './Components/DashBoard/DashBoard';

import Students from './Components/Pages/StudentPage/Students';  
import AdmissionForm from './Components/Pages/StudentPage/AdmissionForm';
import AllStudents from './Components/Pages/StudentPage/AllStudents';
import IdCard from './Components/Pages/StudentPage/IdCard';

import Employees from './Components/Pages/EmployeePage/Employees';  
import AddEmployee from './Components/Pages/EmployeePage/AddEmployee';
import AllEmployee from './Components/Pages/EmployeePage/AllEmployee';
import EmpID from './Components/Pages/EmployeePage/EmpID';

import Accounts from './Components/Pages/Accounts';  
import Attendance from './Components/Pages/Attendance';  
import Exam from './Components/Pages/Exam';  
import Fees from './Components/Pages/Fees';
import Configuration from './Components/Pages/Configuration';
import Navbar from './Components/DashBoard/Navbar';
//import Datatable from 'datatables.net-dt';

function App() {
  return (
    <Router>
      <div className="flex">
      <div className="sticky top-0 h-screen ">
          <Sidebar className="h-full overflow-y-auto" />
        </div>
        <div className="flex-1 flex flex-col">
          <div className='sticky top-0 z-10'>
          <Navbar />  </div>
          <div className="flex-1  bg-gray-100">
            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route path="/students" element={<Students />} />
              <Route path="/students/admissionForm" element={<AdmissionForm/>} /> 
              <Route path="/students/allStudents" element={<AllStudents />} /> 
              <Route path="/students/idCard" element={<IdCard />} /> 

              <Route path="/employees" element={<Employees />} />
              <Route path="/employees/employeeForm" element={<AddEmployee />} />
              <Route path="/employees/allEmployees" element={<AllEmployee />} />
              <Route path="/employees/eId" element={<EmpID />} />

              <Route path="/accounts" element={<Accounts />} />
              <Route path="/fees" element={<Fees/>} />
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
