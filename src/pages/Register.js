import React from 'react';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Create Your Account</h1>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
