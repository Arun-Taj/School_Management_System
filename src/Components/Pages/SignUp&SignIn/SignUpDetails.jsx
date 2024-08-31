import React,{useState} from 'react';
import SchoolDetails from './SchoolDetails';
import SignupForm from './SignUp';
import AdminDetails from './AdminDetails';

const SignUpDetails = () => {
  const [showAdminDetails, setShowAdminDetails] = useState(false);

  const handleAdminClick = () => {
    setShowAdminDetails(true);
  };

  const handleBackToSchoolDetails = () => {
    setShowAdminDetails(false);
  };
  return (
    <div className="flex space-x-4">
      <div className="w-1/2">
        <SignupForm />
      </div>
      <div className="w-1/2">
      {showAdminDetails ? (
          <AdminDetails onBackClick={handleBackToSchoolDetails} />
        ) : (
          <SchoolDetails onAdminClick={handleAdminClick} />
        )}
      </div>
    </div>
  );
};

export default SignUpDetails;
