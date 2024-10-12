import React from 'react'; 
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import PostsPage from './components/PostsPage';

const App = () => {
  // Function to check if the user is authenticated based on SessionID cooki

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Route (Home) */}
        <Route 
          path="/" 
          element={<Login/>} 
        />
        <Route 
          path="/home" 
          element={<Home/>} 
        />
        <Route
        path='/posts'
        element={<PostsPage/>}
         />
      </Routes>
    </Router>
  );
};

export default App;
