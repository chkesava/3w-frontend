import React from 'react';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 flex items-center justify-center">
      {/* Glassmorphism container */}
      <div className="w-full max-w-md p-4 rounded-lg shadow-lg bg-white bg-opacity-10 backdrop-blur-lg border border-white/30">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2 drop-shadow-lg">
          Create Your Account
        </h1>
        <RegisterForm />
        
      </div>
    </div>
  );
};

export default Register;
