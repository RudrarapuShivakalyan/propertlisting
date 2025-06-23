import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyForm from '../../components/PropertyForm';
import { useAuth } from '../../context/AuthContext';
import { sampleProperties } from '../../utils/sampleProperties';

const AddProperty = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, isAgent } = useAuth();

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
  
  const handleQuickAddProperty = async (property) => {
    try {
      setLoading(true);
      
      // In a real application, this would be an API call to submit the property
      console.log('Quick add property data submitted:', property);
      
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
      
      {isAgent && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Add Properties (Agent Only)</h2>
          <p className="text-gray-600 mb-4">As an agent, you can quickly add pre-filled properties to your listings.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleProperties.map((property) => (
              <div key={property.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={property.photos && property.photos.length > 0 ? property.photos[0] : 'https://via.placeholder.com/800x600?text=No+Image'} 
                    alt={`${property.spaceType} in ${property.locality}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/800x600?text=No+Image';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg">{property.spaceType} in {property.locality}</h3>
                  <p className="text-gray-600 mb-2">{property.bhk} BHK, {property.squareFeet} sq.ft</p>
                  <p className="text-gray-600 mb-2">₹{property.rent}/month</p>
                  <p className="text-gray-600 mb-4 line-clamp-2">{property.about}</p>
                  <button
                    onClick={() => handleQuickAddProperty(property)}
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium"
                  >
                    Quick Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <PropertyForm onSubmit={handlePropertySubmit} />
    </div>
  );
};

export default AddProperty;