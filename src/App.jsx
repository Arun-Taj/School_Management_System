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

import Accounts from './Components/Pages/AccountPage/Accounts'; 
import ChartAccount from './Components/Pages/AccountPage/ChartAccount'
import AddIncome from './Components/Pages/AccountPage/AddIncome';
import Statement from './Components/Pages/AccountPage/Statement';
import AddExpenses from './Components/Pages/AccountPage/AddExpenses'

import Attendance from './Components/Pages/AttendencePage/Attendance';  
import MarkStudent from './Components/Pages/AttendencePage/MarkStudent';
import MarkEmployee from './Components/Pages/AttendencePage/MarkEmployee'
import StudentReport from './Components/Pages/AttendencePage/StudentReport'
import EmployeeReport from './Components/Pages/AttendencePage/EmployeeReport'

import Exam from './Components/Pages/ExamPage/Exam'; 
import CreateExam from './Components/Pages/ExamPage/CreateExam'
import EditExam from './Components/Pages/ExamPage/EditExam'
import UpdateMarks from './Components/Pages/ExamPage/UpdateMarks'
import Result from './Components/Pages/ExamPage/Result'; 
import StudentResult from './Components/Pages/ExamPage/StudentResult'
import ClassResult from './Components/Pages/ExamPage/ClassResult';


import Fees from './Components/Pages/FeePage/Fees';
import FeeReceipt from './Components/Pages/FeePage/FeeReceipt'
import FeeReport from './Components/Pages/FeePage/FeeReport'
import FeeDefaulter from './Components/Pages/FeePage/FeeDefaulter'

import Configuration from './Components/Pages/ConfigurationPage/Configuration';
import Navbar from './Components/DashBoard/Navbar';
import Dougnut from './Components/DashBoard/Dougnut';




function App() {
  return (
    <Router>
      <div className="flex">
      <div className="sticky top-0 h-screen z-10">
          <Sidebar className="h-full overflow-hidden" />
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
              <Route path="/accounts/chart" element={<ChartAccount/>} />
              <Route path="/accounts/addIncome" element={<AddIncome/>} />
              <Route path="/accounts/addExpenses" element={<AddExpenses/>} />
              <Route path="/accounts/statements" element={<Statement/>} />

              <Route path="/fees" element={<Fees/>} />
              <Route path="/fees/feeReceipt" element={<FeeReceipt/>} />
              <Route path="/fees/feeReport" element={<FeeReport/>} />
              <Route path="/fees/feeDefaulter" element={<FeeDefaulter/>} />


              <Route path="/attendance" element={<Attendance />} />
              <Route path="/attendance/markStudent" element={<MarkStudent/>} />
              <Route path="/attendance/studentReport" element={<StudentReport/>} />
              <Route path="/attendance/markEmployee" element={<MarkEmployee/>} />
              <Route path="/attendance/EmployeeReport" element={<EmployeeReport/>} />

              <Route path="/exam" element={<Exam />} />
              <Route path='/exam/createExam' element={<CreateExam/>} />
              <Route path='/exam/updateExam' element={<EditExam/>} />
              <Route path='/exam/updateExamMarks' element={<UpdateMarks/>} />
              <Route path='/exam/result' element={<Result/>} />
              <Route path='/exam/studentResult' element={<StudentResult/>} />
              <Route path='/exam/classResult' element={<ClassResult/>} />

              <Route path="/config" element={<Configuration />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
    // <Dougnut/>
  
    
  );
}

export default App;
