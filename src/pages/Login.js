import React from 'react';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Login to Your Account</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
