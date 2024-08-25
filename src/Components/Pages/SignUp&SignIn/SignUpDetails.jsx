import React from 'react';
import SchoolDetails from './SchoolDetails';
import SignupForm from './SignUp';

const SignUpDetails = () => {
  return (
    <div className="flex space-x-4">
      <div className="w-1/2">
        <SignupForm />
      </div>
      <div className="w-1/2">
        <SchoolDetails />
      </div>
    </div>
  );
};

export default SignUpDetails;
