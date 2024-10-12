import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CreatePostForm from '../components/CreatePostForm';
import LogoutModal from '../components/LogoutModal'; // Import the modal component

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Remove SessionID cookie
    Cookies.remove('SessionID', { path: '/' });

    // Redirect to login
    navigate('/login');
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Modal Popup */}
      <LogoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogout={handleLogout}
      />

      <div className="mb-6 text-center">
        <Link
          to="/posts" // Link to the All Posts page
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
        >
          See All Posts
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Welcome to Home</h1>

      {/* Logout Button with Modal Trigger */}
      <div className="text-center mb-6">
        <button
          onClick={() => setIsModalOpen(true)} // Open the modal
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
        >
          Logout
        </button>
      </div>

      <CreatePostForm />
    </div>
  );
};

export default Home;
