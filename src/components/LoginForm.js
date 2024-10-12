import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Cookies from 'js-cookie';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // Check if SessionID exists in cookies on component mount
  useEffect(() => {
    const sessionId = Cookies.get('SessionID');
    if (sessionId) {
      // If SessionID is found, redirect to /home
      navigate('/home');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', { email, password }, {
        withCredentials: true // Make sure credentials (cookies) are sent
      });
      console.log('Login successful:', response.data);

      // Set SessionID in cookies (assuming it's sent from the backend)
      Cookies.set('SessionID', response.data.sessionId, { expires: 1, path: '/' });

      // Redirect after successful login
      navigate('/home'); // Redirect to the Home page or any page you want
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value.replace(/[^0-9]/g, ''))} // Only keep numeric input
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out">
            Login
          </button>

          <div className="flex justify-center items-center space-x-2 mt-4">
            <span className="text-gray-600">Don't have an account?</span>
            <button
              onClick={() => navigate('/register')}
              className="text-indigo-600 hover:underline"
            >
              Register here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
