import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, currentUser, isAgent, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to={isAuthenticated ? "/home" : "/login"} className="flex items-center group">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-md mr-3 group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/1040/1040993.png" 
              alt="Property Listing System Logo" 
              className="h-7 w-7 text-white" 
            />
          </div>
          <div>
            <span className="text-xl font-bold text-gray-800">Property<span className="text-blue-600">Finder</span></span>
            <div className="text-xs text-gray-500">Premium Property Listings</div>
          </div>
        </Link>
        
        <div className="flex items-center space-x-8">
          <Link to="/home" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center">
            <i className="fas fa-home text-blue-500 mr-2"></i>
            Home
          </Link>
          <Link to="/home" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center">
            <i className="fas fa-search text-blue-500 mr-2"></i>
            Explore
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/add-property" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center">
                <i className="fas fa-plus-circle text-blue-500 mr-2"></i>
                Add Property
              </Link>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-4">
                  Welcome, {currentUser.name}
                  {isAgent && (
                    <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                      Agent
                    </span>
                  )}
                </span>
                <button 
                  onClick={handleLogout}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md flex items-center"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link 
              to="/login" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md flex items-center"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;