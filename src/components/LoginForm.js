import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Cookies from 'js-cookie';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state
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
    setLoading(true); // Set loading to true
    console.log("clicked");
    try {
      const response = await axios.post('/auth/login', { email, password }, {
        withCredentials: true // Make sure credentials (cookies) are sent
      });
      console.log('Login successful:', response.data);

      // Set SessionID in cookies (assuming it's sent from the backend)
      // Cookies.set('SessionID', response.data.sessionId, { expires: 1, path: '/' });

      // Redirect after successful login
      navigate('/home'); // Redirect to the Home page or any page you want
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
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

          <button
            type="submit"
            className={`w-full py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} // Disable button and add styles
            disabled={loading} // Disable button when loading
          >
            {loading ? ( // Show loading animation
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
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
