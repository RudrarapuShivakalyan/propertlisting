import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyForm from '../../components/PropertyForm';
import { useAuth } from '../../context/AuthContext';

const AddProperty = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handlePropertySubmit = async (formData) => {
    try {
      setLoading(true);
      
      // In a real application, this would be an API call to submit the property
      console.log('Property data submitted:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert('Property added successfully!');
      
      // Redirect to home page
      navigate('/');
    } catch (err) {
      console.error('Error submitting property:', err);
      alert('Failed to add property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-3V8m0 0V6m0 2h2m-2 0H9" />
            </svg>
            <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in to add a property. Please log in to continue.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Add New Property</h1>
      <PropertyForm onSubmit={handlePropertySubmit} />
    </div>
  );
};

export default AddProperty;