import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import './App.css';
import { useAuth } from './context/AuthContext';

// Import pages
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import AddProperty from './pages/AddProperty';
import Login from './pages/Login';
import Register from './pages/Register';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Protected route component
const RequireAuth = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <Outlet />;
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Make login the default landing page */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Protected routes */}
            <Route element={<RequireAuth />}>
              <Route path="/home" element={<Home />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/add-property" element={<AddProperty />} />
            </Route>
            
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
