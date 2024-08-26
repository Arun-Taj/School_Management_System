import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';



import Sidebar from './Sidebar';
import Dashboard from './DashBoard';
import Navbar from './Navbar';

import Students from '../Pages/StudentPage/Students' 
import AdmissionForm from '../Pages/StudentPage/AdmissionForm';
import AllStudents from '../Pages/StudentPage/AllStudents';
import PromoteStudent from '../Pages/StudentPage/PromoteStudent';
import IdCard from '../Pages/StudentPage/IdCard';

import Employees from '../Pages/EmployeePage/Employees';  
import AddEmployee from '../Pages/EmployeePage/AddEmployee';
import AllEmployee from '../Pages/EmployeePage/AllEmployee';
import EmpID from '../Pages/EmployeePage/EmpID';

import Accounts from '../Pages/AccountPage/Accounts'; 
import ChartAccount from '../Pages/AccountPage/ChartAccount'
import AddIncome from '../Pages/AccountPage/AddIncome';
import Statement from '../Pages/AccountPage/Statement';
import AddExpenses from '../Pages/AccountPage/AddExpenses'

import Attendance from '../Pages/AttendencePage/Attendance';  
import MarkStudent from '../Pages/AttendencePage/MarkStudent';
import MarkEmployee from '../Pages/AttendencePage/MarkEmployee'
import StudentReport from '../Pages/AttendencePage/StudentReport'
import EmployeeReport from '../Pages/AttendencePage/EmployeeReport'

import Exam from '../Pages/ExamPage/Exam'; 
import CreateExam from '../Pages/ExamPage/CreateExam'
import EditExam from '../Pages/ExamPage/EditExam'
import UpdateMarks from '../Pages/ExamPage/UpdateMarks'
import Result from '../Pages/ExamPage/Result'; 
import StudentResult from '../Pages/ExamPage/StudentResult'
import ClassResult from '../Pages/ExamPage/ClassResult';


import Fees from '../Pages/FeePage/Fees';
import FeeReceipt from '../Pages/FeePage/FeeReceipt'
import FeeReport from '../Pages/FeePage/FeeReport'
import FeeDefaulter from '../Pages/FeePage/FeeDefaulter'

import Configuration from '../Pages/ConfigurationPage/Configuration';
import Classes from '../Pages/ConfigurationPage/Classes'
import CreateSubject from '../Pages/ConfigurationPage/CreateSubject';
import AssignSubject from '../Pages/ConfigurationPage/AssignSubject';





// import Dougnut from '../DashBoard/Dougnut';
// import AdminDetails from '../Pages/SignUp&SignIn/AdminDetails';





function MainDashBoard() {
  return (
    
      <div className="flex">
      <div className="sticky top-0 h-screen z-10">
          <Sidebar className="h-full overflow-hidden" />
        </div>
        <div className="flex-1 flex flex-col">
          <div className='sticky top-0 z-10'>
          <Navbar />  </div>
          <div className="flex-1  bg-gray-100">
            <Routes>
              
              {/* <Route path='/signup' element={<SignUpDetails/>} />
                 <Route path='/adminDetails' element={<AdminDetails/>} /> */}
              <Route path="/" element={<Dashboard />} />
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}

                 

              <Route path="/students" element={<Students />} />
              <Route path="/students/admissionForm" element={<AdmissionForm/>} /> 
              <Route path="/students/allStudents" element={<AllStudents />} /> 
              <Route path='/students/promoteStudents' element={<PromoteStudent/>} />
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
              <Route path='/exam/studentReport' element={<StudentResult/>} />
              <Route path='/exam/classReport' element={<ClassResult/>} />

              <Route path="/config" element={<Configuration />} />
              <Route path="/config/classes" element={<Classes />} />
              <Route path="/config/createSub" element={<CreateSubject />} />
              <Route path="/config/assignSub" element={<AssignSubject />} />



            </Routes>
          </div>
        </div>
      </div>
    
        // <SignUp/>
        // <SignIn/>
        // <SchoolDetails/>
        // <SignUpDetails/>
  
    
  );
}

export default MainDashBoard;
