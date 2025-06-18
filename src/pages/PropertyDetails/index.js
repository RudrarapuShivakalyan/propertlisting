import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

// Mock data for development - would be replaced with API calls
const mockPropertyDetails = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  contactNumber: '9876543210',
  alternateContactNumber: '8765432109',
  locality: 'Indiranagar',
  address: '123, 5th Main, 12th Cross, Indiranagar, Bangalore - 560038',
  spaceType: 'Flat',
  petsAllowed: 'Yes',
  preference: 'Family',
  type: 'Semi Furnished',
  bhk: '2',
  floor: '3',
  nearestLandmark: 'Indiranagar Metro Station',
  washroomType: 'Western',
  coolingFacility: 'AC',
  carParking: 'Yes',
  rent: 25000,
  maintenance: 2500,
  squareFeet: 1200,
  appliances: ['Refrigerator', 'Washing Machine', 'Microwave'],
  amenities: ['Swimming Pool', 'Gym', 'Security', 'Power Backup'],
  about: 'This is a beautiful 2BHK apartment located in the heart of Indiranagar. The apartment is well-ventilated and gets ample sunlight. It is close to the metro station, making commuting very convenient. The society has 24x7 security and power backup.',
  photos: [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww&w=1000&q=80',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVkcm9vbXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJlZHJvb218ZW58MHx8MHx8fDA%3D&w=1000&q=80',
    'https://images.unsplash.com/photo-1556911220-bda9f7f6b548?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2l0Y2hlbnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmF0aHJvb218ZW58MHx8MHx8fDA%3D&w=1000&q=80'
  ],
  mapLocation: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9976945869!2d77.63758!3d12.9718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17b842f7158f%3A0x68c57f0a38f6a29!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1634567890123!5m2!1sen!2sin',
  views: 120,
  dateUploaded: '2023-10-15'
};

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  useEffect(() => {
    // In a real application, this would be an API call
    // For now, we'll use the mock data
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In a real app, you would fetch the property by ID
        // For now, we'll just use the mock data
        setProperty(mockPropertyDetails);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch property details. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchPropertyDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>Property not found.</p>
        </div>
        <div className="mt-4">
          <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-all duration-200 group">
          <span className="w-8 h-8 flex items-center justify-center bg-blue-50 rounded-full mr-2 group-hover:bg-blue-100 transition-colors duration-200">
            <i className="fas fa-arrow-left"></i>
          </span>
          Back to property listings
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
        <div className="relative bg-blue-600 h-16">
          <div className="absolute inset-0 opacity-20">
            <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80" 
                 alt="Background" 
                 className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="px-8 py-8 -mt-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 md:w-2/3">
              <div className="inline-block px-3 py-1 bg-blue-50 rounded-md text-xs font-medium text-blue-600 mb-3">
                <i className="fas fa-building mr-1"></i> {property.spaceType} • ID: {property.id}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">{property.bhk} BHK in {property.locality}</h1>
              <p className="text-gray-600 text-sm mb-4 flex items-start">
                <i className="fas fa-map-marker-alt text-gray-400 mr-2 mt-1"></i>
                <span>{property.address}</span>
              </p>
              
              <div className="flex flex-wrap text-sm text-gray-600 border-t border-gray-100 pt-4 mt-2">
                <span className="mr-6 mb-2 flex items-center">
                  <i className="fas fa-user text-blue-500 mr-2"></i>
                  <span className="font-medium text-gray-700">{property.firstName} {property.lastName}</span>
                </span>
                <span className="mr-6 mb-2 flex items-center">
                  <i className="fas fa-calendar-alt text-blue-500 mr-2"></i>
                  <span>{property.dateUploaded || 'Recently added'}</span>
                </span>
                <span className="mb-2 flex items-center">
                  <i className="fas fa-eye text-blue-500 mr-2"></i>
                  <span>{property.views || '0'} views</span>
                </span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-blue-100 md:w-1/3 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">Monthly Rent</p>
                <div className="px-2 py-1 bg-blue-100 rounded-md text-xs font-medium text-blue-700">
                  <i className="fas fa-home mr-1"></i> {property.type}
                </div>
              </div>
              <p className="text-3xl font-bold text-blue-600 mb-2">₹{property.rent?.toLocaleString() || '0'}</p>
              <p className="text-sm text-gray-500 mb-4">
                <i className="fas fa-ruler-combined mr-1"></i>
                <span className="font-medium">{property.squareFeet}</span> sq.ft (₹{Math.round(property.rent / property.squareFeet)}/sq.ft)
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-sm font-medium transition-all duration-300 w-full shadow-sm hover:shadow-md mb-3 flex items-center justify-center">
                <i className="fas fa-envelope mr-2"></i>
                Contact Owner
              </button>
              <button className="bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 px-6 py-3 rounded-md text-sm font-medium transition-all duration-300 w-full flex items-center justify-center">
                <i className="fas fa-bookmark mr-2"></i>
                Save Property
              </button>
            </div>
          </div>
          
          {/* Photo Gallery */}
          <div className="mb-12">
            <div className="relative aspect-[16/9] bg-gray-50 mb-4 rounded-lg overflow-hidden shadow-md">
              <img 
                src={property.photos[activePhotoIndex]} 
                alt={`Property ${activePhotoIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-500"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/1200x800?text=No+Image';
                }}
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Navigation arrows */}
              {property.photos.length > 1 && (
                <>
                  <button 
                    onClick={() => setActivePhotoIndex(prev => (prev === 0 ? property.photos.length - 1 : prev - 1))}
                    className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-blue-600 p-3 rounded-full transition-all duration-300 focus:outline-none shadow-md hover:shadow-lg"
                    aria-label="Previous image"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button 
                    onClick={() => setActivePhotoIndex(prev => (prev === property.photos.length - 1 ? 0 : prev + 1))}
                    className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-blue-600 p-3 rounded-full transition-all duration-300 focus:outline-none shadow-md hover:shadow-lg"
                    aria-label="Next image"
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </>
              )}
              
              {/* Image counter */}
              <div className="absolute bottom-5 right-5 bg-white/80 backdrop-blur-sm text-blue-600 px-4 py-2 rounded-md text-sm font-medium shadow-md">
                <i className="fas fa-camera mr-2"></i>
                {activePhotoIndex + 1} / {property.photos.length}
              </div>
            </div>
            
            {/* Thumbnails */}
            {property.photos.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2 px-1">
                {property.photos.map((photo, index) => (
                  <button 
                    key={index}
                    onClick={() => setActivePhotoIndex(index)}
                    className={`flex-shrink-0 w-20 md:w-24 aspect-[4/3] rounded-md overflow-hidden transition-all duration-300 ${
                      index === activePhotoIndex 
                        ? 'ring-2 ring-blue-600 scale-105 shadow-md' 
                        : 'ring-1 ring-gray-200 opacity-70 hover:opacity-100 hover:ring-blue-200'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img 
                      src={photo} 
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Property Details */}
            <div className="md:col-span-2">
              <div className="mb-10">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Property Specifications</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex flex-col bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-blue-200 transition-colors duration-300 hover:shadow">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <p className="text-gray-500 text-sm">Space Type</p>
                    </div>
                    <p className="font-semibold text-gray-800 ml-10">{property.spaceType || 'Not specified'}</p>
                  </div>
                  
                  <div className="flex flex-col bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-blue-200 transition-colors duration-300 hover:shadow">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <p className="text-gray-500 text-sm">BHK</p>
                    </div>
                    <p className="font-semibold text-gray-800 ml-10">{property.bhk || 'Not specified'}</p>
                  </div>
                  
                  <div className="flex flex-col bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-blue-200 transition-colors duration-300 hover:shadow">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                      <p className="text-gray-500 text-sm">Floor</p>
                    </div>
                    <p className="font-semibold text-gray-800 ml-10">{property.floor || 'Not specified'}</p>
                  </div>
                  
                  <div className="flex flex-col bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-blue-200 transition-colors duration-300 hover:shadow">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <p className="text-gray-500 text-sm">Furnishing</p>
                    </div>
                    <p className="font-semibold text-gray-800 ml-10">{property.type || 'Not specified'}</p>
                  </div>
                  
                  <div className="flex flex-col bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-blue-200 transition-colors duration-300 hover:shadow">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                        </svg>
                      </div>
                      <p className="text-gray-500 text-sm">Area</p>
                    </div>
                    <p className="font-semibold text-gray-800 ml-10">{property.squareFeet ? `${property.squareFeet} sq.ft` : 'Not specified'}</p>
                  </div>
                  
                  <div className="flex flex-col bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-blue-200 transition-colors duration-300 hover:shadow">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      <p className="text-gray-500 text-sm">Washroom Type</p>
                    </div>
                    <p className="font-semibold text-gray-800 ml-10">{property.washroomType || 'Not specified'}</p>
                  </div>
                  
                  <div className="flex flex-col bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-blue-200 transition-colors duration-300 hover:shadow">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 text-sm">Cooling</p>
                    </div>
                    <p className="font-semibold text-gray-800 ml-10">{property.coolingFacility || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Pets Allowed</p>
                    <p className="font-semibold">{property.petsAllowed}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Car Parking</p>
                    <p className="font-semibold">{property.carParking}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Preference</p>
                    <p className="font-semibold">{property.preference}</p>
                  </div>
                  {property.bachelors && (
                    <div>
                      <p className="text-gray-600">Bachelors</p>
                      <p className="font-semibold">{property.bachelors}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-600">Nearest Landmark</p>
                    <p className="font-semibold">{property.nearestLandmark}</p>
                  </div>
                </div>
              </div>
              
              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Appliances */}
              {property.appliances && property.appliances.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">Appliances</h2>
                  <div className="flex flex-wrap gap-2">
                    {property.appliances.map((appliance, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {appliance}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* About */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">About the Property</h2>
                <p className="text-gray-700">{property.about}</p>
              </div>
              
              {/* Map */}
              {property.mapLocation && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">Location</h2>
                  <div className="h-64 bg-gray-200 rounded overflow-hidden">
                    <iframe 
                      src={property.mapLocation} 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen="" 
                      loading="lazy"
                      title="Property Location"
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
            
            {/* Right Column - Contact and Price */}
            <div>
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <h2 className="text-xl font-semibold mb-4">Price Details</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rent</span>
                    <span className="font-semibold">₹{property.rent}/month</span>
                  </div>
                  {property.maintenance && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Maintenance</span>
                      <span className="font-semibold">₹{property.maintenance}/month</span>
                    </div>
                  )}
                  <div className="border-t border-gray-300 my-2 pt-2">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-blue-600">₹{property.rent + (property.maintenance || 0)}/month</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Contact Owner</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-600">Name</p>
                    <p className="font-semibold">{property.firstName} {property.lastName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Contact Number</p>
                    <p className="font-semibold">{property.contactNumber}</p>
                  </div>
                  {property.alternateContactNumber && (
                    <div>
                      <p className="text-gray-600">Alternate Contact</p>
                      <p className="font-semibold">{property.alternateContactNumber}</p>
                    </div>
                  )}
                  <div className="pt-2">
                    <a 
                      href={`tel:${property.contactNumber}`}
                      className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-md font-medium"
                    >
                      Call Owner
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;