import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';



import MainDashBoard from './Components/DashBoard/MainDashBoard';
import SignUpDetails from './Components/Pages/SignUp&SignIn/SignUpDetails';
import SignInForm from './Components/Pages/SignUp&SignIn/SignIn';
import AdminDetails from './Components/Pages/SignUp&SignIn/AdminDetails';
import Profile from './Components/DashBoard/Profile/Profile';
import AccountSetting from './Components/DashBoard/Profile/AccountSetting';


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/signup' element={<SignUpDetails/>} />
          <Route path='/signin' element={<SignInForm/>} />
          <Route path="/" element={<MainDashBoard/>} />
          <Route path="/*" element={<MainDashBoard/>} />
          <Route path='/admin' element={<AdminDetails/>} />
          {/* <Route path="/profile" element={<Profile />} />
          <Route path="/accountSettings" element={<AccountSetting />} /> */}
        </Routes>
      </Router>
    </div>
  )
}

export default App